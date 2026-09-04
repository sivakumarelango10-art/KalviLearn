import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { BrandLogo } from '@/components/common/BrandLogo'

/**
 * Dedicated 404 Page Not Found Screen
 * Clean, branded, accessible 404 error page adhering to the KalviLearn design system.
 */
export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <main
      role="main"
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-neutral-50 font-sans text-neutral-900 select-none"
    >
      <div className="max-w-lg w-full bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Logo Header */}
        <div className="flex justify-center">
          <BrandLogo size="md" orientation="vertical" />
        </div>

        {/* 404 Visual Indicator */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#ED2A2B] text-xs font-bold tracking-wider uppercase">
            <Search className="w-3.5 h-3.5" />
            <span>HTTP 404 Error</span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-neutral-900">
            404
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold text-neutral-800">
            Page Not Found
          </h2>

          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
            The destination you requested does not exist, may have been moved, or the link you followed is broken.
          </p>
        </div>

        {/* Interactive Navigation Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Subtle Platform Reassurance */}
        <div className="pt-4 border-t border-neutral-100 text-[11px] text-neutral-400">
          Kalvi Learn Student Platform &bull; Continuous Academic Progression
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
