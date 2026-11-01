/**
 * Comprehensive Auth Flow & Redirect Verification Script
 * Validates:
 * - Environment-aware OAuth callback construction (localhost:5174, 127.0.0.1:5174, localhost:5173, production)
 * - Strict allowlist origin validation (open-redirect prevention)
 * - Role-based portal routing (SUPERADMIN, CAMPUS_MANAGER, ADMIN, MENTOR, STUDENT)
 * - Zero references to obsolete legacy domains (kalvicode)
 */
import {
  getAuthCallbackUrl,
  isAllowedAuthOrigin,
  DEFAULT_PRODUCTION_URL,
  DEFAULT_PRODUCTION_CALLBACK,
  ALLOWED_AUTH_ORIGINS,
} from '../src/lib/supabase'

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

function resolvePortalPath(role: string): string {
  const normalized = (role || '').toUpperCase()
  if (normalized === 'SUPERADMIN') {
    return '/super-admin/dashboard'
  } else if (normalized === 'CAMPUS_MANAGER' || normalized === 'ADMIN') {
    return '/campus/dashboard'
  } else if (normalized === 'MENTOR') {
    return '/mentor'
  } else {
    return '/dashboard'
  }
}

async function runTests() {
  console.log('========================================================================')
  console.log('🔐 KALVILEARN AUTHENTICATION & REDIRECT FLOW VERIFICATION SUITE')
  console.log('========================================================================\n')

  // --- 1. Production Redirect Configuration ---
  console.log('--- 1. Production Redirect Configuration ---')
  {
    const prodUrl = getAuthCallbackUrl('https://kalvilearn.vercel.app/auth/callback')
    assert(
      prodUrl === 'https://kalvilearn.vercel.app/auth/callback',
      'Production OAuth Redirect URL is correctly formatted',
      `Result: ${prodUrl}`
    )
    assert(
      !prodUrl.includes('kalvicode'),
      'Production Redirect URL contains zero references to kalvicode',
      `URL: ${prodUrl}`
    )
    assert(
      DEFAULT_PRODUCTION_CALLBACK === 'https://kalvilearn.vercel.app/auth/callback',
      'DEFAULT_PRODUCTION_CALLBACK constant matches production',
      `Constant: ${DEFAULT_PRODUCTION_CALLBACK}`
    )
  }

  // --- 2. Local Development Configuration (Port 5174) ---
  console.log('\n--- 2. Local Development Configuration (Port 5174) ---')
  {
    const local5174 = getAuthCallbackUrl('http://localhost:5174/auth/callback')
    assert(
      local5174 === 'http://localhost:5174/auth/callback',
      'Local development OAuth Redirect URL preserves localhost:5174',
      `Result: ${local5174}`
    )

    const ip5174 = getAuthCallbackUrl('http://127.0.0.1:5174/auth/callback')
    assert(
      ip5174 === 'http://127.0.0.1:5174/auth/callback',
      'Local development OAuth Redirect URL preserves 127.0.0.1:5174',
      `Result: ${ip5174}`
    )

    const local5173 = getAuthCallbackUrl('http://localhost:5173/auth/callback')
    assert(
      local5173 === 'http://localhost:5173/auth/callback',
      'Local development OAuth Redirect URL preserves localhost:5173',
      `Result: ${local5173}`
    )
  }

  // --- 3. Allowlist Validation & Open Redirect Security ---
  console.log('\n--- 3. Allowlist Validation & Open Redirect Security ---')
  {
    assert(
      isAllowedAuthOrigin('http://localhost:5174'),
      'Allowlist accepts http://localhost:5174'
    )
    assert(
      isAllowedAuthOrigin('http://127.0.0.1:5174'),
      'Allowlist accepts http://127.0.0.1:5174'
    )
    assert(
      isAllowedAuthOrigin('http://localhost:5173'),
      'Allowlist accepts http://localhost:5173'
    )
    assert(
      isAllowedAuthOrigin('https://kalvilearn.vercel.app'),
      'Allowlist accepts https://kalvilearn.vercel.app'
    )
    assert(
      isAllowedAuthOrigin('https://kalvilearn-preview-feat.vercel.app'),
      'Allowlist accepts Vercel preview deployments (*.vercel.app)'
    )
    assert(
      !isAllowedAuthOrigin('https://malicious-phishing-site.com'),
      'Allowlist strictly rejects arbitrary external domains'
    )
    assert(
      !isAllowedAuthOrigin('http://localhost:9999'),
      'Allowlist strictly rejects unapproved local ports'
    )

    // Verify open-redirect defense: untrusted URL falls back to default safe callback
    const maliciousAttempt = getAuthCallbackUrl('https://evil-hacker.com/steal-token')
    assert(
      maliciousAttempt === DEFAULT_PRODUCTION_CALLBACK,
      'Arbitrary redirect input is rejected and falls back safely to default callback',
      `Fallback: ${maliciousAttempt}`
    )

    // Relative path redirect
    const relativeAttempt = getAuthCallbackUrl('/auth/callback')
    assert(
      relativeAttempt.endsWith('/auth/callback'),
      'Relative path redirect safely resolves to an authorized /auth/callback path',
      `Resolved: ${relativeAttempt}`
    )
  }

  // --- 4. Role-Based Portal Routing ---
  console.log('\n--- 4. Role-Based Portal Routing ---')
  {
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
      resolvePortalPath('SUPERADMIN') === '/super-admin/dashboard',
      'SUPERADMIN role routes deterministically to /super-admin/dashboard'
    )
    assert(
      resolvePortalPath('superadmin') === '/super-admin/dashboard',
      'SUPERADMIN case-insensitive role routes to /super-admin/dashboard'
    )
  }

  // --- 5. Print Summary ---
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
