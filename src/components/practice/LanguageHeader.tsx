import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { ProgrammingLanguage, LanguageCurriculum } from '@/data/curriculum/index'
import { PythonLogo, JavaLogo, NodejsLogo, CppLogo } from './LanguageCards'

interface LanguageHeaderProps {
  curriculum: LanguageCurriculum
  solvedCount: number
  totalCount: number
  percentage: number
  xp: number
}

export const LanguageHeader: React.FC<LanguageHeaderProps> = ({
  curriculum,
  solvedCount,
  totalCount,
  percentage,
  xp,
}) => {
  const renderLogo = (lang: ProgrammingLanguage) => {
    switch (lang) {
      case 'python':
        return <PythonLogo className="w-10 h-10 sm:w-12 sm:h-12" />
      case 'java':
        return <JavaLogo className="w-10 h-10 sm:w-12 sm:h-12" />
      case 'nodejs':
        return <NodejsLogo className="w-10 h-10 sm:w-12 sm:h-12" />
      case 'cpp':
        return <CppLogo className="w-10 h-10 sm:w-12 sm:h-12" />
      default:
        return null
    }
  }

  const getLanguageBg = (lang: ProgrammingLanguage) => {
    switch (lang) {
      case 'python':
        return 'bg-[#EEF5FF] border-[#D0E2FF]'
      case 'java':
        return 'bg-[#FFF0ED] border-[#FFD2C8]'
      case 'nodejs':
        return 'bg-[#EDF8EE] border-[#CBEBCF]'
      case 'cpp':
        return 'bg-[#EEF5FC] border-[#CDE0F5]'
    }
  }

  return (
    <div className="space-y-6">
      {/* Back button to Language Selection */}
      <div>
        <Link
          to="/practice"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Change Language</span>
        </Link>
      </div>

      {/* Main Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-200/80">
        <div className="flex items-start sm:items-center gap-4 sm:gap-5">
          {/* Language Icon Container */}
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center flex-shrink-0 border shadow-sm ${getLanguageBg(
              curriculum.language
            )}`}
          >
            {renderLogo(curriculum.language)}
          </div>

          <div className="space-y-1 sm:space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1527] tracking-tight">
                {curriculum.name} Practice Arena
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
                {curriculum.badgeName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl leading-relaxed">
              {curriculum.description}
            </p>
          </div>
        </div>

        {/* Language-Specific Progress Meter & XP */}
        <div className="flex items-center gap-4 self-start lg:self-center flex-wrap">
          {/* Language XP Badge */}
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/80 rounded-xl px-3.5 py-2 text-xs font-bold text-amber-800 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{xp} {curriculum.name} XP</span>
          </div>

          {/* Radial Progress Gauge */}
          <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-200/80 rounded-xl px-4 py-2 shadow-sm">
            <div className="w-9 h-9 relative flex items-center justify-center flex-shrink-0">
              <svg className="w-9 h-9 transform -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  className="text-neutral-200"
                  fill="transparent"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  stroke="#ED2A2B"
                  strokeWidth="3.5"
                  strokeDasharray={87.96}
                  strokeDashoffset={87.96 - (87.96 * percentage) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-neutral-900">{percentage}%</span>
            </div>
            <div>
              <div className="text-[11px] text-neutral-500 font-medium">
                {curriculum.name} Progress
              </div>
              <div className="text-xs font-bold text-neutral-900">
                {solvedCount} <span className="text-neutral-400 font-normal">/ {totalCount} Solved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
