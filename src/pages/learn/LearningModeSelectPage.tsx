import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Code2, ArrowRight, Compass } from 'lucide-react'

export const LearningModeSelectPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-[#ED2A2B] border border-red-200">
          <Compass className="w-3.5 h-3.5" />
          <span>KalviLearn Learning Paths</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Choose Your Learning Path
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Explore structured theory and multilingual lessons, or strengthen your algorithmic problem solving through topic-by-topic coding practice.
        </p>
      </div>

      {/* Two Balanced Primary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* COURSES CARD */}
        <Link
          to="/learn/courses"
          className="group relative bg-white rounded-3xl p-8 border border-neutral-200/80 shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between interactive-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED2A2B] focus-visible:ring-offset-2"
        >
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 text-[#ED2A2B] border border-red-100 flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
              <BookOpen className="w-7 h-7" />
            </div>

            <div className="space-y-2.5">
              <h2 className="text-2xl font-bold text-neutral-900 group-hover:text-[#ED2A2B] transition-colors">
                Courses
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Learn programming concepts through structured lessons, theory, examples, and multilingual implementations.
              </p>
            </div>
          </div>

          <div className="pt-8">
            <div className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-neutral-900 group-hover:bg-[#ED2A2B] text-white text-sm font-semibold transition-all duration-300 shadow-xs group-hover:shadow-md">
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* CODING CARD */}
        <Link
          to="/learn/coding"
          className="group relative bg-white rounded-3xl p-8 border border-neutral-200/80 shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between interactive-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED2A2B] focus-visible:ring-offset-2"
        >
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
              <Code2 className="w-7 h-7" />
            </div>

            <div className="space-y-2.5">
              <h2 className="text-2xl font-bold text-neutral-900 group-hover:text-[#ED2A2B] transition-colors">
                Coding
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Practice programming, problem solving, data structures, algorithms, and object-oriented programming topic by topic.
              </p>
            </div>
          </div>

          <div className="pt-8">
            <div className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-neutral-900 group-hover:bg-[#ED2A2B] text-white text-sm font-semibold transition-all duration-300 shadow-xs group-hover:shadow-md">
              <span>Start Coding</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default LearningModeSelectPage
