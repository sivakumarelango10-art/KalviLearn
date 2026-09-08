import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { FeedbackSubmissionResult } from '@/services/feedbackService'

interface FeedbackSuccessProps {
  result: FeedbackSubmissionResult | null
  onDone: () => void
}

export const FeedbackSuccess: React.FC<FeedbackSuccessProps> = ({ result, onDone }) => {
  return (
    <div className="p-6 sm:p-8 text-center flex flex-col items-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
      {/* Checkmark Icon */}
      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-in zoom-in-50 duration-300 shadow-2xs">
        <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
      </div>

      {/* Main Message */}
      <div>
        <h3 id="feedback-dialog-title" className="text-base sm:text-lg font-bold text-[#191c1e]">
          Feedback submitted!
        </h3>
        <p className="text-xs text-[#5d5e64] mt-1.5 max-w-xs leading-relaxed">
          Thank you for helping us improve KalviLearn.
        </p>
      </div>

      {/* Real Local Reference ID (if provided, without fake TeamSync numbers) */}
      {result?.feedbackId && (
        <div className="px-3 py-1.5 rounded-lg bg-[#f3f4f6] border border-[#e5e7eb] text-[11px] font-mono text-[#5d5e64]">
          Reference ID: <strong className="text-black">#FB-{result.feedbackId}</strong>
        </div>
      )}

      {/* Done Action */}
      <div className="pt-2 w-full max-w-xs">
        <button
          type="button"
          onClick={onDone}
          className="w-full py-2.5 px-4 bg-black text-white text-xs font-semibold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-black"
        >
          Done
        </button>
      </div>
    </div>
  )
}
