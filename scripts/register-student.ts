import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function registerStudent(email: string, name: string) {
  const normalizedEmail = email.trim().toLowerCase()
  const cleanName = name.trim()

  console.log(`\n==================================================`)
  console.log(`Enrolling Student: ${cleanName} <${normalizedEmail}>`)
  console.log(`==================================================`)

  // 1. Check if user already exists in users table
  const { data: existingUser, error: findUserErr } = await supabase
    .from('users')
    .select('id, email, name, role, status')
    .ilike('email', normalizedEmail)
    .maybeSingle()

  if (findUserErr) {
    throw new Error(`Failed to check existing user: ${findUserErr.message}`)
  }

  // Mentor: Elango Sivakumar
  const mentorUserId = 'e95272bc-633d-4fbd-8bf0-7801426fd0f6'
  const mentorTableId = '33f27770-7632-49b1-9286-7c7fba608007'

  let userId: string
  if (existingUser) {
    console.log(`Found existing user with ID: ${existingUser.id}. Updating role to STUDENT and status to ACTIVE...`)
    const { data: updatedUser, error: updateErr } = await supabase
      .from('users')
      .update({
        name: cleanName,
        role: 'STUDENT',
        status: 'ACTIVE',
        mentorId: mentorUserId,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', existingUser.id)
      .select('id, email, name, role, status')
      .single()

    if (updateErr) throw new Error(`Failed to update user: ${updateErr.message}`)
    userId = updatedUser.id
    console.log(`✅ User row updated:`, updatedUser)
  } else {
    console.log(`Creating new user row...`)
    const { data: newUser, error: createErr } = await supabase
      .from('users')
      .insert({
        email: normalizedEmail,
        name: cleanName,
        role: 'STUDENT',
        status: 'ACTIVE',
        mentorId: mentorUserId,
      })
      .select('id, email, name, role, status')
      .single()

    if (createErr) throw new Error(`Failed to create user: ${createErr.message}`)
    userId = newUser.id
    console.log(`✅ User row created:`, newUser)
  }

  // 2. Check or create in students table
  const { data: existingStudent, error: findStudentErr } = await supabase
    .from('students')
    .select('id, user_id, name, email, student_code, status')
    .eq('user_id', userId)
    .maybeSingle()

  if (findStudentErr) {
    throw new Error(`Failed to query students table: ${findStudentErr.message}`)
  }

  let studentId: string
  let studentCode: string
  if (existingStudent) {
    console.log(`Found existing student profile: ${existingStudent.id} (${existingStudent.student_code})`)
    const { data: updatedStudent, error: updStudentErr } = await supabase
      .from('students')
      .update({
        name: cleanName,
        email: normalizedEmail,
        status: 'ACTIVE',
        updated_at: new Date().toISOString(),
      })
      .eq('id', existingStudent.id)
      .select('id, user_id, name, email, student_code, status')
      .single()

    if (updStudentErr) throw new Error(`Failed to update student profile: ${updStudentErr.message}`)
    studentId = updatedStudent.id
    studentCode = updatedStudent.student_code
    console.log(`✅ Student profile updated:`, updatedStudent)
  } else {
    // Generate next student code STU-XXXXXX
    const { data: topStudents } = await supabase
      .from('students')
      .select('student_code')
      .order('student_code', { ascending: false })
      .limit(1)

    let nextNum = 127
    if (topStudents && topStudents.length > 0) {
      const match = topStudents[0].student_code.match(/STU-(\d+)/)
      if (match) {
        nextNum = parseInt(match[1], 10) + 1
      }
    }
    studentCode = `STU-${String(nextNum).padStart(6, '0')}`

    const { data: newStudent, error: insStudentErr } = await supabase
      .from('students')
      .insert({
        user_id: userId,
        name: cleanName,
        email: normalizedEmail,
        student_code: studentCode,
        status: 'ACTIVE',
      })
      .select('id, user_id, name, email, student_code, status')
      .single()

    if (insStudentErr) throw new Error(`Failed to create student profile: ${insStudentErr.message}`)
    studentId = newStudent.id
    console.log(`✅ Student profile created:`, newStudent)
  }

  // 3. Link to mentor in mentor_students
  const { data: existingLink } = await supabase
    .from('mentor_students')
    .select('id, mentor_id, status')
    .eq('student_id', studentId)
    .maybeSingle()

  if (existingLink) {
    if (existingLink.mentor_id !== mentorTableId || existingLink.status !== 'ACTIVE') {
      await supabase
        .from('mentor_students')
        .update({
          mentor_id: mentorTableId,
          status: 'ACTIVE',
          assigned_at: new Date().toISOString(),
          unassigned_at: null,
        })
        .eq('id', existingLink.id)
      console.log(`✅ Mentor assignment updated to Elango Sivakumar`)
    } else {
      console.log(`✅ Student is already actively assigned to Elango Sivakumar`)
    }
  } else {
    const { data: newLink, error: linkErr } = await supabase
      .from('mentor_students')
      .insert({
        mentor_id: mentorTableId,
        student_id: studentId,
        status: 'ACTIVE',
        assigned_at: new Date().toISOString(),
      })
      .select('id, mentor_id, student_id, status')
      .single()

    if (linkErr) throw new Error(`Failed to link mentor: ${linkErr.message}`)
    console.log(`✅ Mentor link created:`, newLink)
  }

  console.log(`\n🎉 Student ${cleanName} (${normalizedEmail}) has been successfully enrolled!`)
  console.log(`Student Code: ${studentCode}`)
  console.log(`User ID: ${userId}`)
  console.log(`Student ID: ${studentId}`)
  console.log(`Role: STUDENT | Status: ACTIVE | Mentor: Elango Sivakumar`)
}

async function main() {
  const email = process.argv[2] || 'dhakshathasenthilkumar07@gmail.com'
  const name = process.argv[3] || 'Dhakshatha Senthilkumar'
  await registerStudent(email, name)
}

main().catch(err => {
  console.error('Enrollment error:', err)
  process.exit(1)
})
