import React from 'react'
import { Link } from 'react-router-dom'
import { FileQuestion, ArrowLeft, BookOpen } from 'lucide-react'

interface ProblemNotFoundCardProps {
  slug?: string
  language?: string
}

/**
 * Problem Not Found State
 * Rendered in ProblemArenaPage when a problem slug does not exist in the curriculum.
 */
export const ProblemNotFoundCard: React.FC<ProblemNotFoundCardProps> = ({ slug, language }) => {
  const langLabel = language ? language.charAt(0).toUpperCase() + language.slice(1) : 'Practice'

  return (
    <div
      role="alert"
      aria-live="polite"
      className="min-h-[75vh] w-full flex items-center justify-center p-4 bg-neutral-900 text-neutral-100 font-sans"
    >
      <div className="max-w-md w-full bg-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 text-red-400 flex items-center justify-center mx-auto shadow-sm">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-900/80 text-red-400 text-xs font-semibold">
            Problem Not Found
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Challenge Does Not Exist
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            {slug ? (
              <>
                We could not find a problem with the slug{' '}
                <span className="font-mono text-neutral-200 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
                  {slug}
                </span>{' '}
                in the {langLabel} curriculum.
              </>
            ) : (
              'The requested challenge could not be located in this curriculum track.'
            )}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {language ? (
            <Link
              to={`/practice/${language.toLowerCase()}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all interactive-btn"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse {langLabel} Problems</span>
            </Link>
          ) : (
            <Link
              to="/practice"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all interactive-btn"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Practice Arena</span>
            </Link>
          )}

          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-xs sm:text-sm font-medium transition-all interactive-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
