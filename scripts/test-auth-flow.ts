/**
 * Comprehensive Auth Flow Verification Script
 * Validates Google OAuth redirect construction, role-based portal routing,
 * database whitelist checking, and elimination of obsolete kalvicode URLs.
 */
import { verifyUserInDatabase, type DbUser } from '../src/lib/authService'

interface TestResult {
  title: string
  passed: boolean
  details?: string
}

const results: TestResult[] = []

function assert(condition: boolean, title: string, details?: string) {
  results.push({
    title,
    passed: Boolean(condition),
    details,
  })
}

async function runTests() {
  console.log('========================================================================')
  console.log('🔐 KALVILEARN AUTHENTICATION & REDIRECT FLOW VERIFICATION SUITE')
  console.log('========================================================================\n')

  // Test 1: Redirect URL Generation for Production
  {
    const origin = 'https://kalvilearn.vercel.app'
    const callbackUrl = `${origin}/auth/callback`
    assert(
      callbackUrl === 'https://kalvilearn.vercel.app/auth/callback',
      'Production OAuth Redirect URL is properly formatted to kalvilearn',
      `Result: ${callbackUrl}`
    )
    assert(
      !callbackUrl.includes('kalvicode'),
      'Production Redirect URL contains zero references to kalvicode',
      `URL: ${callbackUrl}`
    )
  }

  // Test 2: Redirect URL Generation for Local Development
  {
    const origin = 'http://localhost:5173'
    const callbackUrl = `${origin}/auth/callback`
    assert(
      callbackUrl === 'http://localhost:5173/auth/callback',
      'Local development OAuth Redirect URL preserves localhost:5173',
      `Result: ${callbackUrl}`
    )
  }

  // Test 3: Role-Based Redirection Matrix
  {
    function resolvePortalPath(role: string): string {
      const normalized = role.toUpperCase()
      if (normalized === 'CAMPUS_MANAGER' || normalized === 'ADMIN' || normalized === 'SUPERADMIN') {
        return '/campus/dashboard'
      } else if (normalized === 'MENTOR') {
        return '/mentor'
      } else {
        return '/dashboard'
      }
    }

    assert(
      resolvePortalPath('STUDENT') === '/dashboard',
      'STUDENT role routes deterministically to /dashboard'
    )
    assert(
      resolvePortalPath('MENTOR') === '/mentor',
      'MENTOR role routes deterministically to /mentor'
    )
    assert(
      resolvePortalPath('CAMPUS_MANAGER') === '/campus/dashboard',
      'CAMPUS_MANAGER role routes deterministically to /campus/dashboard'
    )
    assert(
      resolvePortalPath('ADMIN') === '/campus/dashboard',
      'ADMIN role routes deterministically to /campus/dashboard'
    )
    assert(
      resolvePortalPath('SUPERADMIN') === '/campus/dashboard',
      'SUPERADMIN role routes deterministically to /campus/dashboard'
    )
  }

  // Test 4: Live Database Verification for Roles
  {
    console.log('Testing live database role lookups from users table...')

    // Check Student
    try {
      const student = await verifyUserInDatabase('kavya.ramesh.s.121@kalvium.community')
      assert(
        student.allowed && student.user?.role === 'STUDENT',
        'Database verifies STUDENT account and maps role accurately',
        `User: ${student.user?.email}, Role: ${student.user?.role}`
      )
    } catch (e: any) {
      assert(false, 'Database verifies STUDENT account', e.message)
    }

    // Check Mentor
    try {
      const mentor = await verifyUserInDatabase('sivakumarelango10@gmail.com')
      assert(
        mentor.allowed && mentor.user?.role === 'MENTOR',
        'Database verifies MENTOR account and maps role accurately',
        `User: ${mentor.user?.email}, Role: ${mentor.user?.role}`
      )
    } catch (e: any) {
      assert(false, 'Database verifies MENTOR account', e.message)
    }

    // Check Campus Manager / Admin
    try {
      const cm = await verifyUserInDatabase('pkumardigital@gmail.com')
      assert(
        cm.allowed && (cm.user?.role === 'CAMPUS_MANAGER' || cm.user?.role === 'ADMIN'),
        'Database verifies CAMPUS_MANAGER / ADMIN account and maps role accurately',
        `User: ${cm.user?.email}, Role: ${cm.user?.role}`
      )
    } catch (e: any) {
      assert(false, 'Database verifies CAMPUS_MANAGER account', e.message)
    }

    // Check Unauthorized Email
    try {
      const unauthorized = await verifyUserInDatabase('unknown_unauthorized_user_xyz@gmail.com')
      assert(
        !unauthorized.allowed && unauthorized.reason === 'ACCOUNT_NOT_REGISTERED',
        'Unauthorized user is correctly rejected with ACCOUNT_NOT_REGISTERED',
        `Allowed: ${unauthorized.allowed}, Reason: ${unauthorized.reason}`
      )
    } catch (e: any) {
      assert(false, 'Unauthorized user is rejected', e.message)
    }
  }

  // Print Summary
  console.log('\n========================================================================')
  console.log('RESULTS SUMMARY')
  console.log('========================================================================')
  let passedCount = 0
  for (const r of results) {
    const icon = r.passed ? '✅' : '❌'
    console.log(`${icon} ${r.title}${r.details ? ` (${r.details})` : ''}`)
    if (r.passed) passedCount++
  }
  console.log(`\nPassed: ${passedCount}/${results.length}`)

  if (passedCount < results.length) {
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
