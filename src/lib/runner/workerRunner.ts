import { executePython } from './pythonRunner'
import { executeCpp } from './cppRunner'
import { executeJava } from './javaRunner'
import type { WorkerRequest, WorkerResponse } from './codeRunner.worker'

export interface ExecutionResult {
  output: string
  error?: string
  executionTimeMs: number
  isTimeLimitExceeded?: boolean
}

/**
 * Execute single test case in a Web Worker with strict Time Limit Exceeded (TLE) protection.
 * If execution exceeds timeoutMs, the worker is terminated immediately to prevent tab freezing.
 */
export async function executeInWorker(
  code: string,
  language: string,
  input: string,
  timeoutMs: number = 3000
): Promise<ExecutionResult> {
  // Check Web Worker availability
  const hasWorkerSupport = typeof window !== 'undefined' && typeof window.Worker !== 'undefined'

  if (!hasWorkerSupport) {
    return executeSynchronousFallback(code, language, input)
  }

  return new Promise<ExecutionResult>((resolve) => {
    let worker: Worker | null = null
    let timerId: ReturnType<typeof setTimeout> | null = null
    let hasSettled = false

    const cleanup = () => {
      if (timerId) {
        clearTimeout(timerId)
        timerId = null
      }
      if (worker) {
        try {
          worker.terminate()
        } catch {
          // ignore termination error
        }
        worker = null
      }
    }

    try {
      worker = new Worker(new URL('./codeRunner.worker.ts', import.meta.url), {
        type: 'module',
      })

      const requestId = 'req_' + Math.random().toString(36).substring(2, 9)

      // Watchdog timeout to prevent infinite loops from hanging
      timerId = setTimeout(() => {
        if (hasSettled) return
        hasSettled = true
        cleanup()
        resolve({
          output: `Time Limit Exceeded (TLE) - Execution timed out after ${timeoutMs}ms.\nCheck for infinite loops or exponential recursion.`,
          error: 'Time Limit Exceeded (TLE)',
          executionTimeMs: timeoutMs,
          isTimeLimitExceeded: true,
        })
      }, timeoutMs)

      worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
        if (hasSettled) return
        if (event.data.id !== requestId) return

        hasSettled = true
        const data = event.data
        cleanup()
        resolve({
          output: data.output,
          error: data.error,
          executionTimeMs: data.executionTimeMs,
          isTimeLimitExceeded: false,
        })
      }

      worker.onerror = (err) => {
        if (hasSettled) return
        hasSettled = true
        cleanup()
        resolve({
          output: '',
          error: err.message || 'Worker runtime error',
          executionTimeMs: 0,
        })
      }

      const req: WorkerRequest = {
        id: requestId,
        code,
        language,
        input,
      }

      worker.postMessage(req)
    } catch (spawnError: any) {
      cleanup()
      // Fallback if worker construction was blocked by environment/CSP
      console.warn('Worker instantiation failed, running with synchronous fallback:', spawnError)
      resolve(executeSynchronousFallback(code, language, input))
    }
  })
}

function executeSynchronousFallback(code: string, language: string, input: string): ExecutionResult {
  const start = performance.now()
  try {
    const lang = (language || '').toLowerCase()
    if (lang === 'python') {
      const res = executePython(code, input)
      return {
        output: res.output,
        error: res.error,
        executionTimeMs: Math.round(performance.now() - start),
      }
    } else if (lang === 'cpp' || lang === 'c++') {
      const res = executeCpp(code, input)
      return {
        output: res.output,
        error: res.error,
        executionTimeMs: Math.round(performance.now() - start),
      }
    } else if (lang === 'java') {
      const res = executeJava(code, input)
      return {
        output: res.output,
        error: res.error,
        executionTimeMs: Math.round(performance.now() - start),
      }
    }

    // Direct JS execution
    const outputs: string[] = []
    const customConsole = {
      log: (...args: any[]) => {
        outputs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '))
      },
      error: (...args: any[]) => {
        outputs.push(args.map(a => String(a)).join(' '))
      },
      warn: () => {},
    }
    const mockFs = { readFileSync: () => input }
    const mockRequire = (mod: string) => (mod === 'fs' ? mockFs : {})

    const wrapped = new Function('console', 'require', 'input', `
      const fs = require('fs');
      ${code}
    `)
    wrapped(customConsole, mockRequire, input)

    return {
      output: outputs.join('\n').trim(),
      executionTimeMs: Math.round(performance.now() - start),
    }
  } catch (err: any) {
    return {
      output: '',
      error: err.message || 'Runtime Error',
      executionTimeMs: Math.round(performance.now() - start),
    }
  }
}
