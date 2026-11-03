/**
 * Focused, side-effect-free tests for Super Admin request token lifecycle.
 * Uses dependency injection so no real Supabase session or API request is touched.
 */
import assert from 'node:assert/strict'

type Session = { access_token: string; expires_at?: number } | null
type Result = { success: boolean; error?: string; data?: unknown }

function createHarness(options: {
  initialSession: Session
  refreshSession: () => Promise<Session>
  apiResponses: Array<{ status: number; body: unknown }>
}) {
  let session = options.initialSession
  let refreshCalls = 0
  let requestCount = 0
  const requests: Array<{ authorization?: string }> = []

  async function getToken(forceRefresh = false): Promise<string | null> {
    if (!session) return null
    const expired = (session.expires_at ?? 0) * 1000 <= Date.now()
    if (forceRefresh || expired) {
      refreshCalls++
      session = await options.refreshSession()
      return session?.access_token ?? null
    }
    return session.access_token
  }

  async function request(): Promise<Result> {
    let token = await getToken()
    if (!token) return { success: false, error: 'Your sign-in session is missing.' }

    const perform = async () => {
      requests.push({ authorization: token ? `Bearer ${token}` : undefined })
      const response = options.apiResponses[Math.min(requestCount, options.apiResponses.length - 1)]
      requestCount++
      return response
    }

    let response = await perform()
    if (response.status === 401) {
      token = await getToken(true)
      if (!token) return { success: false, error: 'Your session could not be refreshed.' }
      response = await perform()
    }
    const body = response.body as any
    if (response.status === 401) return { success: false, error: 'Your session is invalid or expired.' }
    if (response.status === 403) return { success: false, error: body.message }
    if (response.status >= 500) return { success: false, error: body.message }
    return response.status < 300 && body.success
      ? { success: true, data: body.data }
      : { success: false, error: body.message }
  }

  return {
    request,
    get refreshCalls() { return refreshCalls },
    get requests() { return requests },
    get requestCount() { return requestCount },
  }
}

async function run() {
  // Fresh login and restored valid session use the current access token.
  const valid = createHarness({
    initialSession: { access_token: 'fresh-token', expires_at: Math.floor(Date.now() / 1000) + 3600 },
    refreshSession: async () => ({ access_token: 'rotated-token', expires_at: Math.floor(Date.now() / 1000) + 3600 }),
    apiResponses: [{ status: 200, body: { success: true, data: { totalCampuses: 4 } } }],
  })
  const validResult = await valid.request()
  assert.equal(validResult.success, true)
  assert.equal(valid.requests[0].authorization, 'Bearer fresh-token')
  assert.equal(valid.refreshCalls, 0)

  // Expired access token refreshes before sending a request.
  const expired = createHarness({
    initialSession: { access_token: 'expired-token', expires_at: 1 },
    refreshSession: async () => ({ access_token: 'renewed-token', expires_at: Math.floor(Date.now() / 1000) + 3600 }),
    apiResponses: [{ status: 200, body: { success: true, data: { totalCampuses: 5 } } }],
  })
  assert.equal((await expired.request()).success, true)
  assert.equal(expired.requests[0].authorization, 'Bearer renewed-token')
  assert.equal(expired.refreshCalls, 1)

  // Server-side 401 triggers one refresh and one retry using the replacement token.
  const retry = createHarness({
    initialSession: { access_token: 'old-token', expires_at: Math.floor(Date.now() / 1000) + 3600 },
    refreshSession: async () => ({ access_token: 'new-token', expires_at: Math.floor(Date.now() / 1000) + 3600 }),
    apiResponses: [
      { status: 401, body: { success: false, message: 'Invalid token' } },
      { status: 200, body: { success: true, data: { totalStudents: 10 } } },
    ],
  })
  assert.equal((await retry.request()).success, true)
  assert.equal(retry.requests[0].authorization, 'Bearer old-token')
  assert.equal(retry.requests[1].authorization, 'Bearer new-token')
  assert.equal(retry.requestCount, 2)

  // Refresh failure does not fall back to a stale access token.
  const failedRefresh = createHarness({
    initialSession: { access_token: 'expired-token', expires_at: 1 },
    refreshSession: async () => null,
    apiResponses: [{ status: 200, body: { success: true } }],
  })
  assert.equal((await failedRefresh.request()).success, false)
  assert.equal(failedRefresh.requestCount, 0)

  // Missing session is reported without sending an unauthenticated request.
  const missing = createHarness({
    initialSession: null,
    refreshSession: async () => null,
    apiResponses: [{ status: 200, body: { success: true } }],
  })
  assert.equal((await missing.request()).success, false)
  assert.equal(missing.requestCount, 0)

  // Authorization denials remain distinct from authentication failures.
  const forbidden = createHarness({
    initialSession: { access_token: 'valid-token', expires_at: Math.floor(Date.now() / 1000) + 3600 },
    refreshSession: async () => null,
    apiResponses: [{ status: 403, body: { success: false, message: 'Super Admin permission required.' } }],
  })
  const forbiddenResult = await forbidden.request()
  assert.equal(forbiddenResult.success, false)
  assert.equal(forbiddenResult.error, 'Super Admin permission required.')

  console.log('Super Admin session lifecycle tests: 6 passed')
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
