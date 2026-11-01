import type { IncomingMessage } from 'http'

export interface RouteResolution {
  method: string
  subpath: string
  action: string
  queryParams: Record<string, string>
}

/**
 * Extracts query parameters from req.url (URL search params) and merges with req.query if present.
 */
export function parseQueryParams(req: IncomingMessage & { query?: unknown }): Record<string, string> {
  const params: Record<string, string> = {}
  try {
    const rawUrl = req.url || '/'
    const parsed = new URL(rawUrl, 'http://localhost')
    for (const [k, v] of parsed.searchParams.entries()) {
      params[k] = v
    }
  } catch {}

  if (typeof req.query === 'object' && req.query) {
    for (const [k, v] of Object.entries(req.query as Record<string, unknown>)) {
      if (typeof v === 'string') params[k] = v
      else if (Array.isArray(v) && typeof v[0] === 'string') params[k] = v[0]
      else if (v !== undefined && v !== null) params[k] = String(v)
    }
  }

  return params
}

/**
 * Resolves reliable routing metadata (method, subpath, action, queryParams)
 * regardless of Vercel edge rewrites, CDN proxies, or local dev routing.
 */
export function resolveRoute(
  req: IncomingMessage & { query?: unknown },
  body: Record<string, unknown> = {},
  basePrefix: string // '/api/campus' or '/api/super-admin'
): RouteResolution {
  const method = (req.method || 'GET').toUpperCase()
  const queryParams = parseQueryParams(req)

  // 1. Resolve Subpath
  let subpath = (
    queryParams.__subpath ||
    queryParams._subpath ||
    queryParams.subpath ||
    queryParams.path ||
    (req.headers['x-kalvi-subpath'] as string) ||
    (req.headers['x-forwarded-uri'] as string) ||
    (req.headers['x-original-url'] as string) ||
    (req.headers['x-rewrite-url'] as string) ||
    (req.headers['x-invoke-path'] as string) ||
    ''
  ).toLowerCase().trim()

  // If subpath wasn't in special query params or headers, extract from req.url pathname
  if (!subpath) {
    try {
      const parsed = new URL(req.url || '/', 'http://localhost')
      const p = parsed.pathname.toLowerCase()
      if (p.startsWith(basePrefix.toLowerCase())) {
        subpath = p.slice(basePrefix.length)
      } else {
        subpath = p
      }
    } catch {}
  }

  // Strip query string and leading/trailing slashes
  subpath = subpath.split('?')[0].replace(/^\/+|\/+$/g, '')
  const cleanBase = basePrefix.toLowerCase().replace(/^\/+|\/+$/g, '')
  if (subpath.startsWith(cleanBase)) {
    subpath = subpath.slice(cleanBase.length).replace(/^\/+|\/+$/g, '')
  }

  // 2. Resolve Action
  let action = ''
  if (typeof body.action === 'string' && body.action.trim()) {
    action = body.action.trim().toLowerCase()
  } else if (queryParams.action && typeof queryParams.action === 'string') {
    action = queryParams.action.trim().toLowerCase()
  } else if (typeof req.headers['x-kalvi-action'] === 'string' && req.headers['x-kalvi-action'].trim()) {
    action = (req.headers['x-kalvi-action'] as string).trim().toLowerCase()
  }

  return { method, subpath, action, queryParams }
}
