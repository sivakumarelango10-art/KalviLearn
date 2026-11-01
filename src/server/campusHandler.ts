import type { IncomingMessage, ServerResponse } from 'http'
import { authenticateFeedbackRequest, supabaseServer } from './feedbackAuth'
import { applyCors, getClientIp, RateLimiter, readJsonBody, PayloadTooLargeError } from './httpSecurity'
import { formatErrorMessage } from '../lib/errorUtils'
import { resolveRoute } from './routeResolver'

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
    methods: 'GET, POST, DELETE, OPTIONS',
    headers: 'Content-Type, Authorization, X-Idempotency-Key, X-Kalvi-Subpath, X-Kalvi-Action',
  })

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'DELETE') {
    return sendJson(res, 405, {
      success: false,
      error: 'Method Not Allowed. Use GET, POST, or DELETE.',
      message: 'Method Not Allowed. Use GET, POST, or DELETE.',
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

  // Parse Body if not GET
  let body: Record<string, unknown> = {}
  if (req.method !== 'GET') {
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
  } else if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    body = req.body as Record<string, unknown>
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

  // Robust Route & Action Resolution
  const route = resolveRoute(req, body, '/api/campus')
  req.query = { ...route.queryParams, ...(typeof req.query === 'object' && req.query ? req.query : {}) }

  let action = route.action
  if (!action) {
    if (route.subpath === 'students' || route.subpath.startsWith('students/')) {
      if (route.method === 'GET') action = 'list_students'
      else if (route.method === 'POST') action = 'enroll_student'
      else if (route.method === 'DELETE') action = 'delete_student'
    } else if (route.subpath === 'mentors' || route.subpath.startsWith('mentors/')) {
      if (route.method === 'GET') action = 'list_mentors'
      else if (route.method === 'POST') action = 'add_mentor'
    } else if (route.subpath === 'assign-mentor' || route.subpath === 'assign_mentor') {
      action = 'assign_mentor'
    } else if (route.subpath === 'delete-student' || route.subpath === 'delete_student') {
      action = 'delete_student'
    }
  }

  // Verify Role Authorization
  const callerRole = (auth.user.role || '').toUpperCase()

  // Specific check for Mentors attempting permanent student deletion
  if (callerRole === 'MENTOR' && (action === 'delete_student' || route.subpath.includes('delete') || route.method === 'DELETE')) {
    return sendJson(res, 403, {
      success: false,
      error: 'Forbidden: Mentor Authorization Insufficient',
      message: 'Mentors are not authorized to permanently delete student accounts. This operation requires Campus Manager or Administrator privileges.',
    })
  }

  if (!ALLOWED_STAFF_ROLES.has(callerRole)) {
    return sendJson(res, 403, {
      success: false,
      error: 'Forbidden: Campus manager or administrator privileges required.',
      message: 'Forbidden: Campus manager or administrator privileges required.',
    })
  }

  try {
    if (action === 'delete_student' || route.method === 'DELETE') {
      return await handleDeleteStudent(body, req, res)
    }
    if (action === 'list_students' || (route.method === 'GET' && route.subpath.includes('student'))) {
      return await handleListCampusStudents(req, auth.user, res)
    }
    if (action === 'enroll_student' || action === 'add_student') {
      return await handleAddStudent(body, res)
    }
    if (action === 'list_mentors' || (route.method === 'GET' && route.subpath.includes('mentor'))) {
      return await handleListCampusMentors(req, auth.user, res)
    }
    if (action === 'add_mentor') {
      return await handleAddMentor(body, res)
    }
    if (action === 'assign_mentor') {
      return await handleAssignMentor(body, res)
    }

    return sendJson(res, 400, {
      success: false,
      error: 'Invalid Action',
      message: 'Unknown or missing action in campus management request. Supported actions: enroll_student, add_mentor, assign_mentor, delete_student, list_students, list_mentors.',
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

  // 1. Authoritative Student Resolution (accepts students.id or users.id)
  let studentRecord: { id: string; user_id: string; name: string | null } | null = null
  const byStudentId = await supabaseServer
    .from('students')
    .select('id, user_id, name')
    .eq('id', studentId)
    .maybeSingle()

  if (byStudentId.data) {
    studentRecord = byStudentId.data
  } else {
    const byUserId = await supabaseServer
      .from('students')
      .select('id, user_id, name')
      .eq('user_id', studentId)
      .maybeSingle()
    if (byUserId.data) {
      studentRecord = byUserId.data
    }
  }

  if (!studentRecord) {
    return sendJson(res, 404, {
      success: false,
      error: 'Student Not Found',
      message: 'The specified student could not be found.',
    })
  }

  const canonicalStudentId = studentRecord.id

  // 2. Handle Unassignment (mentorId is null or 'NONE')
  if (!mentorId) {
    const { error: unassignErr } = await supabaseServer
      .from('mentor_students')
      .update({ status: 'INACTIVE', unassigned_at: new Date().toISOString() })
      .eq('student_id', canonicalStudentId)
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
        studentId: canonicalStudentId,
        mentorId: null,
        mentorName: 'Unassigned',
      },
    })
  }

  // 3. Authoritative Mentor Resolution (accepts mentors.id or users.id)
  let mentorRecord: { id: string; name: string | null; user_id: string } | null = null
  const byMentorId = await supabaseServer
    .from('mentors')
    .select('id, name, user_id')
    .eq('id', mentorId)
    .maybeSingle()

  if (byMentorId.data) {
    mentorRecord = byMentorId.data
  } else {
    const byUserId = await supabaseServer
      .from('mentors')
      .select('id, name, user_id')
      .eq('user_id', mentorId)
      .maybeSingle()
    if (byUserId.data) {
      mentorRecord = byUserId.data
    }
  }

  if (!mentorRecord) {
    return sendJson(res, 404, {
      success: false,
      error: 'Mentor Not Found',
      message: 'The specified mentor could not be found.',
    })
  }

  const canonicalMentorId = mentorRecord.id

  // 4. Deactivate prior active links to OTHER mentors
  await supabaseServer
    .from('mentor_students')
    .update({ status: 'INACTIVE', unassigned_at: new Date().toISOString() })
    .eq('student_id', canonicalStudentId)
    .neq('mentor_id', canonicalMentorId)
    .eq('status', 'ACTIVE')

  // 5. Upsert active link with onConflict: 'mentor_id,student_id'
  const { error: linkErr } = await supabaseServer
    .from('mentor_students')
    .upsert(
      {
        mentor_id: canonicalMentorId,
        student_id: canonicalStudentId,
        status: 'ACTIVE',
        assigned_at: new Date().toISOString(),
        unassigned_at: null,
      },
      { onConflict: 'mentor_id,student_id' }
    )

  if (linkErr) throw linkErr

  // 6. Update legacy users.mentorId
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
      studentId: canonicalStudentId,
      mentorId: canonicalMentorId,
      mentorName: mentorRecord.name,
    },
  })
}

/**
 * Handle Permanent Delete Student
 * Securely deletes student profile, user record, mentor assignments, and student progress/submissions.
 * Guaranteed: Only students can be deleted. Mentors/Managers/Admins cannot be deleted.
 * Feedback tables are never touched.
 */
async function handleDeleteStudent(
  body: Record<string, unknown>,
  req: IncomingMessage & { query?: unknown },
  res: ServerResponse
) {
  const queryStudentId =
    typeof req.query === 'object' && req.query
      ? String((req.query as Record<string, unknown>).studentId || (req.query as Record<string, unknown>).id || '')
      : ''
  const studentId =
    (typeof body.studentId === 'string'
      ? body.studentId.trim()
      : typeof body.id === 'string'
      ? body.id.trim()
      : '') || queryStudentId.trim()

  if (!studentId) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing Student ID',
      message: 'Student ID is required for student deletion.',
    })
  }

  // 1. Authoritative Student Resolution (accepts students.id or users.id)
  let studentRecord: {
    id: string
    user_id: string
    name: string | null
    email: string | null
    student_code: string | null
  } | null = null

  const byStudentId = await supabaseServer
    .from('students')
    .select('id, user_id, name, email, student_code')
    .eq('id', studentId)
    .maybeSingle()

  if (byStudentId.data) {
    studentRecord = byStudentId.data
  } else {
    const byUserId = await supabaseServer
      .from('students')
      .select('id, user_id, name, email, student_code')
      .eq('user_id', studentId)
      .maybeSingle()
    if (byUserId.data) {
      studentRecord = byUserId.data
    }
  }

  let canonicalUserId: string | null = studentRecord?.user_id || null
  let canonicalStudentId: string | null = studentRecord?.id || null
  let studentName = studentRecord?.name || 'Student'
  let studentEmail = studentRecord?.email || ''

  // Fallback: check if student exists directly in `users` with role = 'STUDENT'
  if (!canonicalUserId) {
    const byUser = await supabaseServer
      .from('users')
      .select('id, name, email, role')
      .eq('id', studentId)
      .maybeSingle()

    if (byUser.data) {
      if (byUser.data.role !== 'STUDENT') {
        return sendJson(res, 403, {
          success: false,
          error: 'Forbidden Operation',
          message: `Cannot delete user with role ${byUser.data.role}. Only student accounts may be deleted.`,
        })
      }
      canonicalUserId = byUser.data.id
      studentName = byUser.data.name || studentName
      studentEmail = byUser.data.email || studentEmail
    }
  }

  if (!canonicalUserId && !canonicalStudentId) {
    return sendJson(res, 404, {
      success: false,
      error: 'Student Not Found',
      message: 'The specified student could not be found or has already been deleted.',
    })
  }

  // 2. Prevent deleting privileged accounts if canonicalUserId is found
  let authUidToDelete: string | null = null
  if (canonicalUserId) {
    const { data: userRow } = await supabaseServer
      .from('users')
      .select('id, name, role, email, "authUid"')
      .eq('id', canonicalUserId)
      .maybeSingle()

    if (userRow) {
      if (userRow.role && userRow.role !== 'STUDENT') {
        return sendJson(res, 403, {
          success: false,
          error: 'Forbidden Operation',
          message: `Cannot delete user with role ${userRow.role}. Only student accounts may be deleted.`,
        })
      }
      authUidToDelete = (userRow as { authUid?: string }).authUid || null
      studentEmail = userRow.email || studentEmail
      studentName = userRow.name || studentName
    }
  }

  // 3. Execute authoritative deletion in dependency order:
  // Step A: Delete mentor assignments (mentor_students)
  if (canonicalStudentId) {
    const { error: msErr } = await supabaseServer
      .from('mentor_students')
      .delete()
      .eq('student_id', canonicalStudentId)
    if (msErr) throw msErr
  }

  // Step B: Delete learning progress (UserProgress)
  if (canonicalUserId) {
    const { error: upErr } = await supabaseServer
      .from('UserProgress')
      .delete()
      .eq('userId', canonicalUserId)
    if (upErr) throw upErr
  }

  // Step C: Delete submissions (Submission)
  if (canonicalUserId) {
    const { error: subErr } = await supabaseServer
      .from('Submission')
      .delete()
      .eq('userId', canonicalUserId)
    if (subErr) throw subErr
  }

  // Step D: Delete student profile (students)
  if (canonicalStudentId) {
    const { error: stuErr } = await supabaseServer
      .from('students')
      .delete()
      .eq('id', canonicalStudentId)
    if (stuErr) throw stuErr
  } else if (canonicalUserId) {
    const { error: stuErr } = await supabaseServer
      .from('students')
      .delete()
      .eq('user_id', canonicalUserId)
    if (stuErr) throw stuErr
  }

  // Step E: Delete user record (users)
  if (canonicalUserId) {
    const { error: userErr } = await supabaseServer
      .from('users')
      .delete()
      .eq('id', canonicalUserId)
    if (userErr) throw userErr
  }

  // Step F: Delete auth identity from Supabase Auth if linked
  if (authUidToDelete) {
    try {
      await supabaseServer.auth.admin.deleteUser(authUidToDelete)
    } catch (authErr) {
      console.warn('Warning: Could not delete auth.users record:', authErr)
    }
  }

  return sendJson(res, 200, {
    success: true,
    message: `Student ${studentName} was permanently deleted successfully.`,
    data: {
      deletedStudentId: canonicalStudentId,
      deletedUserId: canonicalUserId,
      name: studentName,
      email: studentEmail,
    },
  })
}

/**
 * Handle List Campus Students
 */
async function handleListCampusStudents(
  req: IncomingMessage & { query?: unknown },
  callerUser: { id: string; role?: string; email?: string },
  res: ServerResponse
) {
  const query = (typeof req.query === 'object' && req.query ? (req.query as Record<string, unknown>) : {}) as Record<string, unknown>
  const search = String(query.search || '').trim().toLowerCase()
  const status = String(query.status || 'ALL').trim()
  const mentorId = String(query.mentorId || 'ALL').trim()
  const page = Math.max(1, parseInt(String(query.page || '1'), 10))
  const limit = Math.min(200, Math.max(10, parseInt(String(query.limit || '50'), 10)))

  let campusId = String(query.campusId || '').trim()
  if (callerUser.role === 'CAMPUS_MANAGER') {
    const { data: campus } = await supabaseServer
      .from('campuses')
      .select('id')
      .eq('manager_id', callerUser.id)
      .maybeSingle()
    if (campus?.id) {
      campusId = campus.id
    }
  }

  let q = supabaseServer
    .from('students')
    .select('id, user_id, name, email, student_code, status, campus_id, created_at, updated_at', { count: 'exact' })

  if (campusId && campusId !== 'ALL') {
    q = q.eq('campus_id', campusId)
  }
  if (status && status !== 'ALL') {
    q = q.eq('status', status)
  }
  if (search) {
    q = q.or(`name.ilike.%${search}%,email.ilike.%${search}%,student_code.ilike.%${search}%`)
  }

  const offset = (page - 1) * limit
  q = q.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

  const { data: students, count, error } = await q
  if (error) throw error

  const studentList = students || []
  const studentIds = studentList.map((s: any) => s.id)

  let mentorMap: Record<string, { id: string; name: string; email: string }> = {}
  if (studentIds.length > 0) {
    const { data: links } = await supabaseServer
      .from('mentor_students')
      .select('student_id, mentor:mentors(id, name, email)')
      .in('student_id', studentIds)
      .eq('status', 'ACTIVE')

    if (links) {
      for (const l of links) {
        if (l.mentor) {
          const m = Array.isArray(l.mentor) ? l.mentor[0] : l.mentor
          if (m) mentorMap[l.student_id] = m
        }
      }
    }
  }

  let enriched = studentList.map((s: any) => ({
    ...s,
    mentor: mentorMap[s.id] || null,
  }))

  if (mentorId && mentorId !== 'ALL') {
    enriched = enriched.filter((s: any) => s.mentor?.id === mentorId)
  }

  return sendJson(res, 200, {
    success: true,
    message: 'Campus students retrieved successfully.',
    data: enriched,
    count: count !== null && count !== undefined ? count : enriched.length,
  } as any)
}

/**
 * Handle List Campus Mentors
 */
async function handleListCampusMentors(
  req: IncomingMessage & { query?: unknown },
  callerUser: { id: string; role?: string; email?: string },
  res: ServerResponse
) {
  const query = (typeof req.query === 'object' && req.query ? (req.query as Record<string, unknown>) : {}) as Record<string, unknown>
  let campusId = String(query.campusId || '').trim()
  if (callerUser.role === 'CAMPUS_MANAGER') {
    const { data: campus } = await supabaseServer
      .from('campuses')
      .select('id')
      .eq('manager_id', callerUser.id)
      .maybeSingle()
    if (campus?.id) {
      campusId = campus.id
    }
  }

  let q = supabaseServer
    .from('mentors')
    .select('id, user_id, name, email, mentor_code, max_students, status, campus_id, created_at, updated_at')
    .order('name', { ascending: true })

  if (campusId && campusId !== 'ALL') {
    q = q.eq('campus_id', campusId)
  }

  const [mentorsRes, linksRes] = await Promise.all([
    q,
    supabaseServer.from('mentor_students').select('mentor_id').eq('status', 'ACTIVE'),
  ])

  if (mentorsRes.error) throw mentorsRes.error

  const activeLinks = linksRes.data || []
  const countsMap: Record<string, number> = {}
  for (const l of activeLinks) {
    countsMap[l.mentor_id] = (countsMap[l.mentor_id] || 0) + 1
  }

  const enriched = (mentorsRes.data || []).map((m: any) => ({
    ...m,
    assignedStudentCount: countsMap[m.id] || 0,
  }))

  return sendJson(res, 200, {
    success: true,
    message: 'Campus mentors retrieved successfully.',
    data: enriched,
  })
}
