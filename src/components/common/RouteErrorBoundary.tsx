import React from 'react'
import { useRouteError, Link } from 'react-router-dom'
import { RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react'
import { isChunkLoadError } from '@/lib/lazyWithRetry'

export const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError()
  const isChunk = isChunkLoadError(error)

  const handleRefresh = () => {
    // Clear chunk reload keys and reload page cleanly
    try {
      for (let i = sessionStorage.length - 1; i >= 0; i--) {
        const key = sessionStorage.key(i)
        if (key && key.startsWith('kalvi_chunk_reload_')) {
          sessionStorage.removeItem(key)
        }
      }
    } catch {}
    window.location.reload()
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-white">
      <div className="max-w-md w-full bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-6 animate-modal-pop">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 text-[#ED2A2B] flex items-center justify-center mx-auto shadow-sm">
          {isChunk ? <RotateCcw className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            {isChunk ? 'New Update Available' : 'Something Went Wrong'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            {isChunk
              ? 'A new version of Kalvi Learn has been deployed. Please refresh your browser to load the latest resources.'
              : 'An unexpected application error occurred while loading this page.'}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRefresh}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 shadow-sm transition-all interactive-btn"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reload Page</span>
          </button>

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
