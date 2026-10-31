import type { IncomingMessage, ServerResponse } from 'http'

/**
 * Newline-delimited JSON progress stream for Run/Submit.
 * A client opts in with `Accept: application/x-ndjson`; everyone else keeps receiving one JSON document.
 * Events are written as the judge produces them (genuine progress, no artificial pacing). If the hosting platform
 * buffers the response, the client still receives every event plus the final result, just later.
 */
export function wantsStream(req: IncomingMessage): boolean {
  const accept = req.headers['accept']
  return typeof accept === 'string' && accept.includes('application/x-ndjson')
}

export function openStream(res: ServerResponse): (event: object) => void {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Accel-Buffering', 'no')
  ;(res as ServerResponse & { flushHeaders?: () => void }).flushHeaders?.()
  return (event) => {
    if (!res.writableEnded) res.write(JSON.stringify(event) + '\n')
  }
}
