import crypto from 'crypto'

export interface WebhookAuthResult {
  valid: boolean
  statusCode?: number
  error?: string
  eventId?: string
  timestamp?: number
}

/**
 * Computes an HMAC-SHA256 signature for TeamSync webhook payloads.
 * Format: HMAC_SHA256(secret, `${timestamp}.${rawBody}`)
 */
export function computeTeamSyncSignature(
  rawBody: string,
  timestamp: number | string,
  secret: string = process.env.TEAMSYNC_WEBHOOK_SECRET || 'teamsync_webhook_secret_key'
): string {
  const payloadToSign = `${timestamp}.${rawBody}`
  return crypto.createHmac('sha256', secret).update(payloadToSign, 'utf8').digest('hex')
}

/**
 * Verifies the authenticity and timeliness of incoming TeamSync webhooks.
 *
 * Security controls:
 * 1. Requires X-TeamSync-Signature and X-TeamSync-Timestamp headers
 * 2. Replay protection: Rejects timestamps older or newer than 300 seconds (5 min)
 * 3. Constant-time comparison via crypto.timingSafeEqual (mitigates timing attacks)
 * 4. Zero secret or token exposure in logs or errors
 */
export function verifyTeamSyncWebhookSignature(
  rawBody: string,
  signatureHeader: string | undefined,
  timestampHeader: string | undefined,
  eventIdHeader: string | undefined,
  options: {
    secret?: string
    toleranceSeconds?: number
  } = {}
): WebhookAuthResult {
  const secret = options.secret || process.env.TEAMSYNC_WEBHOOK_SECRET || 'teamsync_webhook_secret_key'
  const toleranceSeconds = options.toleranceSeconds ?? 300 // 5 minutes tolerance

  if (!signatureHeader || typeof signatureHeader !== 'string' || signatureHeader.trim() === '') {
    return {
      valid: false,
      statusCode: 401,
      error: 'Missing or empty X-TeamSync-Signature header.',
    }
  }

  if (!timestampHeader || typeof timestampHeader !== 'string') {
    return {
      valid: false,
      statusCode: 401,
      error: 'Missing X-TeamSync-Timestamp header.',
    }
  }

  const timestampNum = parseInt(timestampHeader, 10)
  if (isNaN(timestampNum) || timestampNum <= 0) {
    return {
      valid: false,
      statusCode: 400,
      error: 'Invalid X-TeamSync-Timestamp header format. Must be Unix epoch seconds.',
    }
  }

  // Replay Attack Defense
  const nowSeconds = Math.floor(Date.now() / 1000)
  const drift = Math.abs(nowSeconds - timestampNum)
  if (drift > toleranceSeconds) {
    return {
      valid: false,
      statusCode: 401,
      error: `Webhook timestamp expired or outside tolerance window (${drift}s drift, max ${toleranceSeconds}s).`,
      timestamp: timestampNum,
    }
  }

  // Support both raw hex and v1=<hex> scheme
  const cleanSignature = signatureHeader.startsWith('v1=')
    ? signatureHeader.slice(3).trim()
    : signatureHeader.trim()

  const expectedHex = computeTeamSyncSignature(rawBody, timestampHeader, secret)

  try {
    const expectedBuffer = Buffer.from(expectedHex, 'hex')
    const actualBuffer = Buffer.from(cleanSignature, 'hex')

    if (expectedBuffer.length !== actualBuffer.length) {
      return {
        valid: false,
        statusCode: 401,
        error: 'Invalid webhook signature length.',
      }
    }

    if (!crypto.timingSafeEqual(expectedBuffer, actualBuffer)) {
      return {
        valid: false,
        statusCode: 401,
        error: 'Invalid webhook signature.',
      }
    }
  } catch {
    return {
      valid: false,
      statusCode: 401,
      error: 'Signature verification failure.',
    }
  }

  return {
    valid: true,
    eventId: eventIdHeader?.trim(),
    timestamp: timestampNum,
  }
}
