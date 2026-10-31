/**
 * Central output comparison used by every judge engine.
 * Re-exports from src/lib/judge/compare for 100% parity across client and server.
 */
export {
  normalizeOutput,
  parseJsonLenient,
  jsonValuesMatch,
  outputsMatch,
  validateJsonInput,
  computeLineDiff,
  type JsonValidationResult,
  type LineDiffItem,
  type DiffResult,
} from '../../lib/judge/compare'
