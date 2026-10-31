import React, { useState, useEffect, useRef } from 'react'
import { FeedbackType, FeedbackSubmissionResult } from '@/services/feedbackService'
import { FeedbackMenu } from './FeedbackMenu'
import { FeedbackForm } from './FeedbackForm'
import { FeedbackSuccess } from './FeedbackSuccess'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  portal?: string
}

type ModalStep = 'MENU' | 'FORM' | 'SUCCESS'

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, portal }) => {
  const [step, setStep] = useState<ModalStep>('MENU')
  const [selectedType, setSelectedType] = useState<FeedbackType | null>(null)
  const [submissionResult, setSubmissionResult] = useState<FeedbackSubmissionResult | null>(null)

  const modalRef = useRef<HTMLDivElement>(null)

  // Body scroll lock and Escape key management
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (step === 'FORM') {
          // Go back to menu
          setStep('MENU')
        } else {
          handleClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, step])

  const handleClose = () => {
    onClose()
    // Reset state after exit animation
    setTimeout(() => {
      setStep('MENU')
      setSelectedType(null)
      setSubmissionResult(null)
    }, 200)
  }

  const handleSelectType = (type: FeedbackType) => {
    setSelectedType(type)
    setStep('FORM')
  }

  const handleBackToMenu = () => {
    setStep('MENU')
  }

  const handleSuccess = (result: FeedbackSubmissionResult) => {
    setSubmissionResult(result)
    setStep('SUCCESS')
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-dialog-title"
    >
      <div
        ref={modalRef}
        className="bg-white border border-[#e5e7eb] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transition-all my-auto"
      >
        {step === 'MENU' && (
          <FeedbackMenu
            onSelectType={handleSelectType}
            onClose={handleClose}
            portal={portal}
          />
        )}

        {step === 'FORM' && selectedType && (
          <FeedbackForm
            type={selectedType}
            onBack={handleBackToMenu}
            onClose={handleClose}
            onSuccess={handleSuccess}
            portal={portal}
          />
        )}

        {step === 'SUCCESS' && (
          <FeedbackSuccess
            result={submissionResult}
            onDone={handleClose}
          />
        )}
      </div>
    </div>
  )
}
