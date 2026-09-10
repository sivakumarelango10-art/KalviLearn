import type { IncomingMessage, ServerResponse } from 'http'
import { authenticateFeedbackRequest, supabaseServer, type AuthenticatedUser } from './feedbackAuth'
import {
  validateFeedbackInput,
  normalizeFeedbackType,
  normalizePriority,
} from './feedbackLifecycle'
import {
  sendTicketToTeamSync,
  type TeamSyncTicketPayload,
} from './teamSyncService'

// Sliding-window rate limiter (15 submissions / 10 min per user + IP)
interface RateRecord {
  count: number
  resetTime: number
}
const rateLimitMap = new Map<string, RateRecord>()

// Idempotency & deduplication cache (60s TTL)
const idempotencyCache = new Map<string, { timestamp: number; response: unknown }>()

export function resetTeamSyncRateLimitsForTesting() {
  rateLimitMap.clear()
  idempotencyCache.clear()
}

function checkRateLimit(key: string, maxLimit = 15, windowMs = 600000): { allowed: boolean; retryAfter?: number } {
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
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Idempotency-Key')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    return sendJson(405, { success: false, error: 'Method Not Allowed', message: 'Only POST is allowed on this endpoint.' })
  }

  // Extract client IP
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    '127.0.0.1'

  // 1. Authoritative User Authentication
  const authHeader = (req.headers['authorization'] as string) || ''
  const authResult = await authenticateFeedbackRequest(authHeader)

  if (!authResult.authenticated || !authResult.user) {
    return sendJson(authResult.statusCode || 401, {
      success: false,
      error: 'Unauthenticated',
      message: authResult.error || 'Authentication required to submit TeamSync tickets.',
    })
  }

  const user: AuthenticatedUser = authResult.user

  // 2. Sliding-Window Rate Limiting
  const rateLimitKey = `teamsync_${user.id}_${ip}`
  const rate = checkRateLimit(rateLimitKey, 15, 600000)
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfter || 60))
    return sendJson(429, {
      success: false,
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Please wait ${rate.retryAfter} seconds before submitting again.`,
    })
  }

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

  // 3. Validation & Sanitization
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
  const title = validation.sanitizedTitle || (feedbackType === 'FEEDBACK' ? 'General Feedback' : 'User Report')
  const description = validation.sanitizedDescription!
  const rating = typeof parsedBody.rating === 'string' ? parsedBody.rating.trim().toUpperCase() : null
  const featureArea = typeof parsedBody.featureArea === 'string' ? parsedBody.featureArea.trim() : null
  const priority = normalizePriority(parsedBody.priority)

  // 4. Idempotency & Deduplication
  const idempotencyHeader =
    (req.headers['x-idempotency-key'] as string) ||
    (parsedBody.idempotencyKey as string)
  const contentSignature = `${user.id}:${feedbackType}:${title}:${description.substring(0, 100)}`
  const dedupeKey = idempotencyHeader || contentSignature

  const cached = idempotencyCache.get(dedupeKey)
  if (cached && Date.now() - cached.timestamp < 60000) {
    if (idempotencyHeader) {
      return sendJson(200, cached.response)
    }
    return sendJson(409, {
      success: false,
      error: 'Duplicate Submission',
      message: 'Duplicate submission detected. Please wait before submitting identical feedback.',
    })
  }

  // 5. Derive Portal and Route from Authenticated User
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

  // 6. Attachment handling
  let attachmentUrl: string | null = null
  let attachmentMeta: Record<string, unknown> | null = null
  if (parsedBody.attachment && typeof parsedBody.attachment === 'object') {
    const att = parsedBody.attachment as Record<string, unknown>
    const fileUrl = typeof att.fileUrl === 'string' && att.fileUrl.trim() ? att.fileUrl.trim() : null
    const dataUrl = typeof att.dataUrl === 'string' && att.dataUrl.trim() ? att.dataUrl.trim() : null
    const rawUrl = fileUrl || dataUrl
    const fileName = typeof att.fileName === 'string' ? att.fileName : 'attachment.png'
    const fileType = typeof att.fileType === 'string' ? att.fileType.toLowerCase() : 'image/png'
    const fileSize = typeof att.fileSize === 'number' ? att.fileSize : 0
    const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']

    if (rawUrl) {
      if (!allowedMimes.includes(fileType)) {
        return sendJson(400, {
          success: false,
          error: 'Validation Error',
          message: 'Invalid attachment format. Only image files (PNG, JPG, WEBP, GIF) are supported.',
          field: 'attachment',
        })
      }
      if (fileSize > 5 * 1024 * 1024) {
        return sendJson(400, {
          success: false,
          error: 'Validation Error',
          message: 'Attachment exceeds 5MB maximum file size limit.',
          field: 'attachment',
        })
      }

      attachmentUrl = rawUrl

      // If rawUrl is a Base64 dataUrl, persist it into Supabase Storage to obtain a lightweight public HTTPS URL
      if (rawUrl.startsWith('data:image/')) {
        try {
          const parts = rawUrl.split(',')
          if (parts.length > 1 && parts[1]) {
            const buffer = Buffer.from(parts[1], 'base64')
            const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
            const path = `feedback/${Date.now()}_${Math.random().toString(36).slice(2, 7)}_${cleanName}`
            const { error: uploadError } = await supabaseServer.storage
              .from('feedback-attachments')
              .upload(path, buffer, {
                contentType: fileType,
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
        } catch (uploadErr) {
          console.warn('[TeamSyncHandler] Storage conversion warning, keeping original:', uploadErr)
        }
      }

      attachmentMeta = { fileName, fileType, fileSize }
    }
  }

  const deviceInfo =
    parsedBody.deviceInfo && typeof parsedBody.deviceInfo === 'object'
      ? (parsedBody.deviceInfo as Record<string, unknown>)
      : {
          ip,
          userAgent: req.headers['user-agent'] || 'unknown',
          browser: typeof parsedBody.browser === 'string' ? parsedBody.browser : 'unknown',
          device: typeof parsedBody.device === 'string' ? parsedBody.device : 'unknown',
        }

  // 7. Local Database Insertion (Phase 2 Source of Truth)
  let localReport: { id: string; public_reference: string; type: string; status: string; priority: string; created_at: string }

  try {
    // Check if user.id exists in public.users to satisfy the foreign key constraint.
    // If not, keep user_id null while preserving authoritative user snapshots.
    let validDbUserId: string | null = null
    if (user.id) {
      try {
        const { data: userExists } = await supabaseServer
          .from('users')
          .select('id')
          .eq('id', user.id)
          .maybeSingle()
        if (userExists) {
          validDbUserId = userExists.id
        }
      } catch {
        validDbUserId = null
      }
    }

    const insertPayload = {
      user_id: validDbUserId,
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
      teamsync_status: 'PENDING',
      teamsync_attempts: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabaseServer
      .from('feedback_reports')
      .insert(insertPayload)
      .select('id, public_reference, type, status, priority, created_at')
      .single()

    if (error || !data) {
      console.error('Database persistence error for TeamSync ticket:', error)
      return sendJson(500, {
        success: false,
        error: 'Database Persistence Error',
        message: 'Failed to securely store report in local database before TeamSync dispatch.',
      })
    }

    localReport = data
  } catch (dbErr) {
    console.error('Database connection error:', dbErr)
    return sendJson(500, {
      success: false,
      error: 'Database Error',
      message: 'Unable to connect to database.',
    })
  }

  // 8. Dispatch to TeamSync (Server-to-Server)
  const teamSyncPayload: TeamSyncTicketPayload = {
    source: 'KALVILEARN',
    sourceReferenceId: localReport.public_reference,
    type: feedbackType,
    title,
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
      submittedAt: localReport.created_at,
    },
    attachments: attachmentUrl ? [
      {
        fileName: (attachmentMeta?.fileName as string) || 'attachment.png',
        fileUrl: attachmentUrl,
        fileType: (attachmentMeta?.fileType as string) || 'image/png',
        fileSize: (attachmentMeta?.fileSize as number) || 0,
      }
    ] : [],
  }

  const teamSyncResult = await sendTicketToTeamSync(teamSyncPayload, {
    idempotencyKey: idempotencyHeader || localReport.public_reference,
  })

  // 9. Update Local Database with TeamSync Synchronization Status
  try {
    const updatePayload: Record<string, unknown> = {
      teamsync_attempts: teamSyncResult.retries + 1,
      teamsync_last_attempt: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    if (teamSyncResult.success && teamSyncResult.ticketId) {
      updatePayload.teamsync_id = teamSyncResult.ticketId
      updatePayload.teamsync_ticket_number = teamSyncResult.ticketNumber || null
      updatePayload.teamsync_status = 'SENT'
      updatePayload.teamsync_error = null
    } else {
      const isTransient =
        teamSyncResult.error?.httpStatus && [502, 503, 504, 429].includes(teamSyncResult.error.httpStatus)
      updatePayload.teamsync_status = isTransient ? 'RETRY_REQUIRED' : 'FAILED'
      updatePayload.teamsync_error = teamSyncResult.error?.message || 'Unknown TeamSync error'
    }

    await supabaseServer
      .from('feedback_reports')
      .update(updatePayload)
      .eq('id', localReport.id)
  } catch (updateErr) {
    console.warn('Failed to update local TeamSync sync status in database:', updateErr)
  }

  // 10. Format and Return Response
  const responsePayload = {
    success: true,
    reportId: localReport.public_reference,
    localId: localReport.id,
    feedback: {
      id: localReport.id,
      reference: localReport.public_reference,
      type: localReport.type,
      status: localReport.status,
      priority: localReport.priority,
      createdAt: localReport.created_at,
    },
    teamSync: teamSyncResult.success
      ? {
          ticketId: teamSyncResult.ticketId,
          ticketNumber: teamSyncResult.ticketNumber,
          status: teamSyncResult.status || 'OPEN',
        }
      : {
          ticketId: null,
          ticketNumber: null,
          status: 'QUEUED_FOR_RETRY',
          message: teamSyncResult.error?.message || 'Ticket saved locally; TeamSync synchronization will retry.',
        },
    message: teamSyncResult.success
      ? 'Report successfully submitted to KalviLearn and synchronized with TeamSync.'
      : 'Report saved locally in KalviLearn. TeamSync synchronization is queued.',
  }

  // Cache response for idempotent deduplication
  idempotencyCache.set(dedupeKey, {
    timestamp: Date.now(),
    response: responsePayload,
  })

  return sendJson(201, responsePayload)
}
