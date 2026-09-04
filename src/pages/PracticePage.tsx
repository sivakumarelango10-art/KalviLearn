import React from 'react'
import { LanguageCards } from '@/components/practice/LanguageCards'

export const PracticePage: React.FC = () => {
  const preferredLanguage = (localStorage.getItem('kalvi_preferred_language') as any) || 'python'

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full space-y-10 sm:space-y-12">
        {/* Main Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D1527] tracking-tight">
            Practice Arena
          </h1>
          <div className="text-neutral-500 text-sm sm:text-base font-normal space-y-1 leading-relaxed">
            <p>Solve progressively challenging problems across languages.</p>
            <p>Choose your language to get started.</p>
          </div>
        </div>

        {/* Language Selection Grid */}
        <div className="space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#0D1527] text-center tracking-tight">
            Select Language
          </h2>

          <LanguageCards selectedLanguage={preferredLanguage} />
        </div>
      </div>
    </div>
  )
}
