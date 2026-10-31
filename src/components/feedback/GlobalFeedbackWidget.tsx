import React, { useState, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { FeedbackButton } from './FeedbackButton'

const FeedbackModal = React.lazy(() =>
  import('./FeedbackModal').then((mod) => ({ default: mod.FeedbackModal }))
)

interface GlobalFeedbackWidgetProps {
  portal?: 'STUDENT' | 'MENTOR' | 'CAMPUS_MANAGER' | string
}

export const GlobalFeedbackWidget: React.FC<GlobalFeedbackWidgetProps> = ({ portal }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Dynamically resolve portal from route if not explicitly passed
  const resolvedPortal = portal || (() => {
    const path = (location.pathname || '').toLowerCase()
    if (path.startsWith('/mentor')) return 'MENTOR'
    if (path.startsWith('/campus')) return 'CAMPUS_MANAGER'
    return 'STUDENT'
  })()

  return (
    <>
      <FeedbackButton onClick={() => setIsOpen(true)} isOpen={isOpen} />
      {isOpen && (
        <Suspense fallback={null}>
          <FeedbackModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            portal={resolvedPortal}
          />
        </Suspense>
      )}
    </>
  )
}
