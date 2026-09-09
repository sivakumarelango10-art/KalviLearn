import type { IncomingMessage, ServerResponse } from 'http'
import { authenticateFeedbackRequest, supabaseServer, type AuthenticatedUser } from './feedbackAuth'
import {
  validateFeedbackInput,
  normalizeFeedbackType,
  normalizePriority,
  isValidStatusTransition,
} from './feedbackLifecycle'
import { sendTicketToTeamSync } from './teamSyncService'

// In-memory sliding-window rate limiter (e.g. max 15 submissions/10min per IP/user)
interface RateRecord {
  count: number
  resetTime: number
}
const rateLimitMap = new Map<string, RateRecord>()

// In-memory deduplication cache: prevents duplicate clicks within 60s
const deduplicationCache = new Map<string, { timestamp: number; response: unknown }>()

function pruneRateLimiter() {
  const now = Date.now()
  if (rateLimitMap.size > 2000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now > v.resetTime) rateLimitMap.delete(k)
    }
  }
  if (deduplicationCache.size > 2000) {
    for (const [k, v] of deduplicationCache.entries()) {
      if (now - v.timestamp > 60000) deduplicationCache.delete(k)
    }
  }
}

export function checkRateLimit(key: string, maxLimit = 15, windowMs = 600000): { allowed: boolean; retryAfter?: number } {
  pruneRateLimiter()
  const now = Date.now()
  const record = rateLimitMap.get(key)
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return { allowed: true }
  }
  if (record.count >= maxLimit) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000)
    return { allowed: false, retryAfter }
  }
  record.count++
  return { allowed: true }
}

export function resetRateLimitsForTesting() {
  rateLimitMap.clear()
  deduplicationCache.clear()
}

export default async function handler(
  req: IncomingMessage & { body?: unknown; query?: Record<string, string> },
  res: ServerResponse & { status?: (code: number) => { json: (data: unknown) => void }; json?: (data: unknown) => void }
) {
  const sendJson = (statusCode: number, data: unknown) => {
    if (typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(statusCode).json(data)
    }
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  }

  // Standard CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Idempotency-Key')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  // Extract client IP
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    '127.0.0.1'

  // Extract Auth Token
  const authHeader = (req.headers['authorization'] as string) || ''
  const authResult = await authenticateFeedbackRequest(authHeader)

  // Parse Body
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  } else if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
    if (typeof req.on === 'function') {
      body = await new Promise((resolve) => {
        let data = ''
        req.on('data', (chunk) => {
          data += chunk
        })
        req.on('end', () => {
          try {
            resolve(JSON.parse(data || '{}'))
          } catch {
            resolve({})
          }
        })
        req.on('error', () => resolve({}))
        setTimeout(() => resolve(body || {}), 300)
      })
    }
  }

  const parsedBody = (body as Record<string, unknown>) || {}

  // Parse query params from URL if not already parsed
  const urlParts = (req.url || '').split('?')
  const queryParams = new URLSearchParams(urlParts[1] || '')
  const queryId = queryParams.get('id') || (parsedBody.id as string)
  const queryRef = queryParams.get('reference')
  const queryMine = queryParams.get('mine') === 'true'

  // ============================================================================
  // 1. GET /api/feedback — Retrieve feedback records
  // ============================================================================
  if (req.method === 'GET') {
    if (!authResult.authenticated || !authResult.user) {
      return sendJson(authResult.statusCode || 401, {
        success: false,
        error: 'Unauthenticated',
        message: authResult.error || 'Authentication required to access feedback records.',
      })
    }

    const user = authResult.user

    // A. Single Record Retrieval by ID or Reference
    if (queryId || queryRef) {
      let query = supabaseServer.from('feedback_reports').select('*')
      if (queryId) query = query.eq('id', queryId)
      if (queryRef) query = query.eq('public_reference', queryRef)

      const { data, error } = await query.maybeSingle()

      if (error || !data) {
        return sendJson(404, {
          success: false,
          error: 'Not Found',
          message: 'Feedback record not found.',
        })
      }

      // IDOR Authorization Protection:
      // Students and Mentors can only read their own records; Admins can read all.
      const isOwner = data.user_id === user.id || data.user_email_snapshot === user.email
      const isAdmin = user.role === 'ADMIN' || user.role === 'SUPERADMIN'

      if (!isOwner && !isAdmin) {
        return sendJson(403, {
          success: false,
          error: 'Forbidden',
          message: 'You are not authorized to view this feedback report.',
        })
      }

      return sendJson(200, {
        success: true,
        feedback: {
          id: data.id,
          reference: data.public_reference,
          type: data.type,
          title: data.title,
          description: data.description,
          rating: data.rating,
          status: data.status,
          priority: data.priority,
          portal: data.portal,
          route: data.route,
          attachmentUrl: data.attachment_url,
          attachmentMeta: data.attachment_meta,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          resolvedAt: data.resolved_at,
        },
      })
    }

    // B. User's Own Feedback List
    if (queryMine || user.role === 'STUDENT') {
      const { data, error } = await supabaseServer
        .from('feedback_reports')
        .select('id, public_reference, type, title, status, priority, created_at, resolved_at')
        .or(`user_id.eq.${user.id},user_email_snapshot.eq.${user.email}`)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        return sendJson(500, {
          success: false,
          error: 'Database Error',
          message: 'Failed to retrieve feedback list.',
        })
      }

      return sendJson(200, {
        success: true,
        items: (data || []).map((row) => ({
          id: row.id,
          reference: row.public_reference,
          type: row.type,
          title: row.title,
          status: row.status,
          priority: row.priority,
          createdAt: row.created_at,
          resolvedAt: row.resolved_at,
        })),
      })
    }

    // Admins can see recent reports
    if (user.role === 'ADMIN' || user.role === 'SUPERADMIN') {
      const { data, error } = await supabaseServer
        .from('feedback_reports')
        .select('id, public_reference, user_name_snapshot, user_email_snapshot, type, title, status, priority, created_at')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        return sendJson(500, { success: false, error: 'Database Error', message: error.message })
      }

      return sendJson(200, { success: true, items: data || [] })
    }

    return sendJson(403, { success: false, error: 'Forbidden', message: 'Access denied.' })
  }

  // ============================================================================
  // 2. PATCH /api/feedback — Update status (Lifecycle State Machine)
  // ============================================================================
  if (req.method === 'PATCH') {
    if (!authResult.authenticated || !authResult.user) {
      return sendJson(authResult.statusCode || 401, {
        success: false,
        error: 'Unauthenticated',
        message: authResult.error || 'Authentication required.',
      })
    }

    const user = authResult.user
    const targetId = queryId || (parsedBody.id as string)
    const targetStatus = typeof parsedBody.status === 'string' ? parsedBody.status.trim().toUpperCase() : ''

    if (!targetId || !targetStatus) {
      return sendJson(400, {
        success: false,
        error: 'Missing Parameters',
        message: 'Feedback ID and target status are required.',
      })
    }

    // Fetch existing record
    const { data: existing, error: fetchErr } = await supabaseServer
      .from('feedback_reports')
      .select('*')
      .eq('id', targetId)
      .maybeSingle()

    if (fetchErr || !existing) {
      return sendJson(404, {
        success: false,
        error: 'Not Found',
        message: 'Feedback report not found.',
      })
    }

    // Validate lifecycle transition
    if (!isValidStatusTransition(existing.status, targetStatus)) {
      return sendJson(422, {
        success: false,
        error: 'Invalid Status Transition',
        message: `Status transition from ${existing.status} to ${targetStatus} is not permitted by the lifecycle.`,
      })
    }

    // Authorization check on transition:
    // Only Admin/Mentor can triage, progress, resolve.
    // Creator can only reopen (RESOLVED/CLOSED -> OPEN).
    const isOwner = existing.user_id === user.id || existing.user_email_snapshot === user.email
    const isAdmin = user.role === 'ADMIN' || user.role === 'SUPERADMIN' || user.role === 'MENTOR'

    if (targetStatus === 'OPEN') {
      if (!isOwner && !isAdmin) {
        return sendJson(403, {
          success: false,
          error: 'Forbidden',
          message: 'Only the feedback author or staff can reopen this feedback.',
        })
      }
    } else if (!isAdmin) {
      return sendJson(403, {
        success: false,
        error: 'Forbidden',
        message: 'Administrative privileges required to advance ticket lifecycle.',
      })
    }

    const updatePayload: Record<string, unknown> = {
      status: targetStatus,
      updated_at: new Date().toISOString(),
    }
    if (targetStatus === 'RESOLVED') {
      updatePayload.resolved_at = new Date().toISOString()
    } else if (targetStatus === 'OPEN') {
      updatePayload.resolved_at = null
    }

    const { data: updated, error: updateErr } = await supabaseServer
      .from('feedback_reports')
      .update(updatePayload)
      .eq('id', targetId)
      .select('id, public_reference, status, updated_at, resolved_at')
      .single()

    if (updateErr) {
      return sendJson(500, {
        success: false,
        error: 'Database Error',
        message: 'Failed to update feedback status.',
      })
    }

    return sendJson(200, {
      success: true,
      feedback: {
        id: updated.id,
        reference: updated.public_reference,
        status: updated.status,
        updatedAt: updated.updated_at,
        resolvedAt: updated.resolved_at,
      },
    })
  }

  // ============================================================================
  // 3. POST /api/feedback — Create Feedback Report
  // ============================================================================
  if (req.method === 'POST') {
    // 1. Authoritative User Authentication
    if (!authResult.authenticated || !authResult.user) {
      return sendJson(authResult.statusCode || 401, {
        success: false,
        error: 'Unauthenticated',
        message: authResult.error || 'You must be logged in to submit feedback.',
      })
    }

    const user: AuthenticatedUser = authResult.user

    // 2. Rate Limiting Check (per user + IP)
    const rateLimitKey = `fb_${user.id}_${ip}`
    const rate = checkRateLimit(rateLimitKey, 15, 600000) // 15 submissions per 10 min
    if (!rate.allowed) {
      res.setHeader('Retry-After', String(rate.retryAfter || 60))
      return sendJson(429, {
        success: false,
        error: 'Too Many Requests',
        message: `Feedback submission rate limit exceeded. Please wait ${rate.retryAfter} seconds before submitting again.`,
      })
    }

    // 3. Request Validation & Sanitization
    const validation = validateFeedbackInput({
      type: parsedBody.type,
      title: parsedBody.title,
      description: parsedBody.description,
      rating: parsedBody.rating,
    })

    if (!validation.valid) {
      return sendJson(400, {
        success: false,
        error: 'Validation Error',
        message: validation.error,
        field: validation.field,
      })
    }

    const feedbackType = normalizeFeedbackType(parsedBody.type)!
    const title = validation.sanitizedTitle || null
    const description = validation.sanitizedDescription!
    const rating = typeof parsedBody.rating === 'string' ? parsedBody.rating.trim().toUpperCase() : null
    const featureArea = typeof parsedBody.featureArea === 'string' ? parsedBody.featureArea.trim() : null
    const priority = normalizePriority(parsedBody.priority)

    // 4. Duplicate Submission & Idempotency Defense
    const idempotencyHeader = (req.headers['x-idempotency-key'] as string) || (parsedBody.idempotencyKey as string)
    const contentSignature = `${user.id}:${feedbackType}:${title || ''}:${description.substring(0, 100)}`
    const dedupeKey = idempotencyHeader || contentSignature

    const cachedSubmission = deduplicationCache.get(dedupeKey)
    if (cachedSubmission && Date.now() - cachedSubmission.timestamp < 60000) {
      if (idempotencyHeader) {
        // Return idempotent cached success response
        return sendJson(200, cachedSubmission.response)
      }
      return sendJson(409, {
        success: false,
        error: 'Duplicate Submission',
        message: 'Duplicate submission detected. Please wait before submitting identical feedback.',
      })
    }

    // 5. Derive Portal and Route from Authenticated User & Request
    const derivedPortal =
      user.role === 'CAMPUS_MANAGER'
        ? 'CAMPUS_MANAGER'
        : user.role === 'MENTOR'
        ? 'MENTOR'
        : user.role === 'ADMIN' || user.role === 'SUPERADMIN'
        ? 'ADMIN'
        : 'STUDENT'

    const route = typeof parsedBody.route === 'string' ? parsedBody.route.substring(0, 255) : null
    const pageUrl = typeof parsedBody.pageUrl === 'string' ? parsedBody.pageUrl.substring(0, 1000) : null
    const module = typeof parsedBody.module === 'string' ? parsedBody.module.substring(0, 100) : null

    // 6. Process Optional Image Attachment (Supports permanent storage URL & Base64 upload)
    let attachmentUrl: string | null = null
    let attachmentMeta: Record<string, unknown> | null = null

    if (parsedBody.attachment && typeof parsedBody.attachment === 'object') {
      const att = parsedBody.attachment as Record<string, unknown>
      const rawUrl = (typeof att.fileUrl === 'string' && att.fileUrl) ? att.fileUrl : (typeof att.dataUrl === 'string' ? att.dataUrl : null)
      const fileName = typeof att.fileName === 'string' ? att.fileName : 'attachment.png'
      const fileType = typeof att.fileType === 'string' ? att.fileType.toLowerCase() : 'image/png'
      const fileSize = typeof att.fileSize === 'number' ? att.fileSize : 0

      // Enforce 5MB limit and allowed MIME types
      const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
      if (rawUrl && allowedMimes.includes(fileType) && fileSize <= 5 * 1024 * 1024) {
        if (rawUrl.startsWith('data:image/')) {
          try {
            const matches = rawUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
            if (matches && matches.length === 3) {
              const buffer = Buffer.from(matches[2], 'base64')
              const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
              const path = `feedback/${Date.now()}_${Math.random().toString(36).slice(2, 7)}_${cleanName}`
              const { error: uploadError } = await supabaseServer.storage
                .from('feedback-attachments')
                .upload(path, buffer, {
                  contentType: matches[1] || fileType,
                  upsert: true,
                })
              if (!uploadError) {
                const { data: urlData } = supabaseServer.storage
                  .from('feedback-attachments')
                  .getPublicUrl(path)
                if (urlData?.publicUrl) {
                  attachmentUrl = urlData.publicUrl
                }
              }
            }
          } catch (storageErr) {
            console.warn('[feedbackHandler] Base64 upload fallback warning:', storageErr)
          }
        }
        if (!attachmentUrl) {
          attachmentUrl = rawUrl
        }
        attachmentMeta = {
          fileName,
          fileType,
          fileSize,
        }
      }
    }

    // 7. Device and Telemetry Metadata
    const deviceInfo =
      parsedBody.deviceInfo && typeof parsedBody.deviceInfo === 'object'
        ? parsedBody.deviceInfo
        : {
            ip,
            userAgent: req.headers['user-agent'] || 'unknown',
          }

    // 8. Server-Authoritative Database Insertion
    try {
      const insertPayload = {
        user_id: user.id,
        user_name_snapshot: user.name,
        user_email_snapshot: user.email,
        user_role: user.role,
        portal: derivedPortal,
        type: feedbackType,
        title,
        description,
        rating,
        feature_area: featureArea,
        status: 'OPEN',
        priority,
        page_url: pageUrl,
        route,
        module,
        attachment_url: attachmentUrl,
        attachment_meta: attachmentMeta,
        device_info: deviceInfo,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabaseServer
        .from('feedback_reports')
        .insert(insertPayload)
        .select('id, public_reference, type, status, priority, created_at')
        .single()

      if (error || !data) {
        console.error('Database feedback insert error:', error)
        return sendJson(500, {
          success: false,
          error: 'Database Persistence Error',
          message: 'Failed to securely store feedback report in database.',
        })
      }

      // 9. Dispatch to TeamSync (Server-to-Server)
      let teamSyncMetadata: { ticketId?: string | null; ticketNumber?: string | null; status?: string } | null = null
      try {
        const teamSyncRes = await sendTicketToTeamSync(
          {
            source: 'KALVILEARN',
            sourceReferenceId: data.public_reference,
            type: feedbackType,
            title: title || 'User Report',
            description,
            priority,
            portal: derivedPortal,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            page: route || pageUrl,
            metadata: {
              ...deviceInfo,
              rating,
              featureArea,
              attachmentUrl: attachmentUrl || null,
              submittedAt: data.created_at,
            },
            attachments: attachmentUrl ? [
              {
                fileName: (attachmentMeta?.fileName as string) || 'attachment.png',
                fileUrl: attachmentUrl,
                fileType: (attachmentMeta?.fileType as string) || 'image/png',
                fileSize: (attachmentMeta?.fileSize as number) || 0,
              }
            ] : [],
          },
          { idempotencyKey: dedupeKey }
        )

        if (teamSyncRes.success && teamSyncRes.ticketId) {
          teamSyncMetadata = {
            ticketId: teamSyncRes.ticketId,
            ticketNumber: teamSyncRes.ticketNumber || null,
            status: teamSyncRes.status || 'OPEN',
          }

          await supabaseServer
            .from('feedback_reports')
            .update({
              teamsync_id: teamSyncRes.ticketId,
              teamsync_ticket_number: teamSyncRes.ticketNumber || null,
              teamsync_status: 'SENT',
              teamsync_attempts: teamSyncRes.retries + 1,
              teamsync_last_attempt: new Date().toISOString(),
              teamsync_error: null,
            })
            .eq('id', data.id)
        } else if (teamSyncRes.error) {
          await supabaseServer
            .from('feedback_reports')
            .update({
              teamsync_status: 'RETRY_REQUIRED',
              teamsync_attempts: teamSyncRes.retries + 1,
              teamsync_last_attempt: new Date().toISOString(),
              teamsync_error: teamSyncRes.error.message,
            })
            .eq('id', data.id)
        }
      } catch (tsErr) {
        console.warn('Background TeamSync dispatch notice in /api/feedback:', tsErr)
      }

      const successResponse = {
        success: true,
        reportId: data.public_reference,
        feedback: {
          id: data.id,
          reference: data.public_reference,
          type: data.type,
          status: data.status,
          priority: data.priority,
          createdAt: data.created_at,
        },
        teamSync: teamSyncMetadata,
      }

      // Cache for idempotency & deduplication
      deduplicationCache.set(dedupeKey, {
        timestamp: Date.now(),
        response: successResponse,
      })

      return sendJson(201, successResponse)
    } catch (err: unknown) {
      console.error('Unexpected feedback error:', err)
      return sendJson(500, {
        success: false,
        error: 'Internal Server Error',
        message: 'An unexpected error occurred while saving your feedback.',
      })
    }
  }

  return sendJson(405, { error: 'Method Not Allowed.' })
}
