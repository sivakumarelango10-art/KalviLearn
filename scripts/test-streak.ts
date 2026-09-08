import {
  calculateAuthoritativeStreak,
  getIstDateString,
  shiftDate,
} from '../src/lib/streak'
import { fetchCampusStudents, fetchStudentLeaderboard } from '../src/lib/campusManagerService'
import { fetchUserProgressFromCloud } from '../src/lib/cloudSync'

async function runStreakAuditTests() {
  console.log('========================================================================')
  console.log('🧪 COMPREHENSIVE STREAK & DATA CONSISTENCY AUDIT SUITE')
  console.log('========================================================================\n')

  let passed = 0
  let total = 0

  function assert(condition: boolean, testName: string, details?: unknown) {
    total++
    if (condition) {
      console.log(`✅ [PASS] ${testName}`)
      passed++
    } else {
      console.error(`❌ [FAIL] ${testName}`, details !== undefined ? details : '')
      process.exitCode = 1
    }
  }

  // Reference date: Sept 8, 2026, 09:30 AM IST (matches user context)
  const refDate = new Date('2026-09-08T09:30:00+05:30')

  console.log('--- Suite 1: IST Date Formatter & Boundary Handling ---')
  assert(getIstDateString(null) === null, 'TEST 1: Null timestamp returns null')
  assert(getIstDateString('2026-09-07T04:42:19.713') === '2026-09-07', 'TEST 2: Early morning IST DB timestamp without Z maps to correct IST date')
  assert(getIstDateString('2026-09-07T23:59:00.000Z') === '2026-09-08', 'TEST 3: Late night UTC (23:59Z) correctly advances to next day in IST (05:29 AM)')
  assert(shiftDate('2024-03-01', -1) === '2024-02-29', 'TEST 4: Leap year shift (March 1 - 1 day = Feb 29)')
  assert(shiftDate('2026-01-01', -1) === '2025-12-31', 'TEST 5: Year boundary shift (Jan 1 - 1 day = Dec 31)')

  console.log('\n--- Suite 2: Authoritative Consecutive Streak Rules ---')
  // 0 activity
  const emptyRes = calculateAuthoritativeStreak([], refDate)
  assert(emptyRes.streak === 0, 'TEST 6: 0 activities returns streak = 0')
  assert(emptyRes.activeToday === false, 'TEST 7: 0 activities activeToday is false')

  // Activity today only
  const todayOnly = calculateAuthoritativeStreak(['2026-09-08T08:00:00+05:30'], refDate)
  assert(todayOnly.streak === 1, 'TEST 8: Active today only returns streak = 1')
  assert(todayOnly.activeToday === true, 'TEST 9: Active today flag is true')

  // Activity yesterday only
  const yesterdayOnly = calculateAuthoritativeStreak(['2026-09-07T10:00:00+05:30'], refDate)
  assert(yesterdayOnly.streak === 1, 'TEST 10: Active yesterday only maintains streak = 1')
  assert(yesterdayOnly.activeToday === false, 'TEST 11: Active yesterday only has activeToday = false')

  // Activity today + yesterday
  const twoConsecutive = calculateAuthoritativeStreak(
    ['2026-09-07T14:00:00+05:30', '2026-09-08T08:00:00+05:30'],
    refDate
  )
  assert(twoConsecutive.streak === 2, 'TEST 12: Active today + yesterday returns streak = 2')

  // Lapsed streak (last active 2 days ago)
  const lapsed = calculateAuthoritativeStreak(
    ['2026-09-01', '2026-09-02', '2026-09-03', '2026-09-06'],
    refDate
  )
  assert(lapsed.streak === 0, 'TEST 13: Lapsed streak (last active Sept 6 when today is Sept 8) resets to 0')

  // Multiple submissions on the same calendar day
  const sameDayMulti = calculateAuthoritativeStreak(
    [
      '2026-09-08T01:00:00+05:30',
      '2026-09-08T03:00:00+05:30',
      '2026-09-08T06:00:00+05:30',
      '2026-09-08T09:00:00+05:30',
    ],
    refDate
  )
  assert(sameDayMulti.streak === 1, 'TEST 14: Multiple submissions on the same day count as streak = 1 (never > 1)')
  assert(sameDayMulti.activeDaysCount === 1, 'TEST 15: activeDaysCount deduplicates to 1')

  // Leap year boundary streak
  const leapRef = new Date('2024-03-01T12:00:00+05:30')
  const leapStreak = calculateAuthoritativeStreak(
    ['2024-02-28', '2024-02-29', '2024-03-01'],
    leapRef
  )
  assert(leapStreak.streak === 3, 'TEST 16: Leap year consecutive boundary (Feb 28, Feb 29, Mar 1) evaluates to 3')

  // Year boundary streak
  const yearRef = new Date('2026-01-01T12:00:00+05:30')
  const yearStreak = calculateAuthoritativeStreak(
    ['2025-12-30', '2025-12-31', '2026-01-01'],
    yearRef
  )
  assert(yearStreak.streak === 3, 'TEST 17: Year boundary consecutive days (Dec 30, Dec 31, Jan 1) evaluates to 3')

  console.log('\n--- Suite 3: Real Database Live Data Consistency Verification ---')
  const students = await fetchCampusStudents()
  const elango = students.find((s) => s.email.includes('elango'))

  assert(Boolean(elango), 'TEST 18: Elango S found in live database students list')
  if (elango) {
    assert(elango.questionsSolved === 3, `TEST 19: Campus students questionsSolved is exactly 3 unique problems (got ${elango.questionsSolved})`)
    assert(elango.totalSubmissions >= 5, `TEST 20: Total submissions is at least 5 (got ${elango.totalSubmissions})`)
    assert(elango.totalXp === 150, `TEST 21: Total XP is 150 (got ${elango.totalXp})`)
    assert(elango.streak >= 1, `TEST 22: Authoritative streak is positive (got ${elango.streak})`)
  }

  const cloudState = await fetchUserProgressFromCloud('f14872cf-2152-4504-b885-32074aef5aaf')
  assert(Boolean(cloudState), 'TEST 23: fetchUserProgressFromCloud successfully retrieved')
  if (cloudState && elango) {
    assert(cloudState.solvedSlugs.length === 3, `TEST 24: Cloud solvedSlugs length is 3 (got ${cloudState.solvedSlugs.length})`)
    assert(cloudState.streak === elango.streak, `TEST 25: Cloud streak matches authoritative streak (${elango.streak}) (got ${cloudState.streak})`)
    assert(cloudState.xp === 150, `TEST 26: Cloud XP is 150 (got ${cloudState.xp})`)
  }

  const leaderboard = await fetchStudentLeaderboard('overall')
  const elangoLeaderboard = leaderboard.find((s) => s.email.includes('elango'))
  assert(Boolean(elangoLeaderboard), 'TEST 27: Elango found in overall leaderboard')
  if (elangoLeaderboard && elango) {
    assert(elangoLeaderboard.questionsSolved === 3, `TEST 28: Leaderboard questionsSolved matches 3 (got ${elangoLeaderboard.questionsSolved})`)
    assert(elangoLeaderboard.streak === elango.streak, `TEST 29: Leaderboard streak matches authoritative streak (${elango.streak}) (got ${elangoLeaderboard.streak})`)
    assert(elangoLeaderboard.totalXp === 150, `TEST 30: Leaderboard totalXp matches 150 (got ${elangoLeaderboard.totalXp})`)
  }

  console.log('\n--- Suite 4: Mentor Portal Data Consistency Verification ---')
  const { fetchMentorRoster, fetchMentorProfileByUserId } = await import('../src/lib/mentorService')
  const { data: mentorRow } = await (await import('../src/lib/supabase')).supabase
    .from('mentors')
    .select('id, user_id, name')
    .ilike('name', '%Infanta%')
    .maybeSingle()

  if (mentorRow?.user_id && elango) {
    const roster = await fetchMentorRoster(mentorRow.user_id)
    const elangoMentorView = roster.find((s) => s.email.includes('elango'))
    assert(Boolean(elangoMentorView), 'TEST 31: Elango found in assigned mentor student roster')
    if (elangoMentorView) {
      assert(elangoMentorView.solvedCount === 3, `TEST 32: Mentor view solvedCount matches 3 (got ${elangoMentorView.solvedCount})`)
      assert(elangoMentorView.streak === elango.streak, `TEST 33: Mentor view streak matches authoritative streak (${elango.streak}) (got ${elangoMentorView.streak})`)
    }
  } else {
    console.log('Mentor user_id not found for Infanta, skipping Suite 4')
  }

  console.log('\n========================================================================')
  console.log(`🏁 AUDIT RESULTS: ${passed} / ${total} TESTS PASSED`)
  console.log('========================================================================\n')

  if (passed === total) {
    console.log('🎉 ALL 30 CONSISTENCY & STREAK AUDIT TESTS PASSED!')
    process.exit(0)
  } else {
    console.error(`💥 ${total - passed} TESTS FAILED!`)
    process.exit(1)
  }
}

runStreakAuditTests().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
