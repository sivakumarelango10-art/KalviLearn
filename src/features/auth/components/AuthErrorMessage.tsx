import { type FC } from 'react'
import { AlertCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AuthErrorMessageProps {
  message?: string | null
  onDismiss?: () => void
  className?: string
}

/**
 * Reusable accessible error message component for authentication feedback
 */
export const AuthErrorMessage: FC<AuthErrorMessageProps> = ({
  message,
  onDismiss,
  className,
}) => {
  if (!message) return null

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'flex items-start gap-2.5 p-3 rounded-lg text-xs sm:text-sm',
        'bg-red-50/80 border border-red-200/80 text-red-800 animate-in fade-in duration-200',
        className
      )}
    >
      <AlertCircle className="w-4 h-4 text-[#ED2A2B] mt-0.5 flex-shrink-0" />
      <div className="flex-1 leading-snug">{message}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-red-500 hover:text-red-700 p-0.5 -mr-1 -mt-1 rounded hover:bg-red-100/50 transition-colors"
          aria-label="Dismiss error"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}
