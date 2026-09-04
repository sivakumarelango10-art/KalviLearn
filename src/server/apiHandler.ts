import type { IncomingMessage, ServerResponse } from 'http'
import { executeQuestion } from './executeService'

export default async function handler(
  req: IncomingMessage & { body?: any; query?: any },
  res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => any }
) {
  const sendJson = (statusCode: number, data: any) => {
    if (typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(statusCode).json(data)
    }
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  }

  // Support CORS if needed
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    return sendJson(405, { error: 'Method Not Allowed. Use POST.' })
  }

  // Parse body if not already parsed by Vercel
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  } else if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
    body = await new Promise((resolve) => {
      let data = ''
      req.on('data', (chunk) => {
        data += chunk
      })
      req.on('end', () => {
        try {
          resolve(JSON.parse(data || '{}'))
        } catch {
          resolve({})
        }
      })
      req.on('error', () => resolve({}))
      setTimeout(() => resolve(body || {}), 200)
    })
  }

  const { questionSlug, language, code, isSubmit = true } = body || {}

  if (!questionSlug || !language || !code) {
    return sendJson(400, {
      success: false,
      error: 'Missing Parameters',
      message: 'questionSlug, language, and code are required.',
      total: isSubmit ? 10 : 3,
      passed: 0,
      testCases: [],
    })
  }

  try {
    const result = await executeQuestion({ questionSlug, language, code, isSubmit })
    return sendJson(200, result)
  } catch (err: any) {
    return sendJson(500, {
      success: false,
      error: 'Execution Error',
      message: err.message || 'Internal Server Error',
      total: isSubmit ? 10 : 3,
      passed: 0,
      testCases: [],
    })
  }
}
