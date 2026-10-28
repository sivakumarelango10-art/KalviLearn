/**
 * Utility functions for robust error formatting and normalization.
 * Guarantees human-readable messages and ensures `[object Object]` is NEVER returned.
 */

interface ErrorLikeObject {
  message?: unknown
  error?: unknown
  error_description?: unknown
  details?: unknown
  hint?: unknown
  code?: unknown
  statusText?: unknown
}

const POSTGRES_CODE_MAP: Record<string, string> = {
  '42501': 'Permission denied: You do not have permission to perform this action.',
  '23505': 'A record with this unique information already exists.',
  '23503': 'Referenced record does not exist or has dependent relationships.',
  'PGRST116': 'The requested record was not found.',
  '42P01': 'Database table or relation does not exist.',
}

function isPlainObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val)
}

function cleanString(str: unknown): string | null {
  if (typeof str !== 'string') return null
  const trimmed = str.trim()
  if (!trimmed || trimmed === '[object Object]') return null
  return trimmed
}

/**
 * Normalizes any caught error, PostgrestError, network exception, or plain object into a clean string.
 *
 * @param err The caught error of unknown type
 * @param fallback A user-friendly fallback if the error carries no extractable message
 * @returns A safe, non-empty, human-readable error string (never `[object Object]`)
 */
export function formatErrorMessage(err: unknown, fallback = 'An unexpected error occurred. Please try again.'): string {
  if (err === null || err === undefined) {
    return fallback
  }

  // 1. If it's already a string
  if (typeof err === 'string') {
    const cleaned = cleanString(err)
    if (!cleaned) return fallback

    // If it's a JSON string representing an error object, try parsing it
    if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
      try {
        const parsed = JSON.parse(cleaned)
        return formatErrorMessage(parsed, fallback)
      } catch {
        // Not valid JSON, proceed with cleaned string
      }
    }

    return normalizeSpecificPatterns(cleaned)
  }

  // 2. If it's a standard JavaScript Error instance
  if (err instanceof Error) {
    const cleaned = cleanString(err.message)
    if (cleaned) {
      if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
        try {
          const parsed = JSON.parse(cleaned)
          return formatErrorMessage(parsed, fallback)
        } catch {
          // Keep err.message
        }
      }
      return normalizeSpecificPatterns(cleaned)
    }
  }

  // 3. If it's an object (including Supabase PostgrestError or fetch Response error)
  if (isPlainObject(err)) {
    const obj = err as ErrorLikeObject

    // Check specific Postgres error code first
    const code = cleanString(obj.code)
    if (code && POSTGRES_CODE_MAP[code]) {
      const details = cleanString(obj.details)
      const message = cleanString(obj.message)

      // Provide more specific context for duplicate key conflicts
      if (code === '23505') {
        const fullContext = `${message || ''} ${details || ''}`
        if (/users_email_key|students.*email/i.test(fullContext)) {
          return 'A user with this email address already exists.'
        }
        if (/student_code/i.test(fullContext)) {
          return 'A student with this student code already exists.'
        }
        if (/mentor_code/i.test(fullContext)) {
          return 'A mentor with this mentor code already exists.'
        }
        if (/uq_mentor_student/i.test(fullContext)) {
          return 'This student is already assigned to this mentor.'
        }
        if (/students_user_id/i.test(fullContext)) {
          return 'This user already has an active student profile.'
        }
        if (/mentors_user_id/i.test(fullContext)) {
          return 'This user already has an active mentor profile.'
        }
      }

      // If message is informative and not generic, use it; otherwise use mapped text
      if (message && !/violates row-level security policy/i.test(message)) {
        return normalizeSpecificPatterns(message)
      }
      return POSTGRES_CODE_MAP[code]
    }

    // Try extracting from candidate fields in priority order
    const candidateFields = [
      obj.message,
      obj.error_description,
      obj.error,
      obj.details,
      obj.hint,
      obj.statusText,
    ]

    for (const field of candidateFields) {
      if (typeof field === 'string') {
        const cleaned = cleanString(field)
        if (cleaned) return normalizeSpecificPatterns(cleaned)
      } else if (isPlainObject(field)) {
        const nested = formatErrorMessage(field, '')
        if (nested && nested !== fallback) return nested
      }
    }
  }

  // 4. Default fallback guarantee
  return fallback
}

/**
 * Normalizes known recurring backend error strings into clean user-facing language.
 */
function normalizeSpecificPatterns(msg: string): string {
  if (/new row violates row-level security policy/i.test(msg)) {
    return 'Permission denied: Operation not permitted by security policy.'
  }
  if (/failed to fetch/i.test(msg) || /fetch failed/i.test(msg) || /network\s?error/i.test(msg) || /ENOTFOUND/i.test(msg)) {
    return 'Network connection error. Please check your internet connection.'
  }
  if (/duplicate key value violates unique constraint/i.test(msg)) {
    if (/users_email_key/i.test(msg)) return 'A user with this email address already exists.'
    if (/student_code/i.test(msg)) return 'A student with this student code already exists.'
    if (/mentor_code/i.test(msg)) return 'A mentor with this mentor code already exists.'
    if (/uq_mentor_student/i.test(msg)) return 'This student is already assigned to this mentor.'
    return 'A record with this unique information already exists.'
  }
  if (/jwt expired|invalid token|session expired/i.test(msg)) {
    return 'Your session has expired. Please sign in again.'
  }
  return msg
}
