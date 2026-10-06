// Verifies rollback.sql restores the exact pre-migration security state. SAFE: single transaction, always ROLLED BACK.
//   npm i --no-save pg dotenv && node scripts/rls-rollback-test.cjs
// Compares policies, grants, RLS flags, indexes, publication membership and bucket config against
// docs/baseline-db-snapshot-2026-10-06.json after (migration -> rollback).
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })
const { Client } = require('pg')
const dir = path.resolve(__dirname, '..', 'prisma', 'migrations', '20261006_security_hardening_rls')
const strip = (f) => fs.readFileSync(path.join(dir, f), 'utf8').replace(/^BEGIN;\s*$/m, '').replace(/^COMMIT;\s*$/m, '')
const snap = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'docs', 'baseline-db-snapshot-2026-10-06.json'), 'utf8'))

;(async () => {
  const c = new Client({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  await c.connect()
  await c.query('BEGIN')
  const problems = []
  try {
    await c.query(strip('migration.sql'))
    await c.query(strip('rollback.sql'))
    const rows = async (s) => (await c.query(s)).rows
    const norm = (x) => JSON.stringify(x)

    const pol = await rows(`select tablename, policyname, cmd, roles::text roles, qual, with_check from pg_policies where schemaname in ('public','storage') order by 1,2`)
    const wantPol = snap.policies.map((p) => ({ tablename: p.tablename, policyname: p.policyname, cmd: p.cmd, roles: p.roles, qual: p.qual, with_check: p.with_check }))
    if (norm(pol) !== norm(wantPol)) problems.push(`policies differ: have ${pol.length}, baseline ${wantPol.length}`)

    const gr = await rows(`select table_name, grantee, string_agg(privilege_type, ',' order by privilege_type) privs from information_schema.role_table_grants where table_schema='public' and grantee in ('anon','authenticated','service_role') group by 1,2 order by 1,2`)
    const wantGr = snap.grants.map((g) => ({ table_name: g.table_name, grantee: g.grantee, privs: g.privs }))
    if (norm(gr) !== norm(wantGr)) {
      const have = new Set(gr.map(norm)); const want = new Set(wantGr.map(norm))
      problems.push(`grants differ: missing ${[...want].filter((x) => !have.has(x)).length}, extra ${[...have].filter((x) => !want.has(x)).length}`)
    }

    const rls = await rows(`select c.relname t, c.relrowsecurity rls from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relkind='r' and c.relname = any($1) order by 1`.replace('$1', `array[${snap.tables.map((t) => `'${t.t}'`).join(',')}]`))
    const wantRls = snap.tables.map((t) => ({ t: t.t, rls: t.rls })).sort((a, b) => (a.t < b.t ? -1 : 1))
    if (norm(rls) !== norm(wantRls)) problems.push('RLS flags differ')

    const idx = (await rows(`select indexname from pg_indexes where schemaname='public' order by 1`)).map((r) => r.indexname)
    const wantIdx = snap.indexes.map((i) => i.indexname).sort()
    const missing = wantIdx.filter((n) => !idx.includes(n)); const extra = idx.filter((n) => !wantIdx.includes(n))
    if (missing.length || extra.length) problems.push(`indexes differ: missing [${missing}] extra [${extra}]`)

    const pub = (await rows(`select tablename from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' order by 1`)).map((r) => r.tablename)
    if (norm(pub) !== norm(snap.publication.map((p) => p.tablename).sort())) problems.push(`publication differs: ${pub}`)

    const bucket = (await rows(`select file_size_limit, allowed_mime_types from storage.buckets where id='feedback-attachments'`))[0]
    const wantB = snap.bucket.find((b) => b.id === 'feedback-attachments')
    if (norm(bucket.file_size_limit == null ? null : Number(bucket.file_size_limit)) !== norm(wantB.file_size_limit == null ? null : Number(wantB.file_size_limit)) || norm(bucket.allowed_mime_types) !== norm(wantB.allowed_mime_types)) problems.push('bucket config differs')

    const col = await rows(`select count(*)::int n from information_schema.columns where table_schema='public' and table_name='users' and column_name='authUid'`)
    if (col[0].n !== 0) problems.push('users.authUid column still present')
    const fn = await rows(`select count(*)::int n from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname <> 'check_single_mentor_assignment'`)
    if (fn[0].n !== 0) problems.push(`${fn[0].n} migration functions left behind`)
    const trg = await rows(`select tgname from pg_trigger where not tgisinternal and tgname in ('trg_guard_users_update','trg_users_link_identity','trg_auth_identity_link_user')`)
    if (trg.length) problems.push('migration triggers left behind: ' + trg.map((t) => t.tgname))
  } catch (e) {
    problems.push('exception: ' + e.code + ' ' + e.message)
  } finally {
    await c.query('ROLLBACK')
    const left = (await c.query(`select count(*)::int n from pg_policies where schemaname='public' and policyname='users_select'`)).rows[0].n
    console.log(`ROLLED BACK (nothing persisted; leftover migration policies in DB: ${left})`)
    await c.end()
  }
  if (problems.length) { console.log('ROLLBACK VERIFICATION FAILED:\n - ' + problems.join('\n - ')); process.exit(1) }
  console.log('ROLLBACK VERIFIED: after migration + rollback.sql, policies, grants, RLS flags, indexes, publication, bucket config and objects match the baseline snapshot exactly.')
})()
