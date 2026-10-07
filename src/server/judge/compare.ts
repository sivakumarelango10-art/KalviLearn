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

export function outputsMatch(actual: string, expected: string): boolean {
  const a = normalizeOutput(actual)
  const e = normalizeOutput(expected)
  if (a === e) return true
  if (!/\d\.\d/.test(e)) return false
  return tokensEqualWithTolerance(a, e)
}
