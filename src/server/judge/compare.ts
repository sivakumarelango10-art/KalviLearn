/**
 * Central output comparison used by every judge engine.
 *
 * Normalisation removes only non-semantic differences:
 *   - CRLF / CR line endings -> LF
 *   - trailing whitespace at the end of each line
 *   - leading/trailing whitespace around the whole output (" 42 " == "42")
 * Interior spaces and line structure are preserved (string problems keep their meaning).
 *
 * Numeric tolerance (1e-6 relative/absolute) is applied ONLY when the expected output contains a decimal
 * number, token by token, with identical token structure. Integer and text outputs are compared exactly, so
 * "1000000" never matches "1000000.0000001" and "2" never matches "2.0".
 */
export function normalizeOutput(text: string): string {
  if (!text) return ''
  return text
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/, ''))
    .join('\n')
    .trim()
}

const DECIMAL = /^[+-]?(\d+\.\d*|\.\d+)([eE][+-]?\d+)?$/
const NUMBER = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/

function tokensEqualWithTolerance(actual: string, expected: string): boolean {
  const a = actual.split(/(\s+)/)
  const e = expected.split(/(\s+)/)
  if (a.length !== e.length) return false
  for (let i = 0; i < e.length; i++) {
    if (a[i] === e[i]) continue
    if (/^\s+$/.test(e[i]) || /^\s+$/.test(a[i])) return false
    if (!DECIMAL.test(e[i]) || !NUMBER.test(a[i])) return false
    const x = Number(a[i])
    const y = Number(e[i])
    if (!Number.isFinite(x) || !Number.isFinite(y)) return false
    if (Math.abs(x - y) > 1e-6 * Math.max(1, Math.abs(y))) return false
  }
  return true
}

function parseJsonLenient(text: string): { ok: boolean; value?: unknown } {
  const trimmed = text.trim()
  if (!trimmed) return { ok: false }
  try {
    return { ok: true, value: JSON.parse(trimmed) }
  } catch {
    try {
      const fixed = trimmed
        .replace(/\bTrue\b/g, 'true')
        .replace(/\bFalse\b/g, 'false')
        .replace(/\bNone\b/g, 'null')
      return { ok: true, value: JSON.parse(fixed) }
    } catch {
      return { ok: false }
    }
  }
}

function jsonValuesMatch(a: unknown, e: unknown): boolean {
  if (a === e) return true
  if (a === null || e === null || a === undefined || e === undefined) return a === e

  if (typeof a === 'number' && typeof e === 'number') {
    if (Number.isInteger(e) && Number.isInteger(a)) return a === e
    return Math.abs(a - e) <= 1e-6 * Math.max(1, Math.abs(e))
  }

  if (typeof a !== typeof e) return false

  if (Array.isArray(e)) {
    if (!Array.isArray(a)) return false
    if (a.length !== e.length) return false
    for (let i = 0; i < e.length; i++) {
      if (!jsonValuesMatch(a[i], e[i])) return false
    }
    return true
  }

  if (typeof e === 'object' && typeof a === 'object') {
    const keysE = Object.keys(e as object).sort()
    const keysA = Object.keys(a as object).sort()
    if (keysE.length !== keysA.length) return false
    for (let i = 0; i < keysE.length; i++) {
      if (keysE[i] !== keysA[i]) return false
      const key = keysE[i]
      if (!jsonValuesMatch((a as Record<string, unknown>)[key], (e as Record<string, unknown>)[key])) {
        return false
      }
    }
    return true
  }

  return a === e
}

export function outputsMatch(actual: string, expected: string): boolean {
  const a = normalizeOutput(actual)
  const e = normalizeOutput(expected)
  if (a === e) return true

  // If expected is JSON (array, object, boolean, or string), support parsed JSON comparison
  const parsedE = parseJsonLenient(e)
  if (parsedE.ok && typeof parsedE.value !== 'string' && typeof parsedE.value !== 'number') {
    const parsedA = parseJsonLenient(a)
    if (parsedA.ok) {
      return jsonValuesMatch(parsedA.value, parsedE.value)
    }
  } else if (parsedE.ok && typeof parsedE.value === 'string') {
    const parsedA = parseJsonLenient(a)
    if (parsedA.ok && typeof parsedA.value === 'string' && parsedA.value === parsedE.value) {
      return true
    }
    if (a === parsedE.value) {
      return true
    }
  }

  if (!/\d\.\d/.test(e)) return false
  return tokensEqualWithTolerance(a, e)
}

