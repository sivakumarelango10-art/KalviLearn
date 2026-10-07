/**
 * Minimal Judge0-compatible test server (POST/GET /submissions/batch, base64) backed by the REAL local interpreters:
 *   71 -> python, 62 -> java (single-file source launcher), 63 -> node. (54 / C++ needs g++; reported as unavailable.)
 *
 * Used by the judge test suites to exercise the production Judge0 adapter end-to-end and to grade reference solutions
 * with genuine language semantics. Test infrastructure only - never imported by application code.
 */
import { createServer, type Server } from 'node:http'
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'

interface Sub {
  token: string
  status: { id: number; description: string }
  stdout: string | null
  stderr: string | null
  compile_output: string | null
  time: string | null
}

const b64 = (s: string) => Buffer.from(s, 'utf8').toString('base64')
const unb64 = (s?: string) => (s ? Buffer.from(s, 'base64').toString('utf8') : '')

export function hasCompiler(lang: 'python' | 'java' | 'node' | 'gpp'): boolean {
  const cmd = { python: ['python', ['--version']], java: ['java', ['-version']], node: ['node', ['--version']], gpp: ['g++', ['--version']] }[lang]
  try {
    return spawnSync(cmd[0] as string, cmd[1] as string[], { stdio: 'ignore' }).status === 0
  } catch {
    return false
  }
}

function execute(languageId: number, source: string, stdin: string, cpuSeconds: number): Promise<Omit<Sub, 'token'>> {
  return new Promise((resolve) => {
    const dir = mkdtempSync(join(tmpdir(), 'j0-'))
    let cmd: string
    let args: string[]
    if (languageId === 71 || languageId === 92) {
      writeFileSync(join(dir, 'main.py'), source)
      cmd = 'python'
      args = [join(dir, 'main.py')]
    } else if (languageId === 62 || languageId === 91) {
      writeFileSync(join(dir, 'Main.java'), source)
      cmd = 'java'
      args = [join(dir, 'Main.java')]
    } else if (languageId === 63 || languageId === 93) {
      writeFileSync(join(dir, 'main.cjs'), source)
      cmd = 'node'
      args = [join(dir, 'main.cjs')]
    } else {
      rmSync(dir, { recursive: true, force: true })
      return resolve({ status: { id: 13, description: 'Internal Error' }, stdout: null, stderr: null, compile_output: null, time: null })
    }
    const t0 = Date.now()
    const child = spawn(cmd, args, { cwd: dir })
    let out = ''
    let err = ''
    let killed = false
    const timer = setTimeout(() => {
      killed = true
      child.kill('SIGKILL')
    }, cpuSeconds * 1000 * 3 + (cmd === 'java' ? 4000 : 0))
    child.stdout.on('data', (d) => (out += d))
    child.stderr.on('data', (d) => (err += d))
    child.stdin.end(stdin)
    child.on('close', (code) => {
      clearTimeout(timer)
      rmSync(dir, { recursive: true, force: true })
      const time = ((Date.now() - t0) / 1000).toFixed(3)
      if (killed) return resolve({ status: { id: 5, description: 'Time Limit Exceeded' }, stdout: b64(out), stderr: null, compile_output: null, time })
      if (cmd === 'java' && code !== 0 && /error: compilation failed/.test(err)) {
        return resolve({ status: { id: 6, description: 'Compilation Error' }, stdout: null, stderr: null, compile_output: b64(err), time: null })
      }
      if (code !== 0) return resolve({ status: { id: 11, description: 'Runtime Error (NZEC)' }, stdout: b64(out), stderr: b64(err), compile_output: null, time })
      resolve({ status: { id: 3, description: 'Accepted' }, stdout: b64(out), stderr: err ? b64(err) : null, compile_output: null, time })
    })
  })
}

export async function startJudge0TestServer(): Promise<{ url: string; close: () => Promise<void>; stats: { batches: number } }> {
  const subs = new Map<string, Sub>()
  const stats = { batches: 0 }
  const server: Server = createServer((req, res) => {
    const url = new URL(req.url || '/', 'http://x')
    if (req.method === 'POST' && url.pathname === '/submissions/batch') {
      let body = ''
      req.on('data', (c) => (body += c))
      req.on('end', () => {
        stats.batches++
        const payload = JSON.parse(body || '{}') as { submissions?: Array<{ language_id: number; source_code: string; stdin: string; cpu_time_limit?: number }> }
        const created = (payload.submissions || []).map((s) => {
          const token = randomUUID()
          subs.set(token, { token, status: { id: 1, description: 'In Queue' }, stdout: null, stderr: null, compile_output: null, time: null })
          void execute(s.language_id, unb64(s.source_code), unb64(s.stdin), s.cpu_time_limit || 2).then((r) => subs.set(token, { token, ...r }))
          return { token }
        })
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 201
        res.end(JSON.stringify(created))
      })
      return
    }
    if (req.method === 'GET' && url.pathname === '/submissions/batch') {
      const tokens = (url.searchParams.get('tokens') || '').split(',').filter(Boolean)
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ submissions: tokens.map((t) => subs.get(t) || { token: t, status: { id: 13, description: 'Internal Error' } }) }))
      return
    }
    res.statusCode = 404
    res.end()
  })
  await new Promise<void>((r) => server.listen(0, '127.0.0.1', r))
  const address = server.address()
  const port = typeof address === 'object' && address ? address.port : 0
  return { url: `http://127.0.0.1:${port}`, close: () => new Promise((r) => server.close(() => r())), stats }
}
