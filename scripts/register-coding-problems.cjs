/**
 * Registers the 740 coding-bank questions in the database so /api/submit can persist their submissions, progress
 * and XP (today: persistence.reason = 'question_not_registered', progress lives only in the browser).
 *
 * DRY RUN by default. Writes only with --apply.   npm i --no-save pg dotenv && node scripts/register-coding-problems.cjs [--apply]
 *
 * What --apply does (idempotent, one transaction):
 *   - inserts one Belt row (order 100, "Coding Bank") if missing
 *   - inserts one Problem row per coding question (id "coding-<slug>", unique slug), ON CONFLICT (slug) DO NOTHING
 *   - inserts NO TestCase rows: the judge reads tests from the server repository, never from the database
 *
 * PRODUCT SIDE EFFECT - decide before applying: src/lib/problemStatsService.ts counts ALL Problem rows and lists ALL
 * belts, so the dashboard denominator changes from 500 to 1,240 and a "Coding Bank" belt appears unless those
 * queries are scoped (e.g. to Belt.order <= 10).
 */
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })
const { Client } = require('pg')

const APPLY = process.argv.includes('--apply')
const questions = require('../src/data/coding/questions.json')
const list = Array.isArray(questions) ? questions : Object.values(questions)

;(async () => {
  const c = new Client({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  c.on('error', (e) => {
    console.error('Connection error:', e.code || '', e.message)
    process.exitCode = 1
  })
  await c.connect()
  if (!APPLY) {
    // Read-only dry run: no inserts, no locks on live tables.
    const slugs = list.map((q) => q.slug)
    const existing = (await c.query(`select slug from "Problem" where slug = any($1::text[])`, [slugs])).rows.length
    const belt = (await c.query(`select id from "Belt" where "order" = 100`)).rows[0]
    const total = (await c.query(`select count(*)::int n from "Problem"`)).rows[0].n
    console.log(`DRY RUN (read-only): ${slugs.length - existing} of ${slugs.length} coding problems would be inserted; ` +
      `Coding Bank belt ${belt ? 'exists' : 'would be created'}; Problem rows ${total} -> ${total + slugs.length - existing}`)
    console.log('Nothing written. Re-run with --apply to write.')
    await c.end()
    return
  }
  await c.query('BEGIN')
  try {
    let belt = (await c.query(`select id from "Belt" where "order" = 100`)).rows[0]
    if (!belt) {
      belt = (
        await c.query(
          `insert into "Belt"(id, "order", name, title, description, color, "createdAt")
           values (gen_random_uuid()::text, 100, 'Coding Bank', 'Topic-Wise Coding Bank', '740 topic-wise programming questions', '#ED2A2B', now())
           returning id`
        )
      ).rows[0]
    }
    let inserted = 0
    for (const q of list) {
      const r = await c.query(
        `insert into "Problem"(id, "beltId", "order", title, slug, difficulty, description, "inputFormat", "outputFormat",
                               explanation, "exampleExplanation", examples, subdivision, "starterCodes", "createdAt")
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9, null, null, $10::jsonb, $11, '{}'::jsonb, now())
         on conflict (slug) do nothing`,
        [q.id, belt.id, q.globalNumber, q.title, q.slug, q.difficulty || 'Easy', q.problemStatement, q.inputFormat, q.outputFormat,
          JSON.stringify(q.examples || []), q.topicTitle]
      )
      inserted += r.rowCount
    }
    const total = (await c.query(`select count(*)::int n from "Problem"`)).rows[0].n
    console.log(`${APPLY ? 'APPLY' : 'DRY RUN'}: ${inserted} coding problems ${APPLY ? 'inserted' : 'would be inserted'}; Problem rows would total ${total}`)
    await c.query(APPLY ? 'COMMIT' : 'ROLLBACK')
    if (!APPLY) console.log('Rolled back (dry run). Re-run with --apply to write.')
  } catch (e) {
    await c.query('ROLLBACK')
    console.error('FAILED, rolled back:', e.code, e.message)
    process.exitCode = 1
  } finally {
    await c.end()
  }
})()
