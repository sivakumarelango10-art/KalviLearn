// RLS adversarial test (SAFE: everything runs inside one transaction that is ALWAYS rolled back; no data persists).
//
//   node scripts/rls-adversarial.cjs pre    -> attacks against the CURRENT live policies (demonstrates exploitability)
//   node scripts/rls-adversarial.cjs post   -> applies migration.sql inside the transaction, then repeats the attacks
//
// Requires: npm i --no-save pg dotenv ; DIRECT_URL (or DATABASE_URL) in .env. Prints no emails/secrets/row contents.
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })
const { Client } = require('pg')

const MODE = process.argv[2] === 'post' ? 'post' : 'pre'
const sqlPath = path.resolve(__dirname, '..', 'prisma', 'migrations', '20261006_security_hardening_rls', 'migration.sql')
const out = []
const record = (id, attack, succeeded, detail = '') => {
  out.push({ id, attack, succeeded })
  console.log(`${succeeded ? 'EXPLOITABLE' : 'blocked    '} | ${id.padEnd(4)} | ${attack}${detail ? ' | ' + detail : ''}`)
}

;(async () => {
  const c = new Client({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  await c.connect()
  await c.query('BEGIN')
  try {
    if (MODE === 'post') {
      await c.query(fs.readFileSync(sqlPath, 'utf8').replace(/^BEGIN;\s*$/m, '').replace(/^COMMIT;\s*$/m, ''))
      console.log('migration applied INSIDE the transaction (will be rolled back)\n')
    }
    const one = async (q) => (await c.query(q)).rows[0]
    const hasCol = (await one(`select count(*)::int n from information_schema.columns where table_schema='public' and table_name='users' and column_name='authUid'`)).n === 1

    // ---- accounts (identifiers stay in memory). In post mode identities are resolved through users."authUid".
    const need = async (row) => {
      if (MODE === 'post' && hasCol && !row.authuid) {
        await c.query(`alter table users disable trigger trg_users_link_identity`)
        const r = await one(`update users set "authUid"=gen_random_uuid() where id='${row.id}' returning "authUid" a`)
        await c.query(`alter table users enable trigger trg_users_link_identity`)
        row.authuid = r.a
      }
      if (!row.authuid) row.authuid = '00000000-0000-4000-8000-' + String(Math.floor(Math.random() * 1e12)).padStart(12, '0')
      return row
    }
    const sel = (cols, where) => `select ${cols}${hasCol ? ', "authUid" authuid' : ''} from users u where ${where} limit 1`
    const studentA = await need(await one(sel('id, email, "mentorId"', `role='STUDENT' and exists(select 1 from "Submission" x where x."userId"=u.id) and "mentorId" is not null`)))
    const studentB = await need(await one(sel('id, email', `role='STUDENT' and id<>'${studentA.id}' and exists(select 1 from "Submission" x where x."userId"=u.id) and "mentorId" is not null and "mentorId" <> '${studentA.mentorId}'`)))
    const mentorOfA = await need(await one(sel('id, email', `id=(select "mentorId" from users where id='${studentA.id}')`)))
    const mentorB = await need(await one(sel('id, email', `role='MENTOR' and id<>'${mentorOfA.id}' and exists (select 1 from mentors m join mentor_students ms on ms.mentor_id=m.id where m.user_id=u.id and ms.status='ACTIVE')`)))
    const cmA = await need(await one(sel('id, email', `role='CAMPUS_MANAGER'`)))
    const cmB = await need(await one(sel('id, email', `role='CAMPUS_MANAGER' and id<>'${cmA.id}'`)))
    const mentorBRow = (await one(`select m.id from mentors m where m.user_id='${mentorB.id}'`)).id
    // A student to be un-assigned inside the sandboxed transaction (all 126 students currently have an active mentor).
    const ps = await one(sel('id, email', `role='STUDENT' and id not in ('${studentA.id}','${studentB.id}') and exists (select 1 from students s where s.user_id=u.id)`))
    await c.query(`update mentor_students set status='INACTIVE', unassigned_at=now() where status='ACTIVE' and student_id=(select id from students where user_id='${ps.id}')`)
    await c.query(`update users set "mentorId"=null where id='${ps.id}'`)
    const plainStudent = await need(ps)
    const probId = (await one('select id from "Problem" limit 1')).id

    const asRole = async (who, fn) => {
      await c.query('SAVEPOINT role_sp')
      try {
        await c.query('RESET ROLE')
        const claims = who ? { sub: who.authuid, email: who.email, role: 'authenticated' } : { role: 'anon' }
        await c.query(`select set_config('request.jwt.claims', $1, true)`, [JSON.stringify(claims)])
        await c.query(`set local role ${who ? 'authenticated' : 'anon'}`)
        return await fn()
      } finally {
        await c.query('RESET ROLE').catch(() => {})
        await c.query('ROLLBACK TO SAVEPOINT role_sp').catch(() => {})
      }
    }
    // run a statement in its own sub-savepoint; returns {ok, rows, code}
    const attempt = async (text, params) => {
      await c.query('SAVEPOINT a_sp')
      try {
        const r = await c.query(text, params)
        await c.query('ROLLBACK TO SAVEPOINT a_sp')
        return { ok: true, rows: r.rowCount, data: r.rows }
      } catch (e) {
        await c.query('ROLLBACK TO SAVEPOINT a_sp')
        return { ok: false, code: e.code }
      }
    }
    const readsRows = async (t, where = 'true') => {
      const r = await attempt(`select count(*)::int n from ${t} where ${where}`)
      return r.ok ? r.data[0].n : 0
    }

    // ---------------- ANONYMOUS
    await asRole(null, async () => {
      for (const [id, t] of [['AN1', 'users'], ['AN2', '"Submission"'], ['AN3', '"UserProgress"'], ['AN4', 'feedback_reports'], ['AN5', 'mentor_students'], ['AN6', 'students'], ['AN7', 'mentors'], ['AN8', 'teamsync_webhook_events'], ['AN9', 'feedback_audit_logs']]) {
        const n = await readsRows(t)
        record(id, `anonymous SELECT ${t}`, n > 0, n > 0 ? `${n} rows readable` : '')
      }
      let r = await attempt(`insert into "UserProgress"(id,"userId","problemId",status,language,"bestCode","xpEarned") values ('adv-1','${studentA.id}','${probId}','SOLVED','python','',99999)`)
      record('AN10', 'anonymous INSERT forged UserProgress (XP)', r.ok)
      r = await attempt(`update users set role='ADMIN' where id='${plainStudent.id}'`)
      record('AN11', 'anonymous UPDATE users.role -> ADMIN', r.ok && r.rows > 0, r.ok ? `${r.rows} rows` : '')
      r = await attempt(`delete from "UserProgress"`)
      record('AN12', 'anonymous DELETE all UserProgress', r.ok && r.rows > 0, r.ok ? `${r.rows} rows` : '')
      r = await attempt(`update feedback_reports set status='CLOSED'`)
      record('AN13', 'anonymous UPDATE feedback_reports', r.ok && r.rows > 0, r.ok ? `${r.rows} rows` : '')
    })

    // ---------------- STUDENT A
    await asRole(studentA, async () => {
      const others = await readsRows('"Submission"', `"userId"<>'${studentA.id}'`)
      record('ST1', "student A reads other users' submissions", others > 0, `${others} foreign rows`)
      const othersP = await readsRows('"UserProgress"', `"userId"<>'${studentA.id}'`)
      record('ST2', "student A reads other users' progress", othersP > 0, `${othersP} foreign rows`)
      const users = await readsRows('users', `id<>'${studentA.id}'`)
      record('ST3', 'student A reads other users (PII)', users > 3, `${users} other users visible`)
      const fb = await readsRows('feedback_reports', `user_id is distinct from '${studentA.id}'`)
      record('ST4', "student A reads others' feedback", fb > 0, `${fb} foreign rows`)
      const hidden = await readsRows('"TestCase"', '"isHidden" = true')
      record('ST5', 'student A reads hidden test cases', hidden > 0, `${hidden} rows`)
      let r = await attempt(`update users set role='ADMIN' where id='${studentA.id}'`)
      record('ST6', 'student A escalates OWN role to ADMIN', r.ok && r.rows > 0)
      r = await attempt(`update users set role='ADMIN' where id='${plainStudent.id}'`)
      record('ST7', "student A escalates ANOTHER user's role", r.ok && r.rows > 0)
      r = await attempt(`update users set email='attacker-controlled@example.invalid' where id='${studentB.id}'`)
      record('ST8', "student A rewrites another user's email (identity takeover)", r.ok && r.rows > 0)
      r = await attempt(`insert into "UserProgress"(id,"userId","problemId",status,language,"bestCode","xpEarned") values ('adv-2','${studentA.id}','${probId}','SOLVED','python','',99999)`)
      record('ST9', 'student A forges own SOLVED/XP progress', r.ok)
      r = await attempt(`insert into "Submission"(id,"userId","problemId",language,code,status,"passedTests","totalTests","testResults","executionTimeMs") values ('adv-3','${studentB.id}','${probId}','python','x','PASSED',10,10,'[]',1)`)
      record('ST10', 'student A inserts a submission AS student B (ownership forgery)', r.ok)
      r = await attempt(`update feedback_reports set status='CLOSED'`)
      record('ST11', "student A closes others' tickets", r.ok && r.rows > 0, r.ok ? `${r.rows} rows` : '')
      r = await attempt(`select 1 from teamsync_webhook_events limit 1`)
      record('ST12', 'student A reads webhook event log', r.ok && r.rows > 0)
      r = await attempt(`delete from "Submission" where "userId"<>'${studentA.id}'`)
      record('ST13', "student A deletes other users' submissions", r.ok && r.rows > 0, r.ok ? `${r.rows} rows` : '')
      r = await attempt(`insert into mentor_students(id,mentor_id,student_id,status) values ('adv-4','${mentorBRow}','x','ACTIVE')`)
      record('ST14', 'student A creates a mentor<->student link', r.ok)
    })

    // ---------------- MENTOR (mentor of A) acting on B / other mentor
    await asRole(mentorOfA, async () => {
      const subsB = await readsRows('"Submission"', `"userId"='${studentB.id}'`)
      record('MN1', "mentor reads submissions of a student NOT assigned to them", subsB > 0, `${subsB} rows`)
      const mentorsSeen = await readsRows('mentors', `user_id<>'${mentorOfA.id}'`)
      record('MN2', 'mentor reads other mentors', mentorsSeen > 0, `${mentorsSeen} rows`)
      let r = await attempt(`update users set "mentorId"='${mentorOfA.id}' where id='${studentB.id}'`)
      record('MN3', "mentor reassigns another mentor's student to themselves (users.mentorId)", r.ok && r.rows > 0)
      r = await attempt(`update mentors set max_students=1 where user_id='${mentorB.id}'`)
      record('MN4', "mentor edits another mentor's profile", r.ok && r.rows > 0)
      r = await attempt(`update users set role='CAMPUS_MANAGER' where id='${mentorOfA.id}'`)
      record('MN5', 'mentor self-promotes to CAMPUS_MANAGER', r.ok && r.rows > 0)
      r = await attempt(`update users set role='MENTOR' where id='${plainStudent.id}'`)
      record('MN6', 'mentor promotes a student to MENTOR', r.ok && r.rows > 0)
      r = await attempt(`update feedback_reports set status='CLOSED'`)
      record('MN7', "mentor closes others' feedback", r.ok && r.rows > 0, r.ok ? `${r.rows} rows` : '')
    })

    // ---------------- CAMPUS MANAGER
    await asRole(cmA, async () => {
      let r = await attempt(`update users set role='ADMIN' where id='${plainStudent.id}'`)
      record('CM1', 'campus manager grants ADMIN', r.ok && r.rows > 0)
      r = await attempt(`update users set role='SUPERADMIN' where id='${plainStudent.id}'`)
      record('CM2', 'campus manager grants SUPERADMIN', r.ok && r.rows > 0)
      r = await attempt(`update users set status='INACTIVE' where id='${cmB.id}'`)
      record('CM3', 'campus manager deactivates a peer campus manager', r.ok && r.rows > 0)
      r = await attempt(`insert into "UserProgress"(id,"userId","problemId",status,language,"bestCode","xpEarned") values ('adv-5','${studentA.id}','${probId}','SOLVED','python','',99999)`)
      record('CM4', 'campus manager forges student progress', r.ok)
      r = await attempt(`update feedback_reports set status='CLOSED'`)
      record('CM5', 'campus manager edits any feedback ticket', r.ok && r.rows > 0, r.ok ? `${r.rows} rows` : '')
    })

    // ---------------- POSITIVE CONTROLS: legitimate flows must still work (post mode only)
    if (MODE === 'post' && hasCol) {
      const control = (id, desc, ok, detail = '') => {
        out.push({ id, attack: 'CONTROL: ' + desc, succeeded: !ok })
        console.log(`${ok ? 'works      ' : 'BROKEN     '} | ${id.padEnd(4)} | CONTROL: ${desc}${detail ? ' | ' + detail : ''}`)
      }
      const cnt = async (q) => (await one(q)).n
      const subsA = await cnt(`select count(*)::int n from "Submission" where "userId"='${studentA.id}'`)
      const subsMentor = await cnt(`select count(*)::int n from "Submission" x where x."userId" in (select s.user_id from students s join mentor_students ms on ms.student_id=s.id join mentors m on m.id=ms.mentor_id where m.user_id='${mentorOfA.id}' and ms.status='ACTIVE') or x."userId"='${mentorOfA.id}'`)
      const nUsers = await cnt('select count(*)::int n from users')
      const nStudentUsers = await cnt(`select count(*)::int n from users where role='STUDENT'`)
      const nSubs = await cnt('select count(*)::int n from "Submission"')
      const nLinks = await cnt('select count(*)::int n from mentor_students')
      await asRole(studentA, async () => {
        control('OK1', 'student sees own submissions', (await readsRows('"Submission"')) === subsA, `${subsA}`)
        control('OK2', 'student loads own profile row (login lookup by email)', (await readsRows('users', `lower(email)=lower('${studentA.email}')`)) === 1)
        control('OK3', 'student sees own mentor (users + mentors rows)', (await readsRows('users', `id='${mentorOfA.id}'`)) === 1 && (await readsRows('mentors', `user_id='${mentorOfA.id}'`)) === 1)
        control('OK4', 'student sees own mentor_students link + own students row', (await readsRows('mentor_students')) >= 1 && (await readsRows('students', `user_id='${studentA.id}'`)) === 1)
        control('OK5', 'student reads Submission with embedded Problem/Belt joins', (await attempt(`select s.id, p.slug, b."order" from "Submission" s join "Problem" p on p.id=s."problemId" join "Belt" b on b.id=p."beltId" limit 5`)).ok)
        const r = await attempt(`update users set name='Renamed Dry Run' where id='${studentA.id}'`)
        control('OK6', 'student edits own display name', r.ok && r.rows === 1)
        const r2 = await attempt(`update students set name='x' where user_id='${studentA.id}'`)
        control('OK7', 'student syncs own students-row profile', r2.ok && r2.rows === 1)
      })
      await asRole(mentorOfA, async () => {
        control('OK8', 'mentor sees assigned students + own submissions', (await readsRows('"Submission"')) === subsMentor, `${subsMentor}`)
        control('OK9', 'mentor lists all STUDENT users + students (roster / add-by-email lookup)', (await readsRows('users', `role='STUDENT'`)) === nStudentUsers && (await readsRows('students')) > 100)
        control('OK10', 'mentor sees own mentors row + own roster links', (await readsRows('mentors')) === 1 && (await readsRows('mentor_students')) >= 1)
        const mrow = (await one(`select id from mentors where user_id='${mentorOfA.id}'`)).id
        const sid = (await one(`select s.id from students s where s.user_id='${plainStudent.id}'`)).id
        await c.query('SAVEPOINT claim')
        let okClaim = false
        try {
          await c.query(`insert into mentor_students(id,mentor_id,student_id,status) values ('adv-ok2','${mrow}','${sid}','ACTIVE')`)
          const u = await c.query(`update users set "mentorId"='${mentorOfA.id}' where id='${plainStudent.id}'`)
          const rel = await c.query(`update users set "mentorId"=null where id='${plainStudent.id}'`)
          const unl = await c.query(`update mentor_students set status='INACTIVE', unassigned_at=now() where id='adv-ok2'`)
          okClaim = u.rowCount === 1 && rel.rowCount === 1 && unl.rowCount === 1
        } catch (e) {
          console.log('   claim flow error code', e.code, e.message.slice(0, 80))
        }
        await c.query('ROLLBACK TO SAVEPOINT claim')
        control('OK11', 'mentor claim (insert link, set users.mentorId, release, unassign) round trip', okClaim)
      })
      await asRole(cmA, async () => {
        control('OK12', 'campus manager reads all users/submissions/roster links', (await readsRows('users')) === nUsers && (await readsRows('"Submission"')) === nSubs && (await readsRows('mentor_students')) === nLinks)
        const promo = await attempt(`update users set role='MENTOR', status='ACTIVE' where id='${plainStudent.id}'`)
        control('OK13', 'campus manager promotes a student to MENTOR (onboarding flow)', promo.ok && promo.rows === 1)
        const fresh = await attempt(`insert into users(id,email,role,status,"createdAt","updatedAt") values ('77777777-7777-4777-8777-777777777777','dry-run-new@example.invalid','STUDENT','ACTIVE',now(),now())`)
        control('OK14', 'campus manager provisions a new STUDENT user', fresh.ok && fresh.rows === 1)
        const m = await attempt(`select public.campus_overview_metrics() m`)
        control('OK15', 'campus overview aggregate RPC works for staff', m.ok && Number(m.data[0].m.totalSubmissions) > 0)
      })
      const orphanAuth = await one(`select a.id, a.email from auth.users a where not exists (select 1 from users u where lower(u.email)=lower(a.email)) and exists (select 1 from auth.identities i where i.user_id=a.id and i.provider='google') limit 1`)
      if (orphanAuth) {
        await asRole(cmA, async () => {
          const r = await attempt(`insert into users(id,email,role,status,"createdAt","updatedAt") values ('66666666-6666-4666-8666-666666666666','${orphanAuth.email}','STUDENT','ACTIVE',now(),now()) returning "authUid" a`)
          control('OK16', 'provisioning a user whose Google account already exists auto-links the identity', r.ok && String(r.data[0].a) === String(orphanAuth.id))
        })
      }
      // service-role limiter
      await c.query('RESET ROLE')
      await c.query('SAVEPOINT rl')
      await c.query(`select set_config('request.jwt.claims','{"role":"service_role"}',true)`)
      await c.query('set local role service_role')
      const h = []
      for (let i = 0; i < 3; i++) h.push((await c.query(`select * from rate_limit_hit('dry:test', 2, 60)`)).rows[0])
      await c.query('RESET ROLE')
      await c.query('ROLLBACK TO SAVEPOINT rl')
      control('OK17', 'distributed rate limiter: 2 allowed then blocked (service role)', h[0].allowed && h[1].allowed && !h[2].allowed)
      await asRole(studentA, async () => {
        control('OK18', 'authenticated users cannot call rate_limit_hit', !(await attempt(`select * from rate_limit_hit('x', 1, 60)`)).ok)
      })
    }

    if (MODE === 'post' && hasCol) {
      // identity spoofing: attacker signs in as a DIFFERENT auth user but presents a victim's email claim
      const spoofer = { authuid: '99999999-9999-4999-8999-999999999999', email: studentA.email }
      await asRole(spoofer, async () => {
        const n = await readsRows('"Submission"')
        record('ID1', "forged JWT email claim (victim's email, unlinked auth uid) reads any submission", n > 0, `${n} rows`)
        const u = await readsRows('users')
        record('ID2', 'forged JWT email claim reads users', u > 0)
      })
      await asRole(studentA, async () => {
        const r = await attempt(`update users set "authUid"='${spoofer.authuid}' where id='${studentA.id}' returning "authUid" a`)
        const stillMine = (await attempt(`select 1 from users where id='${studentA.id}' and "authUid"='${studentA.authuid}'`)).rows === 1
        record('ID3', 'student re-points own identity link (authUid)', !stillMine)
      })
      await asRole(cmA, async () => {
        const r = await attempt(`insert into users(id,email,role,status,"authUid","createdAt","updatedAt") values ('88888888-8888-4888-8888-888888888888','dryrun-nobody@example.invalid','STUDENT','ACTIVE','${studentB.authuid}',now(),now()) returning "authUid" a`)
        const hijacked = r.ok && r.data[0] && String(r.data[0].a) === String(studentB.authuid)
        record('ID4', "campus manager inserts a user claiming another person's authUid", hijacked)
      })
    }
  } catch (e) {
    console.error('HARNESS ERROR:', e.code, e.message)
    out.push({ id: 'ERR', attack: 'harness error', succeeded: true })
  } finally {
    await c.query('RESET ROLE').catch(() => {})
    await c.query('ROLLBACK')
    const left = (await c.query(`select count(*)::int n from pg_policies where schemaname='public' and policyname='users_select'`)).rows[0].n
    console.log(`\nROLLED BACK. migration objects persisted in DB: ${left} (must be 0)`)
    await c.end()
  }
  const bad = out.filter((o) => o.succeeded)
  fs.writeFileSync(path.resolve(__dirname, '..', 'scratch', `adversarial-${MODE}.json`), JSON.stringify(out, null, 1))
  console.log(`\nMODE=${MODE}: ${out.length} attacks, ${bad.length} succeeded, ${out.length - bad.length} blocked`)
  process.exit(MODE === 'post' && bad.length ? 1 : 0)
})()
