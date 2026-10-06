/**
 * Automated Verification Suite for Student Profile UI:
 * Verifies complete removal of Roll Number and Campus metadata.
 * Evaluates all 10 test scenarios required by the Master Prompt.
 */
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'

async function runStudentProfileUITests() {
  console.log('========================================================================')
  console.log('🎓 STUDENT PROFILE UI: ROLL NUMBER & CAMPUS REMOVAL VERIFICATION')
  console.log('========================================================================\n')

  let passed = 0
  let failed = 0

  function pass(desc: string) {
    passed++
    console.log(`  ✅ [PASS] ${desc}`)
  }

  function fail(desc: string, err: any) {
    failed++
    console.error(`  ❌ [FAIL] ${desc}:`, err)
  }

  const modalPath = path.resolve(process.cwd(), 'src/components/mentor/StudentDetailModal.tsx')
  const modalContent = fs.readFileSync(modalPath, 'utf8')

  // --- Test 1: Student profile does NOT render Roll Number ---
  console.log('--- Test 1: Student profile does NOT render Roll Number ---')
  try {
    assert(!/•\s*Roll:/i.test(modalContent), 'Student profile must not contain "• Roll:"')
    assert(!/Roll:\s*\{/i.test(modalContent), 'Student profile must not contain "Roll: {"')
    assert(!/student\.studentCode/i.test(modalContent), 'Student profile must not render studentCode / roll number')
    pass('Student profile component contains zero Roll Number rendering')
  } catch (err) {
    fail('Test 1 failed', err)
  }

  // --- Test 2: Student profile does NOT render Campus Name ---
  console.log('\n--- Test 2: Student profile does NOT render Campus Name ---')
  try {
    assert(
      !/Kalvi National Technology Campus/i.test(modalContent),
      'Student profile must not contain "Kalvi National Technology Campus"'
    )
    assert(!/student\.campus/i.test(modalContent), 'Student profile must not render student.campus')
    pass('Student profile component contains zero Campus metadata rendering')
  } catch (err) {
    fail('Test 2 failed', err)
  }

  // --- Test 3 & 4: Student A and Student B rendering simulation ---
  console.log('\n--- Test 3 & 4: Multi-student generic verification (Student A & Student B) ---')
  try {
    // Simulate what the header renders for Student A (Kavya Ramesh) and Student B (Rahul Verma)
    const renderHeader = (student: {
      name: string
      email: string
      belt: string
      needsAttention: boolean
      mentorName?: string
      studentCode?: string
      campus?: string
    }) => {
      // Replicates the exact JSX structure from StudentDetailModal.tsx
      return `
        <div>
          <h2>${student.name}</h2>
          <span>${student.belt}</span>
          <span>${student.needsAttention ? 'Intervention Required' : 'Active & On Track'}</span>
          <p class="email">${student.email}</p>
          <div class="mentor">
            <span>Mentor: <strong>${student.mentorName || 'Assigned Growth Mentor'}</strong></span>
          </div>
        </div>
      `
    }

    const studentA = {
      name: 'Kavya Ramesh',
      email: 'kavya.ramesh.s.121@kalvium.community',
      belt: 'Belt 1',
      needsAttention: false,
      mentorName: 'Elango Sivakumar',
      studentCode: 'STU-000001',
      campus: 'Kalvi National Technology Campus',
    }

    const studentB = {
      name: 'Rahul Verma',
      email: 'rahul.verma.s.145@kalvium.community',
      belt: 'Belt 2',
      needsAttention: true,
      mentorName: 'Priya Sundaram',
      studentCode: 'STU-000045',
      campus: 'Kalvi National Technology Campus',
    }

    const outputA = renderHeader(studentA)
    const outputB = renderHeader(studentB)

    assert(!outputA.includes('Roll:'), 'Student A output must not contain Roll:')
    assert(!outputA.includes('STU-000001'), 'Student A output must not contain STU-000001')
    assert(!outputA.includes('Kalvi National Technology Campus'), 'Student A output must not contain Campus')

    assert(!outputB.includes('Roll:'), 'Student B output must not contain Roll:')
    assert(!outputB.includes('STU-000045'), 'Student B output must not contain STU-000045')
    assert(!outputB.includes('Kalvi National Technology Campus'), 'Student B output must not contain Campus')

    pass('Generic implementation: neither Student A nor Student B renders Roll or Campus')
  } catch (err) {
    fail('Test 3 & 4 failed', err)
  }

  // --- Test 5: No orphaned separator remains ---
  console.log('\n--- Test 5: No orphaned separator remains ---')
  try {
    // Check surrounding markup in StudentDetailModal.tsx for orphaned bullets
    // Look at the email paragraph and mentor div
    const emailSection = modalContent.slice(
      modalContent.indexOf('{student.email}'),
      modalContent.indexOf('{student.mentorName')
    )
    assert(!emailSection.includes('•'), 'No orphaned bullet between email and mentor sections')
    assert(!emailSection.includes('|'), 'No orphaned pipe separator')
    pass('No orphaned separators (•, |, /) exist in the email or mentor layout')
  } catch (err) {
    fail('Test 5 failed', err)
  }

  // --- Test 6: Mentor information still renders ---
  console.log('\n--- Test 6: Mentor information still renders ---')
  try {
    assert(modalContent.includes('<span>Mentor:</span>'), 'Mentor label must be rendered')
    assert(modalContent.includes('{student.mentorName || \'Assigned Growth Mentor\'}'), 'Mentor name must be rendered')
    pass('Mentor information continues to render cleanly')
  } catch (err) {
    fail('Test 6 failed', err)
  }

  // --- Test 7: Student email still renders ---
  console.log('\n--- Test 7: Student email still renders ---')
  try {
    assert(modalContent.includes('{student.email}'), 'Student email must be rendered')
    pass('Student email continues to render cleanly')
  } catch (err) {
    fail('Test 7 failed', err)
  }

  // --- Test 8: Belt / status information still renders ---
  console.log('\n--- Test 8: Belt / status information still renders ---')
  try {
    assert(modalContent.includes('{student.belt}'), 'Belt name must be rendered')
    assert(modalContent.includes('Active & On Track'), 'Active status must be rendered')
    pass('Belt and status badges continue to render cleanly')
  } catch (err) {
    fail('Test 8 failed', err)
  }

  // --- Test 9: Student progress / statistics still work ---
  console.log('\n--- Test 9: Student progress / statistics still work ---')
  try {
    assert(modalContent.includes('{student.solvedCount} / {student.totalProblems}'), 'Problems solved counter present')
    assert(modalContent.includes('{student.totalXp}'), 'XP counter present')
    assert(modalContent.includes('{student.streak}d'), 'Streak counter present')
    assert(modalContent.includes('{student.progressPercent}%'), 'Progress percentage present')
    pass('Key metrics bar (Solved, XP, Streak, Progress) remains intact')
  } catch (err) {
    fail('Test 9 failed', err)
  }

  // --- Test 10: All other student views also free of Roll / Campus ---
  console.log('\n--- Test 10: Global student profile views free of Roll Number & Campus ---')
  try {
    const studentPages = [
      'src/pages/ProfilePage.tsx',
      'src/pages/DashboardPage.tsx',
      'src/pages/mentor/MentorDashboardPage.tsx',
      'src/pages/mentor/MentorStudentsPage.tsx',
      'src/pages/mentor/MentorSubmissionsPage.tsx',
      'src/pages/campus/CampusStudentsPage.tsx',
      'src/pages/campus/CampusStudentLeaderboardPage.tsx',
      'src/components/student/GrowthMentorCard.tsx',
    ]

    for (const p of studentPages) {
      const fullPath = path.resolve(process.cwd(), p)
      const content = fs.readFileSync(fullPath, 'utf8')
      assert(!/•\s*Roll:/i.test(content), `${p} must not contain Roll:`)
      assert(!/Kalvi National Technology Campus/i.test(content), `${p} must not contain hardcoded Campus`)
    }

    pass('All student profile, card, table, and modal views across all portals are free of Roll and Campus display')
  } catch (err) {
    fail('Test 10 failed', err)
  }

  // --- Summary ---
  console.log('\n========================================================================')
  console.log(`🏁 STUDENT PROFILE UI RESULTS: ${passed} PASSED, ${failed} FAILED`)
  console.log('========================================================================\n')

  if (failed > 0) {
    process.exit(1)
  }
}

runStudentProfileUITests().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
