import React from 'react'
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import { RotateCcw, AlertTriangle, ArrowRight, ShieldAlert, FileQuestion, ServerCrash } from 'lucide-react'
import { isChunkLoadError } from '@/lib/lazyWithRetry'

export const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError()
  const isChunk = isChunkLoadError(error)
  const isRouteError = isRouteErrorResponse(error)

  const handleRefresh = () => {
    // Clear chunk reload keys and reload page cleanly
    try {
      for (let i = sessionStorage.length - 1; i >= 0; i--) {
        const key = sessionStorage.key(i)
        if (key && key.startsWith('kalvi_chunk_reload_')) {
          sessionStorage.removeItem(key)
        }
      }
    } catch (storageErr) {
      console.warn('Failed to clear chunk reload keys:', storageErr)
    }
    window.location.reload()
  }

  // Determine title, message, and icon based on error category
  let title = 'Something Went Wrong'
  let message = 'An unexpected application error occurred while loading this page.'
  let icon = <AlertTriangle className="w-8 h-8" />
  let iconBg = 'bg-red-50 border-red-200 text-[#ED2A2B]'
  let primaryAction: 'reload' | 'login' | 'dashboard' = 'reload'

  if (isChunk) {
    title = 'New Update Available'
    message = 'A new version of Kalvi Learn has been deployed. Please refresh your browser to load the latest resources.'
    icon = <RotateCcw className="w-8 h-8" />
    iconBg = 'bg-blue-50 border-blue-200 text-blue-600'
  } else if (isRouteError) {
    if (error.status === 404) {
      title = '404 - Page Not Found'
      message = (error.data as string) || "The page you're looking for does not exist or has been moved."
      icon = <FileQuestion className="w-8 h-8" />
      iconBg = 'bg-neutral-100 border-neutral-300 text-neutral-700'
      primaryAction = 'dashboard'
    } else if (error.status === 401) {
      title = '401 - Session Expired'
      message = 'Your login session has expired or is invalid. Please sign in again to continue.'
      icon = <ShieldAlert className="w-8 h-8" />
      iconBg = 'bg-amber-50 border-amber-200 text-amber-600'
      primaryAction = 'login'
    } else if (error.status === 403) {
      title = '403 - Access Denied'
      message = 'You do not have permission to access this resource. Please check your account privileges.'
      icon = <ShieldAlert className="w-8 h-8" />
      iconBg = 'bg-amber-50 border-amber-200 text-amber-600'
      primaryAction = 'dashboard'
    } else if (error.status === 500) {
      title = '500 - Server Error'
      message = 'The server encountered an issue processing your request. Please try again in a few moments.'
      icon = <ServerCrash className="w-8 h-8" />
      iconBg = 'bg-red-50 border-red-200 text-[#ED2A2B]'
      primaryAction = 'reload'
    } else {
      title = `${error.status} - Application Error`
      message = error.statusText || 'An unexpected error occurred while communicating with the server.'
    }
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-white"
    >
      <div className="max-w-md w-full bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-6 animate-modal-pop">
        <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto shadow-sm ${iconBg}`}>
          {icon}
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {primaryAction === 'reload' && (
            <button
              type="button"
              onClick={handleRefresh}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 shadow-sm transition-all interactive-btn"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Page</span>
            </button>
          )}

          {primaryAction === 'login' && (
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all interactive-btn"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-medium transition-all interactive-btn"
          >
            <span>Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
