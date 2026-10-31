import * as vm from 'node:vm'
import { types } from 'node:util'
import { setEvaluator, type Evaluator } from '../lib/runner/evaluator'
import { installPythonRuntimeExtensions } from '../lib/runner/pythonRunner'
import { installJavaRuntimeExtensions } from '../lib/runner/javaRunner'
import { installCppRuntimeExtensions } from '../lib/runner/cppRunner'

/**
 * Server-side evaluator for student code (transpiled to JavaScript by the language runners).
 *
 * Threat model: submitted code is hostile. It must not be able to reach `process`, `require`, the
 * filesystem, the network, environment secrets (SUPABASE_SERVICE_ROLE_KEY, webhook secrets, ...) or
 * hang the request.
 *
 * Controls:
 *  1. Fresh `vm` context per evaluation, backed by a NULL-PROTOTYPE sandbox object. A plain `{}` sandbox
 *     leaks the host `Object` via `this.constructor`, which is the classic vm escape.
 *  2. No `process`, `require`, `module`, `global` bindings exist inside the context. Dynamic `import()` fails
 *     because no importModuleDynamically callback is registered.
 *  3. The runners hand a few host closures (stdin/stdout shims) to the code. Any host function exposes the
 *     host `Function` constructor via `fn.constructor`; for the duration of the (fully synchronous)
 *     evaluation the `constructor` property of every host function prototype is replaced with a thrower, so
 *     `fn.constructor('return process')()` cannot compile code in the host realm.
 *  4. Hard CPU timeout (vm `timeout`) kills synchronous infinite loops; `microtaskMode: 'afterEvaluate'`
 *     keeps promise callbacks inside the same timeout window.
 *  5. `Error.prepareStackTrace` is locked inside the context (blocks CallSite based host-object leaks).
 *
 * Residual risk: `node:vm` is not a hardened security boundary and offers no memory limit. This is
 * defence-in-depth, not a substitute for out-of-process isolation (container / microVM / Judge0-Piston style
 * runner) if the platform ever accepts code from untrusted parties at scale.
 */

export const PER_CASE_TIMEOUT_MS = 1000

const CONTEXT_INIT = `
var __name = function (f) { return f };
try {
  Object.defineProperty(Error, 'prepareStackTrace', { value: undefined, writable: false, configurable: false });
} catch (_) {}
`

function blockedConstructor(): never {
  throw new Error('Security Violation: Dynamic code generation is disabled.')
}

function withHardenedHostIntrinsics<T>(fn: () => T): T {
  const protos: object[] = [
    Function.prototype,
    Object.getPrototypeOf(async function () {}),
    Object.getPrototypeOf(function* () {}),
    Object.getPrototypeOf(async function* () {}),
  ]
  const saved = protos.map((p) => Object.getOwnPropertyDescriptor(p, 'constructor'))
  for (const p of protos) {
    Object.defineProperty(p, 'constructor', { value: blockedConstructor, writable: true, configurable: true })
  }
  try {
    return fn()
  } finally {
    protos.forEach((p, i) => {
      const descriptor = saved[i]
      if (descriptor) Object.defineProperty(p, 'constructor', descriptor)
    })
  }
}

export const sandboxEvaluator: Evaluator = (keys, values, body) => {
  const sandbox: Record<string, unknown> = Object.create(null)
  const context = vm.createContext(sandbox, {
    microtaskMode: 'afterEvaluate',
    codeGeneration: { strings: false, wasm: false },
  })

  // Re-create language helper prototype methods inside this realm (host patches don't cross realms).
  vm.runInContext(CONTEXT_INIT, context, { timeout: PER_CASE_TIMEOUT_MS })
  vm.runInContext(`(${installPythonRuntimeExtensions.toString()})()`, context, { timeout: PER_CASE_TIMEOUT_MS })
  vm.runInContext(`(${installJavaRuntimeExtensions.toString()})()`, context, { timeout: PER_CASE_TIMEOUT_MS })
  vm.runInContext(`(${installCppRuntimeExtensions.toString()})()`, context, { timeout: PER_CASE_TIMEOUT_MS })

  for (let i = 0; i < keys.length; i++) {
    sandbox[keys[i]] = values[i]
  }

  // Compile outside the hardening window (syntax errors surface as normal SyntaxErrors).
  const script = new vm.Script(`(function () {\n${body}\n}).call(undefined)`, { filename: 'submission.js' })

  withHardenedHostIntrinsics(() => {
    try {
      script.runInContext(context, { timeout: PER_CASE_TIMEOUT_MS, breakOnSigint: false })
    } catch (err) {
      // Read plain data properties only: a thrown object with accessor properties must never get to run
      // user code again outside the vm timeout window.
      const ownValue = (key: string): unknown => {
        try {
          return err !== null && typeof err === 'object' && !types.isProxy(err)
            ? Object.getOwnPropertyDescriptor(err, key)?.value
            : undefined
        } catch {
          return undefined
        }
      }
      if (ownValue('code') === 'ERR_SCRIPT_EXECUTION_TIMEOUT' || /timed out/i.test(String(ownValue('message')))) {
        throw new Error('Time Limit Exceeded')
      }
      const message = ownValue('message')
      const text = typeof message === 'string' ? message : 'Runtime Error'
      throw new Error(text)
    }
  })
}

// Submitted code can create rejected promises (`Promise.reject()`, `import()` without a loader, async throws).
// Node's default reaction to an unhandled rejection is to terminate the process, i.e. one line of student code
// could crash the whole serverless instance for everyone sharing it. Rejections that surface shortly after a
// sandbox run are therefore logged and dropped; any other unhandled rejection keeps Node's default behaviour.
const SANDBOX_REJECTION_WINDOW_MS = 5000
let lastSandboxRunAt = 0
let rejectionGuardInstalled = false
let lastRejectionWarnAt = 0

function installRejectionGuard(): void {
  if (rejectionGuardInstalled) return
  rejectionGuardInstalled = true
  process.on('unhandledRejection', (reason) => {
    if (Date.now() - lastSandboxRunAt < SANDBOX_REJECTION_WINDOW_MS) {
      if (Date.now() - lastRejectionWarnAt > 5000) {
        lastRejectionWarnAt = Date.now()
        console.warn('[sandbox] dropped unhandled promise rejection(s) raised by submitted code')
      }
      return
    }
    throw reason
  })
}

let installed = false
export function installSandbox(): void {
  if (installed) return
  installRejectionGuard()
  setEvaluator((keys, values, body) => {
    lastSandboxRunAt = Date.now()
    try {
      sandboxEvaluator(keys, values, body)
    } finally {
      lastSandboxRunAt = Date.now()
    }
  })
  installed = true
}
