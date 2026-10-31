import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

export const PythonLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M63.5 12.2c-26.6 0-25 11.5-25 11.5l.03 11.9h25.4v3.6H28.4s-16.2 1.8-16.2 25.4c0 23.5 14.2 24.6 14.2 24.6h8.5v-12c0-13.6 11.7-13.1 11.7-13.1h25.1c11.7 0 11.7-11.2 11.7-11.2V24s1.9-11.8-24.9-11.8zm-13.7 7.7a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4z"
      fill="#387EB8"
    />
    <path
      d="M64.5 115.8c26.6 0 25-11.5 25-11.5l-.03-11.9H64.07v-3.6h35.53s16.2-1.8 16.2-25.4c0-23.5-14.2-24.6-14.2-24.6h-8.5v12c0 13.6-11.7 13.1-11.7 13.1H56.3c-11.7 0-11.7 11.2-11.7 11.2V104s-1.9 11.8 24.9 11.8zm13.7-7.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4z"
      fill="#FFE052"
    />
  </svg>
)

export const JavaLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Steam - Red and Orange */}
    <path
      d="M74.9 23.4s7.9 8.2-7.5 20.8c-12.4 10.1-4.2 16.5-4.2 16.5s-10.7-5.9-4.2-15.1c7.4-10.7 19.3-13.6 15.9-22.2z"
      fill="#EA2D2E"
    />
    <path
      d="M72.2 47.7c4.3 4.9-1.2 9.5-1.2 9.5s11.5-5.9 6.2-13.4c-5.2-7.3-9.5-11-20.1-22.7 7.9 7 11.4 14.6 15.1 26.6zm-17.7 21c-4.4 7.6 3.3 14.5 3.3 14.5s-7.6-7.4-3.1-14.8c4.3-7.1 11.5-11.6 11.5-11.6s-7.4 4.4-11.7 11.9z"
      fill="#E76F00"
    />
    {/* Cup & Saucer - Blue */}
    <path
      d="M48.8 90.6s-4.6 2.6 3.3 3.5c9.6 1.1 15.3 1 26.6-.9 0 0 3.7 2.3 8.8 4.2-31.4 13.1-66.2-1.8-38.7-6.8zm2.5-14s-5.6 3.8 2.2 4.8c10.4 1.3 19.3 1.4 34.3-.9 0 0 2.5 2.1 6.1 4-38.5 12.2-74.6-.9-42.6-7.9z"
      fill="#5382A1"
    />
    <path
      d="M87.3 104.7c-5.2 3.8-21.4 7.2-41.6 1.6-4.6-1.3-1.3-3.6-1.3-3.6 17.5 4.3 36.3 3.1 47.9-2.3 3.8-1.8 1.4 2.8-5 4.3zm6.6-18.4c7.6-8.9 3.9-17-3.8-20.7-3.1-1.5-4.5-.4-4.5-.4 6.7 3.3 8.3 8.5 3.3 13.9-7.3 7.8-15.6 10.4-38.1 10.7-3.1 0-4.3 1.9-1.5 2.4 20.3 3.3 37.8 1.2 44.6-5.9zm-46.7 27.2c28.3 1.8 54.7-7.7 54.7-7.7s-4.6 3.2-11.9 5.8c-17.8 6.4-48.4 4.7-56.1.4 0 0 2.8 1 13.3 1.5z"
      fill="#007396"
    />
  </svg>
)

export const NodejsLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hexagon Outline */}
    <path
      d="M50 8 L86 28.5 L86 69.5 L50 90 L14 69.5 L14 28.5 Z"
      stroke="#539E43"
      strokeWidth="7"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    />
    {/* Stylized J and S */}
    <path
      d="M44 35 V62 C44 66.5 40.5 70 36 70 C32.5 70 29.5 68 27.5 65"
      stroke="#539E43"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M72 43.5 C69.5 38.5 63.5 35.5 57.5 35.5 C51 35.5 47.5 39.5 47.5 45 C47.5 54.5 72 50 72 60.5 C72 66.5 66.5 70.5 58.5 70.5 C52.5 70.5 47.5 67 45.5 62.5"
      stroke="#539E43"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

export const CppLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hexagon Shape */}
    <path
      d="M50 8 L86 28.5 L86 69.5 L50 90 L14 69.5 L14 28.5 Z"
      fill="#00599C"
    />
    {/* Shaded facets */}
    <path
      d="M50 8 L86 28.5 L86 69.5 L50 90 L50 49 Z"
      fill="#004482"
      opacity="0.35"
    />
    <path
      d="M86 28.5 L86 69.5 L50 90 Z"
      fill="#659AD2"
      opacity="0.4"
    />
    {/* White C++ Letters */}
    <path
      d="M43 40 C40 36.5 35.5 34.5 30.5 34.5 C21.5 34.5 15 42 15 50 C15 58 21.5 65.5 30.5 65.5 C35.5 65.5 40 63.5 43 60"
      stroke="#FFFFFF"
      strokeWidth="6.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* First + */}
    <path
      d="M53 50 H65 M59 44 V56"
      stroke="#FFFFFF"
      strokeWidth="5"
      strokeLinecap="round"
    />
    {/* Second + */}
    <path
      d="M71 50 H83 M77 44 V56"
      stroke="#FFFFFF"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
)

export interface LanguageOption {
  id: 'python' | 'java' | 'nodejs' | 'cpp'
  name: string
  description: string
  param: 'python' | 'java' | 'javascript' | 'cpp'
  bg: string
  icon: React.ReactNode
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    id: 'python',
    name: 'Python',
    description: 'Solve problems using Python',
    param: 'python',
    bg: 'bg-[#EEF5FF]',
    icon: <PythonLogo className="w-11 h-11 sm:w-12 sm:h-12" />,
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Solve problems using Java',
    param: 'java',
    bg: 'bg-[#FFF0ED]',
    icon: <JavaLogo className="w-11 h-11 sm:w-12 sm:h-12" />,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    description: 'Solve problems using Node.js',
    param: 'javascript',
    bg: 'bg-[#EDF8EE]',
    icon: <NodejsLogo className="w-11 h-11 sm:w-12 sm:h-12" />,
  },
  {
    id: 'cpp',
    name: 'C++',
    description: 'Solve problems using C++',
    param: 'cpp',
    bg: 'bg-[#EEF5FC]',
    icon: <CppLogo className="w-11 h-11 sm:w-12 sm:h-12" />,
  },
]

interface LanguageCardsProps {
  selectedLanguage?: 'python' | 'java' | 'javascript' | 'cpp' | 'nodejs'
  onSelectLanguage?: (lang: 'python' | 'java' | 'javascript' | 'cpp') => void
  targetProblemSlug?: string
}

export const LanguageCards: React.FC<LanguageCardsProps> = ({
  selectedLanguage: _selectedLanguage,
  onSelectLanguage,
  targetProblemSlug,
}) => {
  const location = useLocation()
  const searchParams = location.search

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-5xl mx-auto w-full">
      {LANGUAGE_OPTIONS.map((lang) => {
        const targetUrl = targetProblemSlug
          ? `/practice/${lang.id}/${targetProblemSlug}${searchParams}`
          : `/practice/${lang.id}${searchParams}`

        return (
          <Link
            key={lang.id}
            to={targetUrl}
            onClick={() => {
              if (onSelectLanguage) {
                onSelectLanguage(lang.param)
              }
              localStorage.setItem('kalvi_preferred_language', lang.id)
            }}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-neutral-300 transition-all duration-200 flex flex-col items-center text-center group cursor-pointer relative"
          >
            {/* Circular Logo Container */}
            <div
              className={cn(
                'w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105',
                lang.bg
              )}
            >
              {lang.icon}
            </div>

            {/* Language Name */}
            <h3 className="text-lg sm:text-xl font-bold text-[#0D1527] mb-1.5 tracking-tight">
              {lang.name}
            </h3>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed">
              {lang.description}
            </p>
          </Link>
        )
      })}
    </div>
  )
}
