import type { IncomingMessage, ServerResponse } from 'http'
import { authenticateFeedbackRequest, supabaseServer } from './feedbackAuth'
import { applyCors, getClientIp, RateLimiter, readJsonBody, PayloadTooLargeError } from './httpSecurity'
import { formatErrorMessage } from '../lib/errorUtils'

// Rate limiters: 120 req/min per IP, 60 req/min per authenticated user
const ipLimiter = new RateLimiter(120, 60_000)
const userLimiter = new RateLimiter(60, 60_000)

export function resetCampusRateLimitsForTesting() {
  ipLimiter.reset()
  userLimiter.reset()
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_STAFF_ROLES = new Set<string>(['CAMPUS_MANAGER', 'ADMIN', 'SUPERADMIN'])

interface ApiResponse {
  success: boolean
  message: string
  error?: string
  data?: unknown
}

function sendJson(
  res: ServerResponse & { status?: (code: number) => { json: (data: unknown) => void }; json?: (data: unknown) => void },
  statusCode: number,
  payload: ApiResponse
) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(payload)
  }
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

export default async function handler(
  req: IncomingMessage & { body?: unknown; query?: unknown },
  res: ServerResponse & { status?: (code: number) => { json: (data: unknown) => void }; json?: (data: unknown) => void }
) {
  // CORS handling
  applyCors(req, res, {
    methods: 'POST, OPTIONS',
    headers: 'Content-Type, Authorization, X-Idempotency-Key',
  })

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, {
      success: false,
      error: 'Method Not Allowed. Use POST.',
      message: 'Method Not Allowed. Use POST.',
    })
  }

  // IP rate limiting
  const clientIp = getClientIp(req)
  const ipCheck = ipLimiter.check(clientIp)
  if (!ipCheck.allowed) {
    res.setHeader('Retry-After', String(ipCheck.retryAfter || 60))
    return sendJson(res, 429, {
      success: false,
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please wait a moment before trying again.',
    })
  }

  // Parse Body
  let body: Record<string, unknown> = {}
  try {
    body = await readJsonBody(req)
  } catch (err: unknown) {
    if (err instanceof PayloadTooLargeError) {
      return sendJson(res, 413, {
        success: false,
        error: 'Payload Too Large',
        message: 'Request payload exceeded the maximum permitted size.',
      })
    }
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid JSON',
      message: 'Failed to parse JSON request body.',
    })
  }

  // Authenticate Caller
  const authHeader = (req.headers['authorization'] || (req.headers as Record<string, string | undefined>)['Authorization']) as string | undefined
  const auth = await authenticateFeedbackRequest(authHeader)
  if (!auth.authenticated || !auth.user) {
    return sendJson(res, auth.statusCode || 401, {
      success: false,
      error: auth.error || 'Authentication required.',
      message: auth.error || 'Authentication required.',
    })
  }

  // Verify Role Authorization
  const callerRole = (auth.user.role || '').toUpperCase()
  if (!ALLOWED_STAFF_ROLES.has(callerRole)) {
    return sendJson(res, 403, {
      success: false,
      error: 'Forbidden: Campus manager or administrator privileges required.',
      message: 'Forbidden: Campus manager or administrator privileges required.',
    })
  }

  // User Rate Limiting
  const userCheck = userLimiter.check(auth.user.id)
  if (!userCheck.allowed) {
    res.setHeader('Retry-After', String(userCheck.retryAfter || 60))
    return sendJson(res, 429, {
      success: false,
      error: 'Too Many Requests',
      message: 'Account rate limit exceeded. Please wait a moment.',
    })
  }

  // Route Dispatching: by URL path or action field
  const url = req.url || ''
  const action = (body.action as string) || ''

  try {
    if (url.includes('/students') || action === 'add_student' || action === 'enroll_student') {
      return await handleAddStudent(body, res)
    }
    if (url.includes('/mentors') || action === 'add_mentor') {
      return await handleAddMentor(body, res)
    }
    if (url.includes('/assign-mentor') || action === 'assign_mentor') {
      return await handleAssignMentor(body, res)
    }

    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Action',
      message: 'Unknown or missing action in campus management request.',
    })
  } catch (err: unknown) {
    const errorMsg = formatErrorMessage(err, 'Failed to process campus management request.')
    return sendJson(res, 500, {
      success: false,
      error: errorMsg,
      message: errorMsg,
    })
  }
}

/**
 * Handle Add/Enroll Student
 */
async function handleAddStudent(
  body: Record<string, unknown>,
  res: ServerResponse
) {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const explicitCode = typeof body.studentCode === 'string' ? body.studentCode.trim().toUpperCase() : ''
  const mentorId = typeof body.mentorId === 'string' && body.mentorId !== 'NONE' ? body.mentorId.trim() : null

  if (!name || name.length > 100) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Name',
      message: 'Student name is required and must not exceed 100 characters.',
    })
  }

  if (!email || !EMAIL_REGEX.test(email) || email.length > 255) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Email',
      message: 'A valid email address is required.',
    })
  }

  // 1. Authoritative check/upsert in `users` table via server service role
  let userId: string
  const { data: existingUser, error: findUserErr } = await supabaseServer
    .from('users')
    .select('id, email, name, role, status')
    .eq('email', email)
    .maybeSingle()

  if (findUserErr) {
    throw findUserErr
  }

  if (existingUser?.id) {
    userId = existingUser.id
    const { error: updateErr } = await supabaseServer
      .from('users')
      .update({
        name,
        role: 'STUDENT',
        status: 'ACTIVE',
      })
      .eq('id', userId)

    if (updateErr) throw updateErr
  } else {
    const { data: newUser, error: insertErr } = await supabaseServer
      .from('users')
      .insert({
        email,
        name,
        role: 'STUDENT',
        status: 'ACTIVE',
      })
      .select('id')
      .single()

    if (insertErr || !newUser) {
      throw insertErr || new Error('Failed to create student user record.')
    }
    userId = newUser.id
  }

  // 2. Check existing student record to preserve student_code if already assigned
  const { data: existingStudent, error: findStudentErr } = await supabaseServer
    .from('students')
    .select('id, student_code')
    .eq('user_id', userId)
    .maybeSingle()

  if (findStudentErr) {
    throw findStudentErr
  }

  const finalStudentCode =
    existingStudent?.student_code ||
    explicitCode ||
    ('STU-' + Date.now().toString(36).toUpperCase())

  // Upsert into students table with onConflict: 'user_id'
  const { data: studentRecord, error: upsertStudentErr } = await supabaseServer
    .from('students')
    .upsert(
      {
        user_id: userId,
        name,
        email,
        student_code: finalStudentCode,
        status: 'ACTIVE',
      },
      { onConflict: 'user_id' }
    )
    .select('id, student_code')
    .single()

  if (upsertStudentErr || !studentRecord) {
    throw upsertStudentErr || new Error('Failed to create student profile record.')
  }

  const studentId = studentRecord.id

  // 3. Optional Mentor Assignment
  let assignedMentorName: string | null = null
  if (mentorId) {
    // Verify mentor exists
    const { data: mentorRecord, error: mentorLookupErr } = await supabaseServer
      .from('mentors')
      .select('id, name, user_id')
      .eq('id', mentorId)
      .maybeSingle()

    if (mentorLookupErr) throw mentorLookupErr
    if (!mentorRecord) {
      return sendJson(res, 400, {
        success: false,
        error: 'Mentor Not Found',
        message: 'The selected mentor could not be found.',
      })
    }

    assignedMentorName = mentorRecord.name || null

    // Deactivate prior mentor links for this student
    await supabaseServer
      .from('mentor_students')
      .update({ status: 'INACTIVE', unassigned_at: new Date().toISOString() })
      .eq('student_id', studentId)
      .neq('mentor_id', mentorId)
      .eq('status', 'ACTIVE')

    // Upsert new active assignment with onConflict: 'mentor_id,student_id'
    const { error: linkErr } = await supabaseServer
      .from('mentor_students')
      .upsert(
        {
          mentor_id: mentorId,
          student_id: studentId,
          status: 'ACTIVE',
          assigned_at: new Date().toISOString(),
          unassigned_at: null,
        },
        { onConflict: 'mentor_id,student_id' }
      )

    if (linkErr) throw linkErr

    // Update legacy users.mentorId if mentor has a user_id
    if (mentorRecord.user_id) {
      await supabaseServer
        .from('users')
        .update({ mentorId: mentorRecord.user_id })
        .eq('id', userId)
    }
  }

  return sendJson(res, 201, {
    success: true,
    message: `Student ${name} enrolled successfully!`,
    data: {
      studentId,
      userId,
      name,
      email,
      studentCode: finalStudentCode,
      mentorId: mentorId || null,
      mentorName: assignedMentorName,
    },
  })
}

/**
 * Handle Add Mentor
 */
async function handleAddMentor(
  body: Record<string, unknown>,
  res: ServerResponse
) {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const explicitCode = typeof body.mentorCode === 'string' ? body.mentorCode.trim().toUpperCase() : ''
  const maxStudentsRaw = typeof body.maxStudents === 'number' ? body.maxStudents : parseInt(String(body.maxStudents || 30), 10)
  const maxStudents = isNaN(maxStudentsRaw) ? 30 : Math.min(Math.max(maxStudentsRaw, 1), 200)

  if (!name || name.length > 100) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Name',
      message: 'Mentor name is required and must not exceed 100 characters.',
    })
  }

  if (!email || !EMAIL_REGEX.test(email) || email.length > 255) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Email',
      message: 'A valid email address is required.',
    })
  }

  // 1. Authoritative check/upsert in `users` table via server service role
  let userId: string
  const { data: existingUser, error: findUserErr } = await supabaseServer
    .from('users')
    .select('id, email, name, role, status')
    .eq('email', email)
    .maybeSingle()

  if (findUserErr) {
    throw findUserErr
  }

  if (existingUser?.id) {
    userId = existingUser.id
    const { error: updateErr } = await supabaseServer
      .from('users')
      .update({
        name,
        role: 'MENTOR',
        status: 'ACTIVE',
      })
      .eq('id', userId)

    if (updateErr) throw updateErr
  } else {
    const { data: newUser, error: insertErr } = await supabaseServer
      .from('users')
      .insert({
        email,
        name,
        role: 'MENTOR',
        status: 'ACTIVE',
      })
      .select('id')
      .single()

    if (insertErr || !newUser) {
      throw insertErr || new Error('Failed to create mentor user record.')
    }
    userId = newUser.id
  }

  // 2. Check existing mentor record to preserve mentor_code if already assigned
  const { data: existingMentor, error: findMentorErr } = await supabaseServer
    .from('mentors')
    .select('id, mentor_code')
    .eq('user_id', userId)
    .maybeSingle()

  if (findMentorErr) {
    throw findMentorErr
  }

  const finalMentorCode =
    existingMentor?.mentor_code ||
    explicitCode ||
    ('MNT-' + Date.now().toString(36).toUpperCase())

  // Upsert into mentors table with onConflict: 'user_id'
  const { data: mentorRecord, error: upsertMentorErr } = await supabaseServer
    .from('mentors')
    .upsert(
      {
        user_id: userId,
        name,
        email,
        mentor_code: finalMentorCode,
        max_students: maxStudents,
        status: 'ACTIVE',
      },
      { onConflict: 'user_id' }
    )
    .select('id, mentor_code')
    .single()

  if (upsertMentorErr || !mentorRecord) {
    throw upsertMentorErr || new Error('Failed to create mentor profile record.')
  }

  return sendJson(res, 201, {
    success: true,
    message: `Mentor ${name} registered successfully!`,
    data: {
      mentorId: mentorRecord.id,
      userId,
      name,
      email,
      mentorCode: finalMentorCode,
      maxStudents,
    },
  })
}

/**
 * Handle Assign / Reassign Mentor to Student
 */
async function handleAssignMentor(
  body: Record<string, unknown>,
  res: ServerResponse
) {
  const studentId = typeof body.studentId === 'string' ? body.studentId.trim() : ''
  const mentorId = typeof body.mentorId === 'string' && body.mentorId !== 'NONE' ? body.mentorId.trim() : null

  if (!studentId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Student ID',
      message: 'Student ID is required for mentor assignment.',
    })
  }

  // Verify student exists
  const { data: studentRecord, error: studentLookupErr } = await supabaseServer
    .from('students')
    .select('id, user_id, name')
    .eq('id', studentId)
    .maybeSingle()

  if (studentLookupErr) throw studentLookupErr
  if (!studentRecord) {
    return sendJson(res, 404, {
      success: false,
      error: 'Student Not Found',
      message: 'The specified student does not exist.',
    })
  }

  // Handle Unassignment
  if (!mentorId) {
    const { error: unassignErr } = await supabaseServer
      .from('mentor_students')
      .update({ status: 'INACTIVE', unassigned_at: new Date().toISOString() })
      .eq('student_id', studentId)
      .eq('status', 'ACTIVE')

    if (unassignErr) throw unassignErr

    // Clear legacy users.mentorId
    if (studentRecord.user_id) {
      await supabaseServer
        .from('users')
        .update({ mentorId: null })
        .eq('id', studentRecord.user_id)
    }

    return sendJson(res, 200, {
      success: true,
      message: 'Student unassigned from mentor successfully.',
      data: {
        studentId,
        mentorId: null,
        mentorName: 'Unassigned',
      },
    })
  }

  // Handle Assignment
  const { data: mentorRecord, error: mentorLookupErr } = await supabaseServer
    .from('mentors')
    .select('id, name, user_id')
    .eq('id', mentorId)
    .maybeSingle()

  if (mentorLookupErr) throw mentorLookupErr
  if (!mentorRecord) {
    return sendJson(res, 404, {
      success: false,
      error: 'Mentor Not Found',
      message: 'The specified mentor does not exist.',
    })
  }

  // Deactivate prior active links to other mentors
  await supabaseServer
    .from('mentor_students')
    .update({ status: 'INACTIVE', unassigned_at: new Date().toISOString() })
    .eq('student_id', studentId)
    .neq('mentor_id', mentorId)
    .eq('status', 'ACTIVE')

  // Upsert active link with onConflict: 'mentor_id,student_id'
  const { error: linkErr } = await supabaseServer
    .from('mentor_students')
    .upsert(
      {
        mentor_id: mentorId,
        student_id: studentId,
        status: 'ACTIVE',
        assigned_at: new Date().toISOString(),
        unassigned_at: null,
      },
      { onConflict: 'mentor_id,student_id' }
    )

  if (linkErr) throw linkErr

  // Update legacy users.mentorId
  if (studentRecord.user_id && mentorRecord.user_id) {
    await supabaseServer
      .from('users')
      .update({ mentorId: mentorRecord.user_id })
      .eq('id', studentRecord.user_id)
  }

  return sendJson(res, 200, {
    success: true,
    message: `Student mentor updated to: ${mentorRecord.name || 'Assigned Mentor'}`,
    data: {
      studentId,
      mentorId,
      mentorName: mentorRecord.name,
    },
  })
}
