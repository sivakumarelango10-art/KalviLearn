import React from 'react'
import { CheckCircle2, ArrowRight, X } from 'lucide-react'

interface QuestionCompletionModalProps {
  isOpen: boolean
  hasNextQuestion: boolean
  nextQuestionSlug?: string | null
  onContinue: () => void
  onCancel: () => void
}

export const QuestionCompletionModal: React.FC<QuestionCompletionModalProps> = ({
  isOpen,
  hasNextQuestion,
  onContinue,
  onCancel,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-700/80 rounded-2xl p-6 sm:p-8 text-neutral-100 shadow-2xl flex flex-col items-center text-center space-y-5 animate-in zoom-in-95 duration-200">
        {/* Close icon button for Cancel */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Cancel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center animate-bounce-subtle">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Header and Details */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Passed 10 / 10 Test Cases</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Question Completed!
          </h3>
          <p className="text-sm text-neutral-400 max-w-xs mx-auto">
            You passed all 10 test cases.
            {hasNextQuestion
              ? ' Continue to the next question?'
              : ' You have conquered all questions in this belt!'}
          </p>
        </div>

        {/* Action Buttons: Cancel and Continue */}
        <div className="flex items-center justify-center gap-3 w-full pt-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-700 hover:border-neutral-600 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-sm transition-all shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-[#D92223] text-white font-semibold text-sm transition-all shadow-lg shadow-red-950/50 flex items-center justify-center gap-2"
          >
            <span>{hasNextQuestion ? 'Continue' : 'Finish'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
