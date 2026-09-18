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
  fileUrl?: string
  dataUrl?: string
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
  teamSync?: {
    ticketId?: string | null
    ticketNumber?: string | null
    status?: string
    message?: string
  } | null
}

export const feedbackService = {
  /**
   * Uploads an image attachment directly to Supabase Storage.
   * Returns the permanent public HTTPS URL and file metadata.
   */
  async uploadAttachment(file: File): Promise<{
    publicUrl: string
    fileName: string
    fileType: string
    fileSize: number
  }> {
    const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const path = `feedback/${Date.now()}_${Math.random().toString(36).slice(2, 7)}_${cleanName}`

    const { error } = await supabase.storage
      .from('feedback-attachments')
      .upload(path, file, {
        contentType: file.type || 'image/png',
        upsert: true,
      })

    if (error) {
      console.warn('[FeedbackService] Direct storage upload error, falling back to inline data:', error)
      throw new Error('Failed to upload attachment.')
    }

    const { data: urlData } = supabase.storage
      .from('feedback-attachments')
      .getPublicUrl(path)

    return {
      publicUrl: urlData.publicUrl,
      fileName: file.name,
      fileType: file.type || 'image/png',
      fileSize: file.size,
    }
  },

  /**
   * Dispatches user feedback to the KalviLearn integration service.
   * Authenticates with live Supabase session token, enforces validation, stores in PostgreSQL,
   * and synchronizes with TeamSync.
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
      throw new Error('Authentication required. Please sign in to submit feedback.')
    }

    const idempotencyKey =
      payload.idempotencyKey ||
      `idem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    // 2. Submit to backend API (Prefer TeamSync integration endpoint, fallback to /api/feedback)
    let res = await fetch('/api/integrations/teamsync/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(payload),
    }).catch(() => null)

    if (!res || res.status === 404) {
      // Fallback to /api/feedback
      res = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify(payload),
      })
    }

    const text = await res.text().catch(() => '')
    let json: Record<string, any> = {}
    try {
      json = JSON.parse(text)
    } catch {}

    if (res.status === 201 || res.status === 200) {
      const feedback = json.feedback as FeedbackRecordSummary | undefined
      return {
        success: true,
        message: json.message || 'Feedback submitted successfully.',
        reference: feedback?.reference || json.reportId,
        feedbackId: feedback?.reference || json.reportId || feedback?.id,
        feedback,
        teamSync: json.teamSync || null,
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
    throw new Error(json.message || json.error || (text && text.includes('FUNCTION_INVOCATION_FAILED') ? 'Serverless function error. Please try again in a moment.' : 'Server error while processing feedback. Please try again later.'))
  },

  /**
   * Subscribes to real-time status and comment updates for feedback reports via Supabase Realtime.
   * Returns an unsubscribe cleanup function.
   */
  subscribeToFeedbackUpdates(
    feedbackReportId: string | null,
    onUpdate: (payload: { type: 'REPORT_UPDATE' | 'COMMENT_ADDED'; data: any }) => void
  ): () => void {
    if (!supabase || typeof (supabase as any).channel !== 'function') {
      return () => {}
    }

    const channelName = feedbackReportId ? `feedback_${feedbackReportId}` : 'feedback_all'
    const channel = (supabase as any).channel(channelName)

    // Listen to updates on feedback_reports table
    const reportFilter = feedbackReportId ? `id=eq.${feedbackReportId}` : undefined
    channel.on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'feedback_reports',
        ...(reportFilter ? { filter: reportFilter } : {}),
      },
      (payload: any) => {
        onUpdate({ type: 'REPORT_UPDATE', data: payload.new })
      }
    )

    // Listen to new comments on feedback_comments table
    const commentFilter = feedbackReportId ? `feedback_report_id=eq.${feedbackReportId}` : undefined
    channel.on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'feedback_comments',
        ...(commentFilter ? { filter: commentFilter } : {}),
      },
      (payload: any) => {
        onUpdate({ type: 'COMMENT_ADDED', data: payload.new })
      }
    )

    channel.subscribe()

    return () => {
      try {
        (supabase as any).removeChannel(channel)
      } catch {
        // Safe unsubscribe
      }
    }
  },
}

