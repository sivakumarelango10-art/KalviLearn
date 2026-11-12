/**
 * KalviLearn — Identity Linking Repair & Exclusive Content Manager Activation Suite
 *
 * Tests against real PostgreSQL 18 AND server RBAC handlers:
 *  1. Missing authUid / triggers + outdated users_role_chk repaired by 20261114 (idempotent x2)
 *  2. Trigger security: client authUid spoofing blocked, unconfirmed/non-Google accounts rejected,
 *     confirmed Google identity automatically linked via trg_users_link_identity & trg_auth_identity_link_user
 *  3. Exclusive production provisioning script (provision_exclusive_content_manager_abcdefdfdd.sql):
 *     - Provisions abcdefdfdd@gmail.com with distinct public.users.id and authUid = f7d6f8a8-846f-41ba-a246-6ae10ee98be1
 *     - Revokes prior active Content Managers, restores their safe previous_role, writes audit logs
 *     - Preserves Super Admin sgjitbros@gmail.com untouched
 *     - Enforces exactly 1 active GLOBAL Content Manager
 *  4. Application authorization check for abcdefdfdd@gmail.com & revoked prior CM
 */

import fs from 'fs'
import path from 'path'
import assert from 'assert'
import { spawnSync } from 'child_process'
import { EventEmitter } from 'events'

process.env.NODE_ENV = 'test'
process.env.ALLOW_TEST_AUTH_TOKENS = '1'

import { supabaseServer, clearAuthCacheForTesting } from '../src/server/feedbackAuth'
import { requireContentManager } from '../src/server/contentRbac'
import contentManagerHandler, { resetContentManagerRateLimitsForTesting } from '../src/server/contentManagerHandler'
import superAdminHandler, { resetSuperAdminRateLimitsForTesting } from '../src/server/superAdminHandler'
import { installMockSupabaseServer } from './mockDatabase'
import { FIXED_CONTENT_MANAGER_PERMISSIONS } from '../src/lib/contentPermissions'

const POSTGRES_BIN = 'C:\\Program Files\\PostgreSQL\\18\\bin\\postgres.exe'
const INITDB_BIN = 'C:\\Program Files\\PostgreSQL\\18\\bin\\initdb.exe'
const PG_DATA_DIR = path.resolve('node_modules/.tmp_pg18_identity_repair')

function stripLineComments(sql: string): string {
  const out: string[] = []
  let inSingleQuote = false
  for (const line of sql.split(/\r?\n/)) {
    let i = 0
    let cleaned = ''
    while (i < line.length) {
      const ch = line[i]
      if (ch === "'" && line[i - 1] !== '\\') {
        if (inSingleQuote && line[i + 1] === "'") {
          cleaned += "''"
          i += 2
          continue
        }
        inSingleQuote = !inSingleQuote
        cleaned += ch
        i++
      } else if (!inSingleQuote && ch === '-' && line[i + 1] === '-') {
        break
      } else {
        cleaned += ch
        i++
      }
    }
    if (cleaned.trim()) out.push(cleaned)
  }
  return out.join('\n')
}

function splitPgStatements(sql: string): string[] {
  const cleanSql = stripLineComments(sql)
  const statements: string[] = []
  let current = ''
  let inDollarQuote: string | null = null

  for (const line of cleanSql.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const dollarMatches = line.match(/\$[a-zA-Z0-9_]*\$/g)
    if (dollarMatches) {
      for (const dm of dollarMatches) {
        if (!inDollarQuote) inDollarQuote = dm
        else if (inDollarQuote === dm) inDollarQuote = null
      }
    }

    current += line + '\n'
    if (!inDollarQuote && trimmed.endsWith(';')) {
      const stmt = current.trim()
      if (stmt) statements.push(stmt)
      current = ''
    }
  }
  const trailing = current.trim()
  if (trailing) statements.push(trailing)
  return statements
}

function runPgSql(sql: string, label: string, allowError = false): { stdout: string; stderr: string; failed: boolean } {
  const stmts = splitPgStatements(sql)
    .map((s) => s.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
  const input = stmts.join('\n') + '\n'
  const res = spawnSync(POSTGRES_BIN, ['--single', '-D', PG_DATA_DIR, 'postgres'], {
    input,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })
  const stdout = res.stdout || ''
  const stderr = res.stderr || ''
  const failed = res.status !== 0 || stderr.includes('ERROR:') || stderr.includes('FATAL:')
  if (failed && !allowError) {
    throw new Error(`[${label}] PostgreSQL error (status=${res.status}):\nSTDERR:\n${stderr}\nSTDOUT:\n${stdout}`)
  }
  return { stdout, stderr, failed }
}

function initCluster() {
  if (fs.existsSync(PG_DATA_DIR)) {
    fs.rmSync(PG_DATA_DIR, { recursive: true, force: true })
  }
  const res = spawnSync(INITDB_BIN, ['-D', PG_DATA_DIR, '-U', 'postgres', '--encoding=UTF8', '--no-locale'], {
    encoding: 'utf8',
  })
  if (res.status !== 0) {
    throw new Error(`initdb failed:\n${res.stderr}\n${res.stdout}`)
  }
}

async function callHandler(handler: any, url: string, token: string, body: Record<string, unknown>, method = 'POST') {
  const req = new EventEmitter() as any
  req.method = method
  req.url = url
  req.headers = { 'content-type': 'application/json', authorization: `Bearer ${token}` }
  req.body = method === 'GET' ? {} : body
  req.query = {}
  req.socket = { remoteAddress: '127.0.0.1' }
  let statusCode = 200
  let responseBody = ''
  const res: any = {
    statusCode: 200,
    setHeader() {},
    getHeader() { return undefined },
    status(c: number) { statusCode = c; this.statusCode = c; return this },
    json(d: unknown) { responseBody = JSON.stringify(d) },
    end(c?: string) { if (c) responseBody += c; statusCode = this.statusCode },
  }
  await handler(req, res)
  return { status: statusCode, body: responseBody ? JSON.parse(responseBody) : null }
}

async function main() {
  console.log('======================================================================')
  console.log('KALVILEARN — IDENTITY LINKING REPAIR & EXCLUSIVE CM ACTIVATION SUITE')
  console.log('======================================================================\n')

  console.log('1. Provisioning isolated PostgreSQL 18 cluster with pre-repair schema...')
  initCluster()
  runPgSql(
    `
    DO $$ BEGIN
      IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'anon') THEN CREATE ROLE anon NOLOGIN; END IF;
      IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticated') THEN CREATE ROLE authenticated NOLOGIN; END IF;
      IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'service_role') THEN CREATE ROLE service_role NOLOGIN BYPASSRLS; END IF;
    END $$;
    CREATE SCHEMA IF NOT EXISTS auth;
    GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

    CREATE TABLE auth.users (
      id UUID PRIMARY KEY,
      email TEXT,
      email_confirmed_at TIMESTAMPTZ
    );
    CREATE TABLE auth.identities (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      provider TEXT NOT NULL
    );

    INSERT INTO auth.users (id, email, email_confirmed_at) VALUES
      ('f7d6f8a8-846f-41ba-a246-6ae10ee98be1'::uuid, 'abcdefdfdd@gmail.com', now()),
      ('11111111-1111-4111-8111-111111111111'::uuid, 'sgjitbros@gmail.com', now()),
      ('22222222-2222-4222-8222-222222222222'::uuid, 'prior.cm@kalvilearn.test', now()),
      ('33333333-3333-4333-8333-333333333333'::uuid, 'unconfirmed@kalvilearn.test', NULL);

    INSERT INTO auth.identities (user_id, provider) VALUES
      ('f7d6f8a8-846f-41ba-a246-6ae10ee98be1'::uuid, 'google'),
      ('11111111-1111-4111-8111-111111111111'::uuid, 'google'),
      ('22222222-2222-4222-8222-222222222222'::uuid, 'google'),
      ('33333333-3333-4333-8333-333333333333'::uuid, 'google');

    -- Deliberately omit authUid and include legacy 5-role constraint lacking CONTENT_MANAGER
    CREATE TABLE public.users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      role TEXT NOT NULL DEFAULT 'STUDENT',
      status TEXT NOT NULL DEFAULT 'ACTIVE',
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT users_role_chk CHECK (upper(role) IN ('STUDENT', 'MENTOR', 'CAMPUS_MANAGER', 'ADMIN', 'SUPERADMIN'))
    );
    INSERT INTO public.users (id, email, name, role, status) VALUES
      ('app-superadmin-1', 'sgjitbros@gmail.com', 'Super Admin', 'SUPERADMIN', 'ACTIVE'),
      ('app-prior-cm-1', 'prior.cm@kalvilearn.test', 'Prior Active Manager', 'MENTOR', 'ACTIVE'),
      ('app-suspended-cm-1', 'suspended.cm@kalvilearn.test', 'Suspended Manager', 'STUDENT', 'ACTIVE'),
      ('app-invited-cm-1', 'invited.cm@kalvilearn.test', 'Invited Manager', 'STUDENT', 'ACTIVE'),
      ('app-revoked-cm-1', 'already.revoked@kalvilearn.test', 'Already Revoked Manager', 'STUDENT', 'ACTIVE'),
      ('app-unrelated-student', 'unrelated.student@kalvilearn.test', 'Unrelated Student', 'STUDENT', 'ACTIVE');

    CREATE TABLE public."Module" (
      id TEXT PRIMARY KEY, "order" INTEGER DEFAULT 1, title TEXT NOT NULL, isActive BOOLEAN DEFAULT true, status TEXT DEFAULT 'PUBLISHED'
    );
    CREATE TABLE public."LearningUnit" (
      id TEXT PRIMARY KEY, "moduleId" TEXT NOT NULL, "order" INTEGER DEFAULT 1, title TEXT NOT NULL, isActive BOOLEAN DEFAULT true, status TEXT DEFAULT 'PUBLISHED'
    );
    CREATE TABLE public."Problem" (
      id TEXT PRIMARY KEY, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL, difficulty TEXT DEFAULT 'Easy',
      description TEXT, "inputFormat" TEXT, "outputFormat" TEXT,
      examples TEXT, "starterCodes" TEXT, "order" INTEGER DEFAULT 0, "beltId" TEXT, "learningUnitId" TEXT, "createdAt" TIMESTAMPTZ DEFAULT now()
    );
    CREATE TABLE public."TestCase" (
      id TEXT PRIMARY KEY, "problemId" TEXT NOT NULL, "testIndex" INTEGER DEFAULT 1,
      input TEXT NOT NULL, "expectedOutput" TEXT NOT NULL, "isHidden" BOOLEAN DEFAULT false, explanation TEXT
    );
    `,
    'baseline'
  )

  runPgSql(fs.readFileSync(path.resolve('prisma/migrations/20261107_problem_normalized_architecture/migration.sql'), 'utf8'), '20261107')
  runPgSql(fs.readFileSync(path.resolve('prisma/migrations/20261111_content_manager_rbac/migration.sql'), 'utf8'), '20261111')
  runPgSql(fs.readFileSync(path.resolve('prisma/migrations/20261112_content_manager_lifecycle/migration.sql'), 'utf8'), '20261112')
  runPgSql(fs.readFileSync(path.resolve('prisma/migrations/20261113_simplify_content_manager_rbac/migration.sql'), 'utf8'), '20261113')
  console.log('  OK Baseline & prerequisite migrations applied.')

  console.log('2. Applying 20261114_identity_linking_and_role_repair twice (idempotency check)...')
  const mig20261114 = fs.readFileSync(path.resolve('prisma/migrations/20261114_identity_linking_and_role_repair/migration.sql'), 'utf8')
  runPgSql(mig20261114, '20261114-run1')
  runPgSql(mig20261114, '20261114-run2')

  // Seed ACTIVE, SUSPENDED, INVITED, and already REVOKED CM assignments (now allowed by repaired users_role_chk!)
  runPgSql(
    `
    UPDATE public.users SET role = 'CONTENT_MANAGER' WHERE id IN ('app-prior-cm-1', 'app-suspended-cm-1', 'app-invited-cm-1');
    INSERT INTO public.content_manager_assignments (id, user_id, previous_role, scope_type, status, is_active, granted_by, revoked_by, revoked_at) VALUES
      ('assign-prior-1', 'app-prior-cm-1', 'MENTOR', 'GLOBAL', 'ACTIVE', true, 'sgjitbros@gmail.com', NULL, NULL),
      ('assign-susp-1', 'app-suspended-cm-1', 'STUDENT', 'GLOBAL', 'SUSPENDED', false, 'sgjitbros@gmail.com', NULL, NULL),
      ('assign-inv-1', 'app-invited-cm-1', 'STUDENT', 'GLOBAL', 'INVITED', false, 'sgjitbros@gmail.com', NULL, NULL),
      ('assign-rev-1', 'app-revoked-cm-1', 'STUDENT', 'GLOBAL', 'REVOKED', false, 'sgjitbros@gmail.com', 'historical-admin@kalvilearn.test', now() - interval '10 days');
    `,
    'seed-cm-lifecycle-states'
  )

  // Verify trigger rejects unconfirmed email & rejects client authUid spoofing
  runPgSql(
    `
    INSERT INTO public.users (id, email, name, role) VALUES ('app-unconfirmed-1', 'unconfirmed@kalvilearn.test', 'Unconfirmed', 'STUDENT');
    DO $$
    DECLARE
      v_uid UUID;
      v_sa_uid UUID;
    BEGIN
      SELECT "authUid" INTO v_uid FROM public.users WHERE id = 'app-unconfirmed-1';
      IF v_uid IS NOT NULL THEN RAISE EXCEPTION 'Unconfirmed auth user must NOT be linked!'; END IF;

      SELECT "authUid" INTO v_sa_uid FROM public.users WHERE id = 'app-superadmin-1';
      IF v_sa_uid <> '11111111-1111-4111-8111-111111111111'::uuid THEN
        RAISE EXCEPTION 'Expected sgjitbros@gmail.com backfilled authUid, got %', v_sa_uid;
      END IF;
    END $$;
    `,
    'verify-identity-guards'
  )

  const unknownRoleFail = runPgSql(
    `INSERT INTO public.users (id, email, role) VALUES ('app-bad-role', 'bad@kalvilearn.test', 'INVALID_ROLE');`,
    'bad-role-test',
    true
  )
  assert(unknownRoleFail.failed, 'users_role_chk must reject unknown role')
  console.log('  OK Identity linking triggers, backfill, spoof protection, and users_role_chk verified.')

  console.log('2B. Applying 20261115_dedicated_content_managers_table twice (idempotency & backfill)...')
  const mig20261115 = fs.readFileSync(path.resolve('prisma/migrations/20261115_dedicated_content_managers_table/migration.sql'), 'utf8')
  runPgSql(mig20261115, '20261115-run1')
  runPgSql(mig20261115, '20261115-run2')

  // Verify backfilled profile + 1:1 uniqueness + anon RLS block
  const dupProfileFail = runPgSql(
    `INSERT INTO public.content_managers (id, user_id, email) VALUES ('dup-cm-1', 'app-prior-cm-1', 'prior.cm@kalvilearn.test');`,
    'dup-cm-profile',
    true
  )
  assert(dupProfileFail.failed, 'content_managers.user_id must enforce 1:1 uniqueness')

  const anonCmFail = runPgSql(`BEGIN; SET LOCAL ROLE anon; SELECT count(*) FROM public.content_managers; ROLLBACK;`, 'anon-cm-block', true)
  assert(anonCmFail.failed && anonCmFail.stderr.includes('permission denied'), 'anon must have zero privileges on public.content_managers')

  console.log('3. Executing provision_exclusive_content_manager_abcdefdfdd.sql against PostgreSQL 18...')
  const provSql = fs.readFileSync(path.resolve('scripts/sql/provision_exclusive_content_manager_abcdefdfdd.sql'), 'utf8')
  runPgSql(provSql, 'provision-exclusive-cm')

  runPgSql(
    `
    DO $$
    DECLARE
      v_target_id TEXT;
      v_target_auth UUID;
      v_target_role TEXT;
      v_target_status TEXT;
      v_assign_status TEXT;
      v_assign_active BOOLEAN;
      v_assign_scope TEXT;
      v_assign_prev TEXT;
      v_prior_role TEXT;
      v_prior_assign_status TEXT;
      v_prior_assign_active BOOLEAN;
      v_sa_role TEXT;
      v_active_cms INTEGER;
    BEGIN
      SELECT u.id, u."authUid", u.role, u.status, a.status, a.is_active, a.scope_type, a.previous_role
      INTO v_target_id, v_target_auth, v_target_role, v_target_status, v_assign_status, v_assign_active, v_assign_scope, v_assign_prev
      FROM public.users u
      JOIN public.content_manager_assignments a ON a.user_id = u.id
      WHERE lower(u.email) = 'abcdefdfdd@gmail.com';

      IF v_target_id IS NULL OR v_target_id = 'f7d6f8a8-846f-41ba-a246-6ae10ee98be1' THEN
        RAISE EXCEPTION 'Target app user ID invalid: %', v_target_id;
      END IF;
      IF v_target_auth <> 'f7d6f8a8-846f-41ba-a246-6ae10ee98be1'::uuid THEN
        RAISE EXCEPTION 'Target authUid mismatch: %', v_target_auth;
      END IF;
      IF v_target_role <> 'CONTENT_MANAGER' OR v_target_status <> 'ACTIVE' OR v_assign_status <> 'ACTIVE' OR v_assign_active IS DISTINCT FROM true OR v_assign_scope <> 'GLOBAL' OR v_assign_prev <> 'STUDENT' THEN
        RAISE EXCEPTION 'Target state invalid: role=%, ustatus=%, astatus=%, active=%, scope=%, prev=%', v_target_role, v_target_status, v_assign_status, v_assign_active, v_assign_scope, v_assign_prev;
      END IF;

      SELECT u.role, a.status, a.is_active INTO v_prior_role, v_prior_assign_status, v_prior_assign_active
      FROM public.users u JOIN public.content_manager_assignments a ON a.user_id = u.id
      WHERE u.id = 'app-prior-cm-1';
      IF v_prior_role <> 'MENTOR' OR v_prior_assign_status <> 'REVOKED' OR v_prior_assign_active IS DISTINCT FROM false THEN
        RAISE EXCEPTION 'Prior CM revocation failed: role=%, status=%, active=%', v_prior_role, v_prior_assign_status, v_prior_assign_active;
      END IF;

      SELECT role INTO v_sa_role FROM public.users WHERE id = 'app-superadmin-1';
      IF v_sa_role <> 'SUPERADMIN' THEN RAISE EXCEPTION 'Super Admin modified!'; END IF;

      SELECT COUNT(*) INTO v_active_cms FROM public.content_manager_assignments WHERE status = 'ACTIVE' AND is_active = true;
      IF v_active_cms <> 1 THEN RAISE EXCEPTION 'Expected 1 active CM, found %', v_active_cms; END IF;

      -- Verify SUSPENDED, INVITED, and already REVOKED assignments + profiles remain untouched!
      IF NOT EXISTS (SELECT 1 FROM public.content_manager_assignments WHERE id = 'assign-susp-1' AND status = 'SUSPENDED' AND is_active = false) THEN
        RAISE EXCEPTION 'SUSPENDED assignment must be preserved untouched!';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM public.content_manager_assignments WHERE id = 'assign-inv-1' AND status = 'INVITED' AND is_active = false) THEN
        RAISE EXCEPTION 'INVITED assignment must be preserved untouched!';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM public.content_manager_assignments WHERE id = 'assign-rev-1' AND status = 'REVOKED' AND is_active = false AND revoked_by = 'historical-admin@kalvilearn.test') THEN
        RAISE EXCEPTION 'Already REVOKED assignment history must be preserved untouched!';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = 'app-unrelated-student' AND role = 'STUDENT') THEN
        RAISE EXCEPTION 'Unrelated student role must remain STUDENT!';
      END IF;

      IF NOT EXISTS (SELECT 1 FROM public.content_managers WHERE user_id = v_target_id AND lower(email) = 'abcdefdfdd@gmail.com') THEN
        RAISE EXCEPTION 'Expected content_managers profile for target user %', v_target_id;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM public.content_managers WHERE user_id = 'app-prior-cm-1')
         OR NOT EXISTS (SELECT 1 FROM public.content_managers WHERE user_id = 'app-suspended-cm-1')
         OR NOT EXISTS (SELECT 1 FROM public.content_managers WHERE user_id = 'app-invited-cm-1')
         OR NOT EXISTS (SELECT 1 FROM public.content_managers WHERE user_id = 'app-revoked-cm-1') THEN
        RAISE EXCEPTION 'All prior/suspended/invited/revoked content_managers profiles must be preserved!';
      END IF;
    END $$;
    `,
    'verify-exclusive-state'
  )

  // Verify inconsistent status/is_active state fails closed for manual review
  runPgSql(
    `
    ALTER TABLE public.content_manager_assignments DROP CONSTRAINT IF EXISTS chk_cm_assignments_status_active_sync;
    UPDATE public.content_manager_assignments SET status = 'ACTIVE', is_active = false WHERE id = 'assign-susp-1';
    `,
    'inject-inconsistent-state'
  )
  const inconsistentFail = runPgSql(provSql, 'inconsistent-fail-closed', true)
  assert(
    inconsistentFail.failed && inconsistentFail.stderr.includes('inconsistent content_manager_assignments row(s) detected'),
    `Provisioning script must fail closed on inconsistent status/is_active mismatch, got:\n${inconsistentFail.stderr}`
  )
  runPgSql(
    `
    UPDATE public.content_manager_assignments SET status = 'SUSPENDED', is_active = false WHERE id = 'assign-susp-1';
    ALTER TABLE public.content_manager_assignments ADD CONSTRAINT chk_cm_assignments_status_active_sync CHECK ((status = 'ACTIVE' AND is_active = true) OR (status IN ('INVITED', 'SUSPENDED', 'REVOKED') AND is_active = false));
    `,
    'restore-consistent-state'
  )

  const rbFail = runPgSql(fs.readFileSync(path.resolve('prisma/migrations/20261114_identity_linking_and_role_repair/rollback.sql'), 'utf8'), 'rollback-guard', true)
  assert(rbFail.failed && rbFail.stderr.includes('CONTENT_MANAGER row(s) exist'), 'Rollback must abort safely when CONTENT_MANAGER rows exist')

  runPgSql(fs.readFileSync(path.resolve('prisma/migrations/20261115_dedicated_content_managers_table/rollback.sql'), 'utf8'), '20261115-rollback')
  runPgSql(mig20261115, '20261115-reapply')
  console.log('  OK Exclusive activation, content_managers backfill/1:1/RLS, and prior CM revocation verified in PostgreSQL 18.')

  fs.rmSync(PG_DATA_DIR, { recursive: true, force: true })

  console.log('4. Verifying application authorization & API isolation for abcdefdfdd@gmail.com...')
  const db = installMockSupabaseServer(supabaseServer)
  clearAuthCacheForTesting()
  resetContentManagerRateLimitsForTesting()
  resetSuperAdminRateLimitsForTesting()

  db.users.push(
    { id: 'app-target-1', email: 'abcdefdfdd@gmail.com', authUid: 'f7d6f8a8-846f-41ba-a246-6ae10ee98be1', name: 'Content Manager', role: 'CONTENT_MANAGER', status: 'ACTIVE' },
    { id: 'app-target-synthetic', email: 'exclusive.cm@kalvilearn.test', name: 'Synthetic CM', role: 'CONTENT_MANAGER', status: 'ACTIVE' },
    { id: 'app-revoked-1', email: 'prior.cm@kalvilearn.test', name: 'Prior CM', role: 'MENTOR', status: 'ACTIVE' }
  )
  db.content_manager_assignments.push(
    { id: 'cma-target', user_id: 'app-target-1', previous_role: 'STUDENT', scope_type: 'GLOBAL', status: 'ACTIVE', is_active: true, granted_by: 'sgjitbros@gmail.com' },
    { id: 'cma-synthetic', user_id: 'app-target-synthetic', previous_role: 'STUDENT', scope_type: 'GLOBAL', status: 'ACTIVE', is_active: true, granted_by: 'sgjitbros@gmail.com' },
    { id: 'cma-revoked', user_id: 'app-revoked-1', previous_role: 'MENTOR', scope_type: 'GLOBAL', status: 'REVOKED', is_active: false, granted_by: 'sgjitbros@gmail.com' }
  )

  // Verify exact production auth.users.id -> public.users.id resolution via requireContentManager
  const targetRbac = await requireContentManager({
    id: 'f7d6f8a8-846f-41ba-a246-6ae10ee98be1',
    email: 'abcdefdfdd@gmail.com',
    name: 'Content Manager',
    role: 'CONTENT_MANAGER',
    status: 'ACTIVE',
  })
  assert.strictEqual(targetRbac.authorized, true, 'abcdefdfdd@gmail.com must be authorized via requireContentManager')
  if (targetRbac.authorized) {
    assert.strictEqual(targetRbac.ctx.userId, 'app-target-1', 'Resolved ctx.userId must be application users.id')
    assert.strictEqual(targetRbac.ctx.scopeType, 'GLOBAL')
    assert.strictEqual(targetRbac.ctx.permissions.size, FIXED_CONTENT_MANAGER_PERMISSIONS.length)
  }

  const targetToken = 'test_auth_CONTENT_MANAGER_exclusive.cm@kalvilearn.test'
  const priorToken = 'test_auth_CONTENT_MANAGER_prior.cm@kalvilearn.test'

  const meRes = await callHandler(contentManagerHandler, '/api/content-manager/me', targetToken, {}, 'GET')
  assert.strictEqual(meRes.status, 200)
  assert.strictEqual(meRes.body.data.scopeType, 'GLOBAL')
  assert.deepStrictEqual(meRes.body.data.permissions, [...FIXED_CONTENT_MANAGER_PERMISSIONS])

  const priorRes = await callHandler(contentManagerHandler, '/api/content-manager/me', priorToken, {}, 'GET')
  assert.strictEqual(priorRes.status, 403, 'Revoked prior CM must receive 403 immediately')

  const saBlocked = await callHandler(superAdminHandler, '/api/super-admin/content-managers', targetToken, { action: 'list_content_managers' })
  assert.strictEqual(saBlocked.status, 403, 'CM must receive 403 on Super Admin endpoint')
  console.log('  OK Target GLOBAL CM authorized, revoked CM blocked (403), Super Admin endpoints blocked (403).')

  console.log('\nALL IDENTITY LINKING & EXCLUSIVE CM ACTIVATION TESTS PASSED 100%!')
}

main().catch((err) => {
  if (fs.existsSync(PG_DATA_DIR)) {
    fs.rmSync(PG_DATA_DIR, { recursive: true, force: true })
  }
  console.error('TEST FAILED:', err)
  process.exit(1)
})

