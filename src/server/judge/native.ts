import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { EngineCaseResult, EngineOutcome, JudgeEngine, EngineCaseListener, EngineJob } from './engines'

/**
 * Native engine: executes Python, Java and C++ with the REAL interpreter / compiler installed on this machine, so
 * submissions get genuine language semantics (the local engine transpiles these languages to JavaScript, which is
 * what made correct solutions fail hidden cases).
 *
 * Isolation is process-level only: a fresh temp directory, an environment stripped to what the runtime needs (no
 * DATABASE_URL, keys or tokens), a wall-clock limit and an output cap. It is NOT a container sandbox, so it is enabled
 * by default only outside production (local development, CI). Production uses Judge0 (JUDGE0_URL); a self-hosted
 * server may opt in explicitly with KALVI_NATIVE_JUDGE=1. KALVI_NATIVE_JUDGE=0 disables it everywhere.
 */
type NativeLanguage = 'python' | 'java' | 'cpp'

const OUTPUT_CAP = 1 << 20 // 1 MiB per stream
const CONCURRENCY = 4

function timeLimitMs(language: NativeLanguage): number {
  const base = Number(process.env.NATIVE_JUDGE_TIME_LIMIT_MS || 3000)
  return language === 'java' ? base + 2000 : base // JVM start-up
}

// Only what the runtimes need to start. Nothing from the server's own environment (secrets) is passed through.
function childEnv(): NodeJS.ProcessEnv {
  const keep = ['PATH', 'Path', 'SystemRoot', 'SYSTEMROOT', 'windir', 'TEMP', 'TMP', 'JAVA_HOME', 'LANG']
  const env: NodeJS.ProcessEnv = {}
  for (const k of keep) if (process.env[k]) env[k] = process.env[k]
  env.PYTHONIOENCODING = 'utf-8'
  env.PYTHONDONTWRITEBYTECODE = '1'
  return env
}

const runtimeCache = new Map<string, string | null>()

function probe(candidates: string[], args: string[]): string | null {
  for (const cmd of candidates) {
    try {
      const r = spawnSync(cmd, args, { stdio: 'pipe', timeout: 8000, env: childEnv() })
      // The Windows "python3" app-execution alias exists but only prints a Store hint; require a real version banner.
      if (r.status === 0 && /\d+\.\d+/.test(`${r.stdout}${r.stderr}`)) return cmd
    } catch {
      /* not installed */
    }
  }
  return null
}

function runtime(tool: 'python' | 'java' | 'javac' | 'g++'): string | null {
  if (!runtimeCache.has(tool)) {
    const found =
      tool === 'python'
        ? probe(['python3', 'python'], ['--version'])
        : tool === 'java'
          ? probe(['java'], ['-version'])
          : tool === 'javac'
            ? probe(['javac'], ['-version'])
            : probe(['g++'], ['--version'])
    runtimeCache.set(tool, found)
  }
  return runtimeCache.get(tool) ?? null
}

export function nativeLanguage(language: string): NativeLanguage | null {
  const l = (language || '').toLowerCase()
  if (l === 'python' || l === 'py') return 'python'
  if (l === 'java') return 'java'
  if (l === 'cpp' || l === 'c++') return 'cpp'
  return null
}

export function nativeEnabled(): boolean {
  if (process.env.KALVI_NATIVE_JUDGE === '0') return false
  if (process.env.KALVI_NATIVE_JUDGE === '1') return true
  return process.env.NODE_ENV !== 'production'
}

/** True when this machine can execute `language` natively (and the native engine is enabled). */
export function nativeAvailable(language: string): boolean {
  const lang = nativeLanguage(language)
  if (!lang || !nativeEnabled()) return false
  if (lang === 'python') return !!runtime('python')
  if (lang === 'java') return !!runtime('java') && !!runtime('javac')
  return !!runtime('g++')
}

interface ProcResult {
  code: number | null
  stdout: string
  stderr: string
  timedOut: boolean
  overflow: boolean
  ms: number
}

function exec(cmd: string, args: string[], cwd: string, stdin: string, limitMs: number): Promise<ProcResult> {
  return new Promise((resolve) => {
    const t0 = Date.now()
    let stdout = ''
    let stderr = ''
    let timedOut = false
    let overflow = false
    let child
    try {
      child = spawn(cmd, args, { cwd, env: childEnv(), windowsHide: true })
    } catch (err) {
      return resolve({ code: -1, stdout: '', stderr: String(err), timedOut: false, overflow: false, ms: 0 })
    }
    const timer = setTimeout(() => {
      timedOut = true
      child.kill('SIGKILL')
    }, limitMs)
    const cap = (which: 'out' | 'err') => (d: Buffer) => {
      if (which === 'out') stdout += d
      else stderr += d
      if (stdout.length > OUTPUT_CAP || stderr.length > OUTPUT_CAP) {
        overflow = true
        child.kill('SIGKILL')
      }
    }
    child.stdout.on('data', cap('out'))
    child.stderr.on('data', cap('err'))
    child.stdin.on('error', () => {}) // program exited without reading stdin
    child.stdin.end(stdin)
    child.on('error', (err) => {
      clearTimeout(timer)
      resolve({ code: -1, stdout, stderr: String(err), timedOut, overflow, ms: Date.now() - t0 })
    })
    child.on('close', (code) => {
      clearTimeout(timer)
      // Windows runtimes write CRLF; report LF so results are identical on every platform.
      resolve({ code, stdout: stdout.replace(/\r\n/g, '\n'), stderr, timedOut, overflow, ms: Date.now() - t0 })
    })
  })
}

// Error text shown to the student: last lines only, temp paths removed.
function tidy(stderr: string, dir: string): string {
  const lines = stderr.split(dir).join('').replace(/\r\n/g, '\n').trim().split('\n')
  return lines.slice(-4).join('\n')
}

function javaMainClass(code: string): string {
  return code.match(/public\s+(?:final\s+)?class\s+([A-Za-z_$][\w$]*)/)?.[1] || 'Main'
}

export const nativeEngine: JudgeEngine = {
  name: 'native',
  async run(job: EngineJob, onCase?: EngineCaseListener): Promise<EngineOutcome> {
    const lang = nativeLanguage(job.language)
    if (!lang || !nativeAvailable(job.language)) return { kind: 'unavailable', message: 'Code execution is temporarily unavailable.' }
    const dir = mkdtempSync(join(tmpdir(), 'kalvi-judge-'))
    try {
      let cmd: string
      let args: string[]
      if (lang === 'python') {
        writeFileSync(join(dir, 'main.py'), job.code)
        cmd = runtime('python')!
        args = ['-I', 'main.py'] // isolated mode: ignore PYTHON* env vars and user site-packages
      } else if (lang === 'java') {
        const cls = javaMainClass(job.code)
        writeFileSync(join(dir, `${cls}.java`), job.code)
        const c = await exec(runtime('javac')!, ['-encoding', 'UTF-8', '-nowarn', `${cls}.java`], dir, '', 30000)
        if (c.code !== 0) return { kind: 'compile_error', error: tidy(c.stderr || c.stdout || 'Compilation Error', dir) }
        cmd = runtime('java')!
        args = ['-Xmx128m', '-Xss8m', '-XX:+UseSerialGC', '-XX:TieredStopAtLevel=1', '-Dfile.encoding=UTF-8', '-cp', '.', cls]
      } else {
        writeFileSync(join(dir, 'main.cpp'), job.code)
        const exe = process.platform === 'win32' ? 'main.exe' : 'main'
        const c = await exec(runtime('g++')!, ['-std=c++17', '-O2', '-o', exe, 'main.cpp'], dir, '', 30000)
        if (c.code !== 0 || !existsSync(join(dir, exe))) return { kind: 'compile_error', error: tidy(c.stderr || 'Compilation Error', dir) }
        cmd = join(dir, exe)
        args = []
      }

      const limit = timeLimitMs(lang)
      const classify = (r: ProcResult): EngineCaseResult => {
        if (r.timedOut) return { output: r.stdout, kind: 'timeout', error: 'Time Limit Exceeded', ms: r.ms }
        if (r.overflow) return { output: '', kind: 'runtime_error', error: 'Output Limit Exceeded', ms: r.ms }
        if (r.code !== 0) {
          const memory = /MemoryError|OutOfMemoryError|bad_alloc/.test(r.stderr)
          return { output: r.stdout, kind: memory ? 'memory' : 'runtime_error', error: tidy(r.stderr, dir) || `Exited with code ${r.code}`, ms: r.ms }
        }
        return { output: r.stdout, kind: 'ok', ms: r.ms }
      }
      const results: EngineCaseResult[] = new Array(job.inputs.length)
      const record = (i: number, result: EngineCaseResult) => {
        results[i] = result
        onCase?.(i, result)
      }
      if (!job.inputs.length) return { kind: 'ran', cases: [] }

      // Case 1 runs alone first: Python reports syntax errors only at run time, and they must surface as a compile
      // error before any case result is streamed.
      const r0 = await exec(cmd, args, dir, job.inputs[0], limit)
      if (lang === 'python' && r0.code !== 0 && /^\s*(SyntaxError|IndentationError|TabError)\b/m.test(r0.stderr)) {
        return { kind: 'compile_error', error: tidy(r0.stderr, dir) }
      }
      record(0, classify(r0))

      let next = 1
      const worker = async () => {
        while (next < job.inputs.length) {
          const i = next++
          record(i, classify(await exec(cmd, args, dir, job.inputs[i], limit)))
        }
      }
      await Promise.all(Array.from({ length: Math.min(CONCURRENCY, job.inputs.length - 1) }, worker))
      return { kind: 'ran', cases: results }
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  },
}
