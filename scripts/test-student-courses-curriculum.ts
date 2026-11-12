import assert from 'node:assert/strict'
import { fetchPublishedCurriculum } from '../src/lib/curriculumService'

type Row = Record<string, unknown>

interface MockQueryState {
  table: string
  filters: Array<{ col: string; val: unknown }>
  orderBy?: { col: string; ascending: boolean }
}

function createMockSupabaseClient(options: {
  tables?: Record<string, Row[]>
  errors?: Record<string, { message: string }>
}) {
  const queries: MockQueryState[] = []

  return {
    queries,
    from(table: string) {
      const state: MockQueryState = { table, filters: [] }
      queries.push(state)

      const builder = {
        select(_cols: string) {
          return builder
        },
        eq(col: string, val: unknown) {
          state.filters.push({ col, val })
          return builder
        },
        order(col: string, opts?: { ascending?: boolean }) {
          state.orderBy = { col, ascending: opts?.ascending !== false }
          return builder
        },
        then<TResult1 = { data: Row[] | null; error: { message: string } | null }>(
          onfulfilled?:
            | ((value: { data: Row[] | null; error: { message: string } | null }) => TResult1 | PromiseLike<TResult1>)
            | null
        ) {
          const err = options.errors?.[table] || null
          if (err) {
            return Promise.resolve({ data: null, error: err }).then(onfulfilled)
          }

          let rows = [...(options.tables?.[table] || [])]
          for (const f of state.filters) {
            rows = rows.filter((r) => r[f.col] === f.val)
          }
          if (state.orderBy) {
            const { col, ascending } = state.orderBy
            rows.sort((a, b) => {
              const av = Number(a[col] ?? 0)
              const bv = Number(b[col] ?? 0)
              return ascending ? av - bv : bv - av
            })
          }

          return Promise.resolve({ data: rows, error: null }).then(onfulfilled)
        },
      }

      return builder
    },
  }
}

async function run() {
  console.log('Running Student Portal (/learn/courses) live curriculum tests...')

  // 1. Live fetch, field mapping, JSON parsing, ordering, and moduleId grouping
  const client1 = createMockSupabaseClient({
    tables: {
      Module: [
        { id: 'mod-2', order: 2, title: 'Arrays & Strings', description: 'Linear DS', isActive: true, status: 'PUBLISHED' },
        { id: 'mod-1', order: 1, title: 'Foundations', description: 'Basics', isActive: true, status: 'PUBLISHED' },
        { id: 'mod-draft', order: 3, title: 'Draft Module', isActive: true, status: 'DRAFT' },
        { id: 'mod-inactive', order: 4, title: 'Inactive Module', isActive: false, status: 'PUBLISHED' },
      ],
      LearningUnit: [
        {
          id: 'lu-2-1',
          moduleId: 'mod-2',
          order: 1,
          title: 'Two Pointers',
          content: 'Live DB content for Two Pointers',
          approach: 'Step 1\nStep 2',
          codeSnippets: JSON.stringify({ python: 'def two_ptr(): pass', cpp: 'void twoPtr() {}' }),
          codingQuestion: '**Two Sum**\nFind pair.',
          inputFormat: 'n and array',
          outputFormat: 'indices',
          examples: JSON.stringify([{ input: '4\n1 2 3 4', output: '0 3', explanation: '1+4=5' }]),
          readingTimeMinutes: 8,
          isActive: true,
          status: 'PUBLISHED',
        },
        {
          id: 'lu-1-2',
          moduleId: 'mod-1',
          order: 2,
          title: 'Loops & Control',
          content: 'Live DB content for Loops',
          approach: 'Iterate carefully',
          codeSnippets: { python: 'for i in range(5): pass' },
          examples: [{ input: '5', output: '0 1 2 3 4' }],
          readingTimeMinutes: 6,
          isActive: true,
          status: 'PUBLISHED',
        },
        {
          id: 'lu-1-1',
          moduleId: 'mod-1',
          order: 1,
          title: 'Variables & Types',
          content: 'Live DB content for Variables',
          readingTimeMinutes: 5,
          isActive: true,
          status: 'PUBLISHED',
        },
        {
          id: 'lu-draft',
          moduleId: 'mod-1',
          order: 3,
          title: 'Unpublished Draft Unit',
          content: 'Should not appear',
          isActive: true,
          status: 'PENDING_REVIEW',
        },
        {
          id: 'lu-inactive',
          moduleId: 'mod-1',
          order: 4,
          title: 'Archived Inactive Unit',
          content: 'Should not appear',
          isActive: false,
          status: 'PUBLISHED',
        },
        {
          id: 'lu-orphan-mod-draft',
          moduleId: 'mod-draft',
          order: 1,
          title: 'Unit under Draft Module',
          content: 'Should not appear',
          isActive: true,
          status: 'PUBLISHED',
        },
      ],
    },
  })

  const res1 = await fetchPublishedCurriculum(client1 as never)
  assert.equal(res1.status, 'ok')
  if (res1.status !== 'ok') throw new Error('Expected ok')

  // Verify exact Supabase query filters for publishing & activation rules
  const modQuery = client1.queries.find((q) => q.table === 'Module')
  const unitQuery = client1.queries.find((q) => q.table === 'LearningUnit')
  assert.ok(modQuery && unitQuery, 'Both Module and LearningUnit must be queried')
  assert.deepEqual(modQuery.filters, [
    { col: 'isActive', val: true },
    { col: 'status', val: 'PUBLISHED' },
  ])
  assert.deepEqual(unitQuery.filters, [
    { col: 'isActive', val: true },
    { col: 'status', val: 'PUBLISHED' },
  ])
  assert.deepEqual(modQuery.orderBy, { col: 'order', ascending: true })
  assert.deepEqual(unitQuery.orderBy, { col: 'order', ascending: true })

  // Verify only published active modules & units are returned in order
  assert.equal(res1.modules.length, 2)
  assert.deepEqual(
    res1.modules.map((m) => m.id),
    ['mod-1', 'mod-2']
  )
  assert.deepEqual(
    res1.modules[0].learningUnits.map((u) => u.id),
    ['lu-1-1', 'lu-1-2']
  )
  assert.deepEqual(
    res1.modules[1].learningUnits.map((u) => u.id),
    ['lu-2-1']
  )

  // Verify all fields mapped accurately on lu-2-1
  const twoPointers = res1.modules[1].learningUnits[0]
  assert.equal(twoPointers.moduleId, 'mod-2')
  assert.equal(twoPointers.order, 1)
  assert.equal(twoPointers.title, 'Two Pointers')
  assert.equal(twoPointers.content, 'Live DB content for Two Pointers')
  assert.equal(twoPointers.concept, 'Live DB content for Two Pointers')
  assert.equal(twoPointers.approach, 'Step 1\nStep 2')
  assert.equal(twoPointers.codeSnippets?.python, 'def two_ptr(): pass')
  assert.equal(twoPointers.codingQuestion, '**Two Sum**\nFind pair.')
  assert.equal(twoPointers.inputFormat, 'n and array')
  assert.equal(twoPointers.outputFormat, 'indices')
  assert.equal(twoPointers.examples.length, 1)
  assert.equal(twoPointers.examples[0].output, '0 3')
  assert.equal(twoPointers.readingTimeMinutes, 8)
  console.log('  [PASS] 1. Live fetch, field mapping, ordering, grouping by moduleId, and published/active filtering')

  // 2. Database error on Module returns explicit error, never static curriculum.json
  const clientErrMod = createMockSupabaseClient({
    errors: { Module: { message: 'permission denied for table Module' } },
  })
  const resErrMod = await fetchPublishedCurriculum(clientErrMod as never)
  assert.equal(resErrMod.status, 'error')
  assert.equal(resErrMod.modules.length, 0)
  if (resErrMod.status === 'error') {
    assert.match(resErrMod.error, /permission denied/i)
  }
  console.log('  [PASS] 2. Module DB error returns explicit error without static fallback')

  // 3. Database error on LearningUnit returns explicit error, never static curriculum.json
  const clientErrUnit = createMockSupabaseClient({
    tables: {
      Module: [{ id: 'mod-1', order: 1, title: 'Foundations', isActive: true, status: 'PUBLISHED' }],
    },
    errors: { LearningUnit: { message: 'network timeout' } },
  })
  const resErrUnit = await fetchPublishedCurriculum(clientErrUnit as never)
  assert.equal(resErrUnit.status, 'error')
  assert.equal(resErrUnit.modules.length, 0)
  if (resErrUnit.status === 'error') {
    assert.match(resErrUnit.error, /network timeout/i)
  }
  console.log('  [PASS] 3. LearningUnit DB error returns explicit error without static fallback')

  // 4. Empty DB result returns explicit empty state, never static curriculum.json
  const clientEmpty = createMockSupabaseClient({
    tables: {
      Module: [],
      LearningUnit: [],
    },
  })
  const resEmpty = await fetchPublishedCurriculum(clientEmpty as never)
  assert.equal(resEmpty.status, 'empty')
  assert.equal(resEmpty.modules.length, 0)
  console.log('  [PASS] 4. Empty DB result returns explicit empty state without static fallback')

  console.log('All Student Portal live curriculum tests passed!')
}

run().catch((err) => {
  console.error('TEST FAILED:', err)
  process.exit(1)
})

