/**
 * Post-build guard: every serverless function in api/ must START under production settings, even when deployment
 * environment variables are missing, and answer with JSON. A module that throws at import time makes Vercel return a
 * bare HTTP 500 for every request (the arena then shows "temporarily unavailable" with no explanation).
 *
 * Runs each bundle in a fresh Node process with NODE_ENV=production and NO Supabase / Judge0 configuration.
 *   node scripts/check-api-startup.mjs
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const FUNCTIONS = [
  'api/execute.js',
  'api/submit.js',
  'api/feedback.js',
  'api/integrations/teamsync/tickets.js',
  'api/integrations/teamsync/webhooks.js',
  'api/campus.js',
  'api/super-admin.js',
]

// Child program: import the bundle, then (for execute/submit) send one authenticated-looking request and require JSON.
const probe = `
const { EventEmitter } = await import('node:events')
const mod = await import(process.argv[1])
if (typeof mod.default !== 'function') { console.log('NO_HANDLER'); process.exit(2) }
if (!/(execute|submit)\\.js$/.test(process.argv[1])) { console.log('LOADED'); process.exit(0) }
const req = new EventEmitter()
Object.assign(req, { method: 'POST', url: '/api/x', headers: { 'content-type': 'application/json', authorization: 'Bearer startup-probe' }, socket: { remoteAddress: '203.0.113.9' }, body: { questionSlug: 'belt-1-q1-arithmetic-check-v1', language: 'python', code: 'print(1)' } })
let body = ''
const res = { statusCode: 200, headers: {}, setHeader(k, v) { this.headers[k.toLowerCase()] = v }, getHeader(k) { return this.headers[k.toLowerCase()] }, status(c) { this.statusCode = c; return this }, json(d) { body = JSON.stringify(d) }, write(c) { body += c }, end(c) { if (c) body += c }, flushHeaders() {} }
await mod.default(req, res)
let parsed = null
try { parsed = JSON.parse(body) } catch {}
console.log(parsed && typeof parsed.message === 'string' ? 'JSON ' + res.statusCode : 'NOT_JSON ' + res.statusCode)
`

const env = { PATH: process.env.PATH, SystemRoot: process.env.SystemRoot, NODE_ENV: 'production' }
let failed = 0
for (const fn of FUNCTIONS) {
  const file = resolve(fn)
  if (!existsSync(file)) {
    console.error(`check-api-startup: ${fn} missing (run the build first)`)
    failed++
    continue
  }
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', probe, pathToFileURL(file).href], { env, encoding: 'utf8', timeout: 60000 })
  const verdict = (r.stdout || '').trim().split('\n').pop() || ''
  const ok = r.status === 0 && (verdict === 'LOADED' || /^JSON (401|403|503)$/.test(verdict))
  if (!ok) failed++
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${fn}: ${verdict || 'crashed'}${ok ? '' : '\n' + (r.stderr || '').split('\n').slice(0, 6).join('\n')}`)
}
if (failed) {
  console.error(`check-api-startup: ${failed} function(s) would fail to start in production`)
  process.exit(1)
}
console.log('check-api-startup: OK - all functions start under production settings and answer JSON')
