/**
 * PostgREST silently truncates any response at 1000 rows (no error), which makes client-side aggregates
 * quietly wrong as tables grow. `fetchAllRows` pages through a query with `.range()` using a TOTAL ordering
 * (caller's ordering columns + `id` as tie-break) so pages never overlap or skip rows.
 *
 * Authorization is unchanged: every page is an ordinary RLS-checked request made as the signed-in user.
 * This is a correctness fix, not an efficiency one: very large tables should use SQL aggregates/RPCs
 * (see campus_overview_metrics) instead of transferring rows.
 */
const PAGE_SIZE = 1000
const MAX_PAGES = 100 // hard stop: 100k rows

interface PageResult<T> {
  data: T[] | null
  error: { message: string } | null
}

export async function fetchAllRows<T = any>(
  makeQuery: () => any,
  orderBy: Array<{ column: string; ascending?: boolean }> = []
): Promise<PageResult<T>> {
  const rows: T[] = []
  for (let page = 0; page < MAX_PAGES; page++) {
    let query = makeQuery()
    for (const o of orderBy) query = query.order(o.column, { ascending: o.ascending ?? true })
    if (!orderBy.some((o) => o.column === 'id')) query = query.order('id', { ascending: true })
    const from = page * PAGE_SIZE
    const { data, error } = await query.range(from, from + PAGE_SIZE - 1)
    if (error) return { data: rows.length ? rows : null, error }
    const chunk = (data || []) as T[]
    rows.push(...chunk)
    if (chunk.length < PAGE_SIZE) break
  }
  return { data: rows, error: null }
}
