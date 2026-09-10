/**
 * TeamSync Webhook Service (Phase 4)
 *
 * Responsibilities:
 * - Idempotency tracking & replay protection via teamsync_webhook_events
 * - Locates corresponding KalviLearn feedback_reports via public_reference or teamsync_id
 * - Validates status transitions using KalviLearn's lifecycle state machine
 * - Normalizes and synchronizes priorities, assignments, and resolutions
 * - Idempotently persists and sanitizes TeamSync comments
 * - Maintains comprehensive, auditable event logs in feedback_audit_logs
 * - Safe error handling with structured, secret-free logging
 */

import { supabaseServer } from './feedbackAuth'
import {
  isValidStatusTransition,
  VALID_STATUSES,
  VALID_PRIORITIES,
  sanitizeString,
  type ValidStatus,
  type ValidPriority,
} from './feedbackLifecycle'

export interface WebhookEventPayload {
  eventId: string
  eventType: string
  timestamp: string | number
  ticketId?: string
  ticketNumber?: string
  source?: string
  sourceReferenceId?: string
  externalReferenceId?: string
  feedbackReportId?: string
  data?: Record<string, any>
  ticket?: Record<string, any>
  comment?: Record<string, any>
  previousStatus?: string
  newStatus?: string
  previousPriority?: string
  newPriority?: string
  assignee?: {
    id?: string
    name?: string
    email?: string
  }
}

export interface WebhookProcessResult {
  success: boolean
  statusCode: number
  code: string
  message: string
  eventId: string
  duplicate?: boolean
  unmapped?: boolean
  reportId?: string
  reference?: string
  updatedFields?: Record<string, any>
}

/**
 * Normalizes external TeamSync status values to KalviLearn lifecycle statuses.
 */
export function mapTeamSyncStatus(rawStatus?: unknown): ValidStatus | null {
  if (typeof rawStatus !== 'string') return null
  const clean = rawStatus.trim().toUpperCase()

  switch (clean) {
    case 'OPEN':
    case 'PENDING':
    case 'NEW':
      return 'OPEN'
    case 'TRIAGED':
    case 'TRIAGE':
    case 'CONFIRMED':
      return 'TRIAGED'
    case 'IN_PROGRESS':
    case 'IN PROGRESS':
    case 'ACTIVE':
    case 'WORKING':
      return 'IN_PROGRESS'
    case 'RESOLVED':
    case 'FIXED':
    case 'SOLVED':
    case 'COMPLETED':
      return 'RESOLVED'
    case 'CLOSED':
      return 'CLOSED'
    case 'REOPENED':
    case 'REOPEN':
      return 'OPEN'
    case 'BLOCKED':
    case 'WAITING':
      return 'BLOCKED'
    case 'REJECTED':
    case 'WONTFIX':
    case "WON'T FIX":
    case 'INVALID':
      return 'REJECTED'
    default:
      if (VALID_STATUSES.includes(clean as ValidStatus)) {
        return clean as ValidStatus
      }
      return null
  }
}

/**
 * Normalizes external TeamSync priority values to KalviLearn priority domain.
 */
export function mapTeamSyncPriority(rawPriority?: unknown): ValidPriority | null {
  if (typeof rawPriority !== 'string') return null
  const clean = rawPriority.trim().toUpperCase()

  if (VALID_PRIORITIES.includes(clean as ValidPriority)) {
    return clean as ValidPriority
  }
  if (clean === 'URGENT') return 'CRITICAL'
  if (clean === 'NORMAL') return 'MEDIUM'
  return null
}

/**
 * Structured safe logging for webhook processing events
 */
function logWebhookEvent(
  action:
    | 'TEAMSYNC_WEBHOOK_RECEIVED'
    | 'TEAMSYNC_WEBHOOK_PROCESSED'
    | 'TEAMSYNC_WEBHOOK_DUPLICATE_IGNORED'
    | 'TEAMSYNC_WEBHOOK_REJECTED'
    | 'TEAMSYNC_WEBHOOK_UNMAPPED_TICKET',
  details: {
    eventId: string
    eventType?: string
    ticketId?: string
    reference?: string
    reason?: string
    durationMs?: number
  }
) {
  const payload = {
    timestamp: new Date().toISOString(),
    event: action,
    ...details,
  }
  if (action === 'TEAMSYNC_WEBHOOK_REJECTED') {
    console.warn(`[TeamSync Webhook] ${action}:`, JSON.stringify(payload))
  } else {
    console.log(`[TeamSync Webhook] ${action}:`, JSON.stringify(payload))
  }
}

/**
 * Main Webhook Event Processor
 */
export async function processTeamSyncWebhook(
  rawPayload: Record<string, any>,
  _rawString?: string,
  eventIdHeader?: string
): Promise<WebhookProcessResult> {
  const startTime = Date.now()

  // 1. Extract and validate primary event attributes
  let eventId = String(
    eventIdHeader ||
    rawPayload.eventId ||
    rawPayload.event_id ||
    rawPayload.id ||
    ''
  ).trim()

  if (eventId.includes(',')) {
    eventId = eventId.split(',')[0].trim()
  }

  if (!eventId) {
    return {
      success: false,
      statusCode: 400,
      code: 'MISSING_EVENT_ID',
      message: 'Webhook payload or headers must include a valid event ID.',
      eventId: 'unknown',
    }
  }

  const rawEventType = String(
    rawPayload.eventType ||
    rawPayload.event_type ||
    rawPayload.event ||
    rawPayload.type ||
    ''
  ).trim().toUpperCase()

  if (!rawEventType) {
    return {
      success: false,
      statusCode: 400,
      code: 'MISSING_EVENT_TYPE',
      message: 'Webhook payload must specify an event type.',
      eventId,
    }
  }

  const ticketData = rawPayload.ticket || rawPayload.data?.ticket || {}
  const ticketId = String(
    rawPayload.ticketId ||
    rawPayload.ticket_id ||
    ticketData.id ||
    rawPayload.data?.ticketId ||
    ''
  ).trim() || null

  const ticketNumber = String(
    rawPayload.ticketNumber ||
    rawPayload.ticket_number ||
    ticketData.ticketNumber ||
    ticketData.number ||
    ''
  ).trim() || null

  const sourceReferenceId = String(
    rawPayload.sourceReferenceId ||
    rawPayload.source_reference_id ||
    rawPayload.externalReferenceId ||
    rawPayload.external_reference_id ||
    ticketData.sourceReferenceId ||
    ticketData.source_reference_id ||
    ticketData.externalReferenceId ||
    rawPayload.data?.reference ||
    ''
  ).trim() || null

  const feedbackReportId = String(
    rawPayload.feedbackReportId ||
    rawPayload.feedback_report_id ||
    ticketData.feedbackReportId ||
    ''
  ).trim() || null

  logWebhookEvent('TEAMSYNC_WEBHOOK_RECEIVED', {
    eventId,
    eventType: rawEventType,
    ticketId: ticketId || undefined,
    reference: sourceReferenceId || undefined,
  })

  // 2. Event Idempotency Check in teamsync_webhook_events
  try {
    const { data: existingEvent } = await supabaseServer
      .from('teamsync_webhook_events')
      .select('id, event_id, status, feedback_report_id')
      .eq('event_id', eventId)
      .maybeSingle()

    if (existingEvent) {
      logWebhookEvent('TEAMSYNC_WEBHOOK_DUPLICATE_IGNORED', {
        eventId,
        eventType: rawEventType,
        ticketId: ticketId || undefined,
        durationMs: Date.now() - startTime,
      })

      return {
        success: true,
        statusCode: 200,
        code: 'DUPLICATE_EVENT_IGNORED',
        message: 'This webhook event has already been processed idempotently.',
        eventId,
        duplicate: true,
        reportId: existingEvent.feedback_report_id || undefined,
      }
    }
  } catch (err) {
    console.warn('Idempotency check query warning:', err)
  }

  // 3. Locate Target KalviLearn Feedback Report
  let targetReport: any = null

  if (sourceReferenceId && sourceReferenceId.startsWith('FB-')) {
    const { data } = await supabaseServer
      .from('feedback_reports')
      .select('*')
      .eq('public_reference', sourceReferenceId)
      .maybeSingle()
    if (data) targetReport = data
  }

  if (!targetReport && ticketId) {
    const { data } = await supabaseServer
      .from('feedback_reports')
      .select('*')
      .eq('teamsync_id', ticketId)
      .maybeSingle()
    if (data) targetReport = data
  }

  if (!targetReport && ticketNumber) {
    const { data } = await supabaseServer
      .from('feedback_reports')
      .select('*')
      .eq('teamsync_ticket_number', ticketNumber)
      .maybeSingle()
    if (data) targetReport = data
  }

  if (!targetReport && feedbackReportId) {
    const { data } = await supabaseServer
      .from('feedback_reports')
      .select('*')
      .eq('id', feedbackReportId)
      .maybeSingle()
    if (data) targetReport = data
  }

  // 4. Handle Unmapped / Unknown External Tickets (Requirement 14)
  if (!targetReport) {
    logWebhookEvent('TEAMSYNC_WEBHOOK_UNMAPPED_TICKET', {
      eventId,
      eventType: rawEventType,
      ticketId: ticketId || undefined,
      reference: sourceReferenceId || undefined,
      reason: 'No matching KalviLearn feedback report found.',
      durationMs: Date.now() - startTime,
    })

    // Safely record unmapped webhook event for diagnostic audit without corrupting data
    await supabaseServer.from('teamsync_webhook_events').insert({
      event_id: eventId,
      event_type: rawEventType,
      ticket_id: ticketId,
      ticket_number: ticketNumber,
      payload: rawPayload,
      status: 'UNMAPPED_TICKET',
      error: 'No matching KalviLearn feedback report found.',
      processed_at: new Date().toISOString(),
    })

    return {
      success: false,
      statusCode: 202,
      code: 'UNKNOWN_EXTERNAL_TICKET',
      message: 'No corresponding KalviLearn feedback report was found for this TeamSync ticket.',
      eventId,
      unmapped: true,
    }
  }

  // 5. Execute Event-Specific State Synchronizations
  const updatedFields: Record<string, any> = {
    last_synced_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  const auditLogsToInsert: Array<{ action: string; previousValue: any; newValue: any; details?: string }> = []
  let newCommentRecord: any = null

  // Link TeamSync identifiers if not yet associated
  if (ticketId && !targetReport.teamsync_id) {
    updatedFields.teamsync_id = ticketId
  }
  if (ticketNumber && !targetReport.teamsync_ticket_number) {
    updatedFields.teamsync_ticket_number = ticketNumber
  }
  if (targetReport.teamsync_status !== 'SENT') {
    updatedFields.teamsync_status = 'SENT'
  }

  // ─── A. Status Updates (STATUS_CHANGED, RESOLVED, CLOSED, REOPENED) ─────────
  const isStatusEvent = [
    'STATUS_CHANGED',
    'TICKET_STATUS_CHANGED',
    'RESOLVED',
    'TICKET_RESOLVED',
    'CLOSED',
    'TICKET_CLOSED',
    'REOPENED',
    'TICKET_REOPENED',
  ].includes(rawEventType)

  if (isStatusEvent) {
    let rawTargetStatus: unknown = rawPayload.newStatus || rawPayload.status || ticketData.status

    if (rawEventType.includes('RESOLVED')) rawTargetStatus = 'RESOLVED'
    if (rawEventType.includes('CLOSED')) rawTargetStatus = 'CLOSED'
    if (rawEventType.includes('REOPENED')) rawTargetStatus = 'OPEN'

    const targetStatus = mapTeamSyncStatus(rawTargetStatus)

    if (!targetStatus) {
      return {
        success: false,
        statusCode: 400,
        code: 'INVALID_STATUS',
        message: `Unknown or unmapped TeamSync status: ${String(rawTargetStatus)}`,
        eventId,
      }
    }

    // Enforce Lifecycle State Machine Transition Rules
    if (!isValidStatusTransition(targetReport.status, targetStatus)) {
      logWebhookEvent('TEAMSYNC_WEBHOOK_REJECTED', {
        eventId,
        eventType: rawEventType,
        reference: targetReport.public_reference,
        reason: `Illegal lifecycle transition: ${targetReport.status} -> ${targetStatus}`,
      })

      await supabaseServer.from('teamsync_webhook_events').insert({
        event_id: eventId,
        event_type: rawEventType,
        ticket_id: ticketId || targetReport.teamsync_id,
        ticket_number: ticketNumber || targetReport.teamsync_ticket_number,
        feedback_report_id: targetReport.id,
        payload: rawPayload,
        status: 'FAILED',
        error: `Lifecycle transition from ${targetReport.status} to ${targetStatus} is rejected.`,
        processed_at: new Date().toISOString(),
      })

      return {
        success: false,
        statusCode: 422,
        code: 'ILLEGAL_STATUS_TRANSITION',
        message: `Transition from current status '${targetReport.status}' to '${targetStatus}' is prohibited by KalviLearn lifecycle rules.`,
        eventId,
      }
    }

    if (targetReport.status !== targetStatus) {
      updatedFields.status = targetStatus

      if (targetStatus === 'RESOLVED') {
        updatedFields.resolved_at = new Date().toISOString()
      } else if (targetStatus === 'OPEN') {
        updatedFields.resolved_at = null
      }

      auditLogsToInsert.push({
        action: rawEventType.includes('REOPEN') ? 'REOPENED' : rawEventType.includes('RESOLVE') ? 'RESOLVED' : 'STATUS_CHANGED',
        previousValue: { status: targetReport.status },
        newValue: { status: targetStatus },
        details: `Synchronized from TeamSync event ${eventId}`,
      })
    }
  }

  // ─── B. Priority Updates (PRIORITY_CHANGED) ─────────────────────────────────
  if (rawEventType === 'PRIORITY_CHANGED' || rawEventType === 'TICKET_PRIORITY_CHANGED') {
    const rawTargetPriority = rawPayload.newPriority || rawPayload.priority || ticketData.priority
    const targetPriority = mapTeamSyncPriority(rawTargetPriority)

    if (!targetPriority) {
      return {
        success: false,
        statusCode: 400,
        code: 'INVALID_PRIORITY',
        message: `Unknown or unmapped TeamSync priority: ${String(rawTargetPriority)}`,
        eventId,
      }
    }

    if (targetReport.priority !== targetPriority) {
      updatedFields.priority = targetPriority
      auditLogsToInsert.push({
        action: 'PRIORITY_CHANGED',
        previousValue: { priority: targetReport.priority },
        newValue: { priority: targetPriority },
        details: `Synchronized from TeamSync event ${eventId}`,
      })
    }
  }

  // ─── C. Assignment Updates (ASSIGNED) ───────────────────────────────────────
  if (rawEventType === 'ASSIGNED' || rawEventType === 'TICKET_ASSIGNED') {
    const assignee = rawPayload.assignee || ticketData.assignee || rawPayload.data?.assignee || {}
    const assigneeName = String(assignee.name || assignee.fullName || assignee.email || 'TeamSync Agent').trim()
    const assigneeEmail = typeof assignee.email === 'string' ? assignee.email.trim().toLowerCase() : null

    updatedFields.assigned_to = assigneeName
    updatedFields.assigned_email = assigneeEmail

    auditLogsToInsert.push({
      action: 'ASSIGNED',
      previousValue: { assignedTo: targetReport.assigned_to, assignedEmail: targetReport.assigned_email },
      newValue: { assignedTo: assigneeName, assignedEmail: assigneeEmail },
      details: `Assigned in TeamSync to ${assigneeName}`,
    })
  }

  // ─── D. Comment Synchronization (COMMENT_CREATED) ───────────────────────────
  if (rawEventType === 'COMMENT_CREATED' || rawEventType === 'TICKET_COMMENT_CREATED') {
    const commentObj = rawPayload.comment || rawPayload.data?.comment || rawPayload.data || {}
    const commentId = String(commentObj.id || commentObj.commentId || rawPayload.commentId || `ts_cmt_${eventId}`).trim()
    const authorName = String(commentObj.authorName || commentObj.author?.name || commentObj.author || 'TeamSync Staff').trim()
    const authorEmail = typeof commentObj.authorEmail === 'string' ? commentObj.authorEmail.trim() : (commentObj.author?.email || null)
    const authorRole = typeof commentObj.authorRole === 'string' ? commentObj.authorRole.trim() : (commentObj.author?.role || 'STAFF')
    const rawContent = String(commentObj.content || commentObj.body || commentObj.text || '').trim()

    if (rawContent) {
      const sanitizedContent = sanitizeString(rawContent)

      // Deduplication: Verify comment does not already exist
      const { data: existingComment } = await supabaseServer
        .from('feedback_comments')
        .select('id')
        .eq('teamsync_comment_id', commentId)
        .maybeSingle()

      if (!existingComment) {
        newCommentRecord = {
          feedback_report_id: targetReport.id,
          source: 'TEAMSYNC',
          teamsync_comment_id: commentId,
          author_name: authorName,
          author_email: authorEmail,
          author_role: authorRole,
          content: sanitizedContent,
          created_at: commentObj.createdAt || commentObj.created_at || new Date().toISOString(),
        }

        auditLogsToInsert.push({
          action: 'COMMENT_ADDED',
          previousValue: null,
          newValue: { commentId, authorName },
          details: `Comment synchronized from TeamSync by ${authorName}`,
        })
      }
    }
  }

  // 6. Apply Database Updates & Audit Logging
  try {
    // A. Update Feedback Report
    if (Object.keys(updatedFields).length > 0) {
      const { error: updateErr } = await supabaseServer
        .from('feedback_reports')
        .update(updatedFields)
        .eq('id', targetReport.id)

      if (updateErr) {
        throw updateErr
      }
    }

    // B. Insert New Comment if present
    if (newCommentRecord) {
      const { error: commentErr } = await supabaseServer
        .from('feedback_comments')
        .insert(newCommentRecord)
      if (commentErr) {
        console.warn('Comment insert warning:', commentErr)
      }
    }

    // C. Insert Audit Logs
    for (const log of auditLogsToInsert) {
      await supabaseServer.from('feedback_audit_logs').insert({
        feedback_report_id: targetReport.id,
        source: 'TEAMSYNC_WEBHOOK',
        event_id: eventId,
        action: log.action,
        previous_value: log.previousValue,
        new_value: log.newValue,
        details: log.details,
        created_at: new Date().toISOString(),
      })
    }

    // D. Persist Processed Webhook Event
    await supabaseServer.from('teamsync_webhook_events').insert({
      event_id: eventId,
      event_type: rawEventType,
      ticket_id: ticketId || targetReport.teamsync_id,
      ticket_number: ticketNumber || targetReport.teamsync_ticket_number,
      feedback_report_id: targetReport.id,
      payload: rawPayload,
      status: 'PROCESSED',
      processed_at: new Date().toISOString(),
    })

    const durationMs = Date.now() - startTime
    logWebhookEvent('TEAMSYNC_WEBHOOK_PROCESSED', {
      eventId,
      eventType: rawEventType,
      ticketId: ticketId || targetReport.teamsync_id,
      reference: targetReport.public_reference,
      durationMs,
    })

    return {
      success: true,
      statusCode: 200,
      code: 'WEBHOOK_PROCESSED',
      message: 'TeamSync webhook event synchronized successfully.',
      eventId,
      reportId: targetReport.id,
      reference: targetReport.public_reference,
      updatedFields,
    }
  } catch (err: unknown) {
    console.error('Database transaction error in webhook processor:', err)

    // Record failure in webhook events table
    try {
      await supabaseServer.from('teamsync_webhook_events').insert({
        event_id: eventId,
        event_type: rawEventType,
        ticket_id: ticketId || targetReport?.teamsync_id,
        feedback_report_id: targetReport?.id,
        payload: rawPayload,
        status: 'FAILED',
        error: (err as Error)?.message || 'Database error during webhook processing',
        processed_at: new Date().toISOString(),
      })
    } catch {
      // Safe fallback if failure logging fails
    }

    return {
      success: false,
      statusCode: 500,
      code: 'INTERNAL_DATABASE_ERROR',
      message: 'A transient database error occurred while persisting the webhook synchronization.',
      eventId,
    }
  }
}
