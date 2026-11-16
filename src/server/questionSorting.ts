/**
 * KalviLearn Question Sorting & Belt Hierarchy Service
 *
 * Implements deterministic hierarchical sorting:
 * 1. Parent Belt numeric order (Belt 1 before Belt 2 .. Belt 10; missing belts last).
 * 2. Questions within each Belt by numeric order ascending (1, 2, 10, not string '1', '10', '2').
 * 3. Variant sequence preservation (Variant 1 before Variant 2, -v1 before -v2).
 * 4. Secondary topic/subdivision alignment.
 * 5. Stable tie-breakers: title then ID.
 */

export function buildBeltOrderMap(beltsData?: any[] | null): Map<string, number> {
  const map = new Map<string, number>()
  if (Array.isArray(beltsData)) {
    for (const b of beltsData) {
      if (b && b.id) {
        const orderNum = typeof b.order === 'number' ? b.order : Number.parseInt(String(b.order), 10)
        map.set(b.id, Number.isFinite(orderNum) ? orderNum : 999)
      }
    }
  }
  // Register standard mock belt IDs
  for (let i = 1; i <= 10; i++) {
    if (!map.has(`mock-belt-${i}`)) {
      map.set(`mock-belt-${i}`, i)
    }
  }
  return map
}

export function getProblemBeltOrder(problem: any, beltOrderMap: Map<string, number>): number {
  if (problem.beltId && beltOrderMap.has(problem.beltId)) {
    return beltOrderMap.get(problem.beltId)!
  }
  if (typeof problem.beltId === 'string') {
    const m = problem.beltId.match(/belt[^\d]*(\d+)/i)
    if (m) {
      const parsed = Number.parseInt(m[1], 10)
      if (Number.isFinite(parsed)) return parsed
    }
  }
  if (typeof problem.slug === 'string') {
    const m = problem.slug.match(/^belt-(\d+)-/i)
    if (m) {
      const parsed = Number.parseInt(m[1], 10)
      if (Number.isFinite(parsed)) return parsed
    }
  }
  // Questions scoped exclusively to learning units sort after belt questions when unpartitioned
  if (problem.learningUnitId) {
    return 9999
  }
  return 999
}

export function extractVariantNumber(problem: any): number {
  if (typeof problem.slug === 'string') {
    const m = problem.slug.match(/[-_]v(\d+)(?:[-_]|$)/i)
    if (m) {
      const parsed = Number.parseInt(m[1], 10)
      if (Number.isFinite(parsed)) return parsed
    }
  }
  if (typeof problem.title === 'string') {
    const m = problem.title.match(/variant\s*(\d+)/i)
    if (m) {
      const parsed = Number.parseInt(m[1], 10)
      if (Number.isFinite(parsed)) return parsed
    }
  }
  if (typeof problem.variant === 'string') {
    const m = problem.variant.match(/(\d+)/)
    if (m) {
      const parsed = Number.parseInt(m[1], 10)
      if (Number.isFinite(parsed)) return parsed
    }
  }
  return 0
}

export function compareProblemsHierarchically(
  a: any,
  b: any,
  beltOrderMap: Map<string, number>
): number {
  // 1. Primary sort: Parent Belt numeric order
  const beltOrderA = getProblemBeltOrder(a, beltOrderMap)
  const beltOrderB = getProblemBeltOrder(b, beltOrderMap)
  if (beltOrderA !== beltOrderB) {
    return beltOrderA - beltOrderB
  }

  // 1b. If both belong to learning units, group by learningUnitId
  if (a.learningUnitId && b.learningUnitId && a.learningUnitId !== b.learningUnitId) {
    const luDiff = String(a.learningUnitId).localeCompare(String(b.learningUnitId))
    if (luDiff !== 0) return luDiff
  }

  // 2. Secondary sort: Numeric problem order ascending
  const orderA = typeof a.order === 'number' ? a.order : (Number.parseInt(String(a.order ?? 0), 10) || 0)
  const orderB = typeof b.order === 'number' ? b.order : (Number.parseInt(String(b.order ?? 0), 10) || 0)
  if (orderA !== orderB) {
    return orderA - orderB
  }

  // 3. Variant sequence preservation: variant 1 before variant 2
  const varA = extractVariantNumber(a)
  const varB = extractVariantNumber(b)
  if (varA !== varB) {
    return varA - varB
  }

  // 4. Subdivision / topic
  const subA = String(a.subdivision || '')
  const subB = String(b.subdivision || '')
  const subDiff = subA.localeCompare(subB)
  if (subDiff !== 0) return subDiff

  // 5. Stable tie-breakers: title then ID
  const titleA = String(a.title || '')
  const titleB = String(b.title || '')
  const titleDiff = titleA.localeCompare(titleB)
  if (titleDiff !== 0) return titleDiff

  return String(a.id || '').localeCompare(String(b.id || ''))
}

export function resolvePublicationStatus(
  status?: string | null,
  isActive?: boolean | null,
  approvalStatus?: string | null
): 'PUBLISHED' | 'DRAFT' | 'PENDING_REVIEW' | 'ARCHIVED' {
  const st = String(status || '').toUpperCase()
  const appSt = String(approvalStatus || '').toUpperCase()
  if (st === 'ARCHIVED') return 'ARCHIVED'
  if (st === 'PENDING_REVIEW' || appSt === 'PENDING_REVIEW') return 'PENDING_REVIEW'
  if (st === 'PUBLISHED') return 'PUBLISHED'
  if (st === 'DRAFT') return 'DRAFT'
  if (isActive === false) return 'DRAFT'
  return 'PUBLISHED'
}
