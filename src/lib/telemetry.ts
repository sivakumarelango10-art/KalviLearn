/**
 * Telemetry & Client Context Collection
 * Captures non-sensitive operational environment data for bug reporting and feedback.
 */

export interface ClientContext {
  browser: string
  device: string
  route: string
  module: string
  environment: string
  app_version: string
  request_id: string
}

export function getBrowserInfo(): string {
  if (typeof window === 'undefined' || !navigator) return 'Unknown Browser'
  const ua = navigator.userAgent

  if (/edg/i.test(ua)) return 'Microsoft Edge'
  if (/chrome|crios/i.test(ua) && !/opr|opera/i.test(ua)) return 'Google Chrome'
  if (/firefox|fxios/i.test(ua)) return 'Mozilla Firefox'
  if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) return 'Apple Safari'
  if (/opr|opera/i.test(ua)) return 'Opera'
  return 'Web Browser'
}

export function getDeviceType(): string {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  const ua = navigator.userAgent || ''

  if (/mobile|android|iphone|ipod/i.test(ua) || width < 640) {
    return 'mobile'
  }
  if (/ipad|tablet/i.test(ua) || (width >= 640 && width < 1024)) {
    return 'tablet'
  }
  return 'desktop'
}

export function deriveModuleFromPath(pathname: string): string {
  const path = pathname.toLowerCase()
  if (path.includes('/practice') || path.includes('/problems')) return 'STUDENT_ARENA'
  if (path.includes('/curriculum') || path.includes('/learn')) return 'CURRICULUM_LESSONS'
  if (path.includes('/revise')) return 'STUDENT_REVISION'
  if (path.includes('/dashboard')) return 'DASHBOARD_VIEW'
  if (path.includes('/mentor/students')) return 'MENTOR_STUDENT_ROSTER'
  if (path.includes('/mentor/submissions')) return 'MENTOR_SUBMISSIONS'
  if (path.includes('/mentor/curriculum')) return 'MENTOR_CURRICULUM'
  if (path.includes('/campus/mentors')) return 'CAMPUS_MENTORS'
  if (path.includes('/campus/students')) return 'CAMPUS_STUDENTS'
  if (path.includes('/campus/analytics')) return 'CAMPUS_ANALYTICS'
  if (path.includes('/profile')) return 'USER_PROFILE'
  return 'GENERAL_VIEW'
}

export function generateRequestId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `req_${crypto.randomUUID()}`
  }
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function collectTelemetryContext(pathname?: string): ClientContext {
  const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '/')
  return {
    browser: getBrowserInfo(),
    device: getDeviceType(),
    route: typeof window !== 'undefined' ? window.location.pathname + window.location.search : currentPath,
    module: deriveModuleFromPath(currentPath),
    environment: import.meta.env?.MODE === 'production' ? 'production' : 'development',
    app_version: '1.0.0',
    request_id: generateRequestId(),
  }
}
