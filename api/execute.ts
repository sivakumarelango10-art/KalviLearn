import type { IncomingMessage, ServerResponse } from 'http'
import { executeQuestion } from '../src/server/executeService'

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse & { status?: any; json?: any }) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method Not Allowed. Use POST.' }))
    return
  }

  // Parse body if not parsed
  let body = req.body
  if (!body) {
    body = await new Promise((resolve) => {
      let data = ''
      req.on('data', (chunk) => {
        data += chunk
      })
      req.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch {
          resolve({})
        }
      })
    })
  }

  const { questionSlug, language, code } = body || {}

  if (!questionSlug || !language || !code) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        success: false,
        error: 'Missing Parameters',
        message: 'questionSlug, language, and code are required.',
        total: 10,
        passed: 0,
        testCases: [],
      })
    )
    return
  }

  try {
    const result = await executeQuestion({ questionSlug, language, code })
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(result))
  } catch (err: any) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        success: false,
        error: 'Execution Error',
        message: err.message || 'Internal Server Error',
        total: 10,
        passed: 0,
        testCases: [],
      })
    )
  }
}
