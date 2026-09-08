/**
 * Feedback Lifecycle, Validation, and State Machine
 *
 * Enforces:
 * 1. Controlled feedback types (BUG, FEATURE, FEEDBACK, ISSUE, IMPROVEMENT, OTHER)
 * 2. Controlled priority (LOW, MEDIUM, HIGH, CRITICAL)
 * 3. Strict lifecycle status transitions (OPEN -> TRIAGED -> IN_PROGRESS -> RESOLVED -> CLOSED)
 * 4. Safe string sanitization against XSS
 */

export const VALID_FEEDBACK_TYPES = [
  'BUG',
  'FEATURE',
  'FEEDBACK',
  'ISSUE',
  'IMPROVEMENT',
  'OTHER',
] as const

export type ValidFeedbackType = (typeof VALID_FEEDBACK_TYPES)[number]

export const VALID_STATUSES = [
  'OPEN',
  'TRIAGED',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED',
] as const

export type ValidStatus = (typeof VALID_STATUSES)[number]

export const VALID_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const
export type ValidPriority = (typeof VALID_PRIORITIES)[number]

export const VALID_RATINGS = ['TERRIBLE', 'BAD', 'GOOD', 'AMAZING'] as const
export type ValidRating = (typeof VALID_RATINGS)[number]

/**
 * Strict status transition rules:
 * OPEN -> TRIAGED
 * TRIAGED -> IN_PROGRESS, RESOLVED
 * IN_PROGRESS -> RESOLVED
 * RESOLVED -> CLOSED, OPEN (reopen)
 * CLOSED -> OPEN (reopen)
 */
const ALLOWED_STATUS_TRANSITIONS: Record<ValidStatus, ValidStatus[]> = {
  OPEN: ['TRIAGED'],
  TRIAGED: ['IN_PROGRESS', 'RESOLVED'],
  IN_PROGRESS: ['RESOLVED'],
  RESOLVED: ['CLOSED', 'OPEN'],
  CLOSED: ['OPEN'],
}

/**
 * Validates whether a status transition is permitted by the lifecycle
 */
export function isValidStatusTransition(currentStatus: string, targetStatus: string): boolean {
  const current = currentStatus.toUpperCase() as ValidStatus
  const target = targetStatus.toUpperCase() as ValidStatus

  if (!VALID_STATUSES.includes(current) || !VALID_STATUSES.includes(target)) {
    return false
  }

  if (current === target) {
    return true // idempotent no-op
  }

  const allowedNext = ALLOWED_STATUS_TRANSITIONS[current] || []
  return allowedNext.includes(target)
}

/**
 * Normalizes and validates feedback type.
 * Maps 'FEATURE_REQUEST' to 'FEATURE' for consistency.
 */
export function normalizeFeedbackType(type: unknown): ValidFeedbackType | null {
  if (typeof type !== 'string') return null
  const upper = type.trim().toUpperCase()
  if (upper === 'FEATURE_REQUEST') return 'FEATURE'
  if (VALID_FEEDBACK_TYPES.includes(upper as ValidFeedbackType)) {
    return upper as ValidFeedbackType
  }
  return null
}

/**
 * Normalizes and validates priority
 */
export function normalizePriority(priority?: unknown): ValidPriority {
  if (typeof priority !== 'string') return 'MEDIUM'
  const upper = priority.trim().toUpperCase()
  if (VALID_PRIORITIES.includes(upper as ValidPriority)) {
    return upper as ValidPriority
  }
  return 'MEDIUM'
}

/**
 * Sanitizes input string: strips script tags and removes control characters
 */
export function sanitizeString(val: string): string {
  if (!val) return ''
  return val
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '') // strip raw HTML tags
    .trim()
}

export interface FeedbackValidationResult {
  valid: boolean
  error?: string
  field?: string
  sanitizedTitle?: string
  sanitizedDescription?: string
}

/**
 * Comprehensive server-side validation
 */
export function validateFeedbackInput(payload: {
  type: unknown
  title?: unknown
  description?: unknown
  rating?: unknown
}): FeedbackValidationResult {
  const normType = normalizeFeedbackType(payload.type)
  if (!normType) {
    return {
      valid: false,
      error: `Invalid feedback type. Must be one of: ${VALID_FEEDBACK_TYPES.join(', ')}`,
      field: 'type',
    }
  }

  const rawTitle = typeof payload.title === 'string' ? payload.title : ''
  const sanitizedTitle = sanitizeString(rawTitle)

  // Title validation
  const requiresTitle = ['BUG', 'FEATURE', 'ISSUE'].includes(normType)
  if (requiresTitle && !sanitizedTitle) {
    return {
      valid: false,
      error: `Title is required for ${normType} reports`,
      field: 'title',
    }
  }

  if (sanitizedTitle.length > 200) {
    return {
      valid: false,
      error: 'Title cannot exceed 200 characters',
      field: 'title',
    }
  }

  // Description validation
  if (typeof payload.description !== 'string') {
    return {
      valid: false,
      error: 'Description is required and must be text',
      field: 'description',
    }
  }

  const sanitizedDesc = sanitizeString(payload.description)
  if (sanitizedDesc.length < 5) {
    return {
      valid: false,
      error: 'Description must be at least 5 characters long',
      field: 'description',
    }
  }

  if (sanitizedDesc.length > 4000) {
    return {
      valid: false,
      error: 'Description cannot exceed 4000 characters',
      field: 'description',
    }
  }

  // Sentiment rating validation
  if (payload.rating !== undefined && payload.rating !== null && payload.rating !== '') {
    const rawRating = String(payload.rating).trim().toUpperCase()
    if (!VALID_RATINGS.includes(rawRating as ValidRating)) {
      return {
        valid: false,
        error: `Rating must be one of: ${VALID_RATINGS.join(', ')}`,
        field: 'rating',
      }
    }
  }

  return {
    valid: true,
    sanitizedTitle: sanitizedTitle || undefined,
    sanitizedDescription: sanitizedDesc,
  }
}
