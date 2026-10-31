import React, { useState } from 'react'
import { MessageSquarePlus } from 'lucide-react'

interface FeedbackButtonProps {
  onClick: () => void
  isOpen?: boolean
}

export const FeedbackButton: React.FC<FeedbackButtonProps> = ({ onClick, isOpen = false }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  if (isOpen) return null

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center">
      {/* Accessible Tooltip */}
      {showTooltip && (
        <div
          role="tooltip"
          id="feedback-tooltip"
          className="absolute right-full mr-2.5 px-2.5 py-1 rounded-lg bg-[#191c1e] text-white text-[11px] font-medium whitespace-nowrap shadow-md pointer-events-none transition-opacity duration-150 animate-in fade-in"
        >
          Feedback & Support
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#191c1e] rotate-45" />
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label="Feedback & Support"
        aria-describedby="feedback-tooltip"
        className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#191c1e] text-white shadow-md hover:shadow-xl hover:bg-black border border-white/10 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ED2A2B] focus:ring-offset-2 select-none"
      >
        <div className="relative flex items-center justify-center">
          <MessageSquarePlus className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ED2A2B] rounded-full ring-2 ring-[#191c1e]" />
        </div>
        <span className="text-xs font-semibold tracking-tight hidden sm:inline-block">
          Feedback & Support
        </span>
      </button>
    </div>
  )
}
