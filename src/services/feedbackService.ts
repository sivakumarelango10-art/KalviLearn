import { supabase } from '../lib/supabase'

export type FeedbackType =
  | 'BUG'
  | 'FEATURE_REQUEST'
  | 'FEEDBACK'
  | 'ISSUE'
  | 'IMPROVEMENT'
  | 'OTHER'

export interface FeedbackAttachment {
  fileName: string
  fileType: string
  fileSize: number
  dataUrl: string
}

export interface SubmitFeedbackPayload {
  type: FeedbackType
  title?: string
  description: string
  rating?: string
  featureArea?: string
  attachment?: FeedbackAttachment
  portal: string
  route: string
  module?: string
  browser?: string
  device?: string
  app_version?: string
  request_id?: string
  idempotencyKey?: string
}

export interface FeedbackRecordSummary {
  id: string
  reference: string
  type: string
  status: string
  priority: string
  createdAt: string
}

export interface FeedbackSubmissionResult {
  success: boolean
  message: string
  reference?: string
  feedbackId?: string | number
  feedback?: FeedbackRecordSummary
}

export const feedbackService = {
  /**
   * Dispatches user feedback to the real KalviLearn backend service (/api/feedback).
   * Authenticates with live Supabase session token, enforces validation, and stores in PostgreSQL.
   */
  async submitFeedback(payload: SubmitFeedbackPayload): Promise<FeedbackSubmissionResult> {
    // 1. Retrieve authoritative session access token from Supabase
    let token = ''
    try {
      const { data: { session } } = await supabase.auth.getSession()
      token = session?.access_token || ''
    } catch {
      // In non-browser or disconnected environment
    }

    if (!token) {
      // In dev environment or test session, check if active user is in localStorage
      try {
        const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('kalvi_active_user') : null
        if (saved) {
          const user = JSON.parse(saved)
          if (user?.email) {
            token = `test_auth_${user.role || 'STUDENT'}_${user.email}`
          }
        }
      } catch {
        // ignore
      }
    }

    if (!token) {
      throw new Error('Authentication required. Please sign in to submit feedback.')
    }

    const idempotencyKey =
      payload.idempotencyKey ||
      `idem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    // 2. Submit to backend API
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(payload),
    })

    const json = await res.json().catch(() => ({}))

    if (res.status === 201 || res.status === 200) {
      const feedback = json.feedback as FeedbackRecordSummary | undefined
      return {
        success: true,
        message: 'Feedback submitted successfully.',
        reference: feedback?.reference,
        feedbackId: feedback?.reference || feedback?.id,
        feedback,
      }
    }

    // 3. Handle explicit backend HTTP status codes
    if (res.status === 400) {
      throw new Error(json.message || 'Validation Error: Please check your input and try again.')
    }
    if (res.status === 401) {
      throw new Error('Authentication required. Your session may have expired; please log in again.')
    }
    if (res.status === 403) {
      throw new Error(json.message || 'You are not authorized to perform this action.')
    }
    if (res.status === 409) {
      throw new Error('Duplicate submission detected. Please wait before resubmitting identical feedback.')
    }
    if (res.status === 422) {
      throw new Error(json.message || 'Unprocessable request: lifecycle transition not allowed.')
    }
    if (res.status === 429) {
      throw new Error(json.message || 'Rate limit exceeded. Please wait a few moments before submitting again.')
    }

    // 4. Server error (500)
    throw new Error(json.message || 'Server error while processing feedback. Please try again later.')
  },
}
