import { type FC } from 'react'
import { cn } from '@/lib/utils'

interface LoginHeaderProps {
  className?: string
}

/**
 * Header section of the Login interface
 * Displays the primary academic welcome heading and brand motto.
 */
export const LoginHeader: FC<LoginHeaderProps> = ({ className }) => {
  return (
    <div className={cn('text-center space-y-1.5', className)}>
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900">
        Welcome to Kalvi Learn
      </h1>
      <p className="text-xs sm:text-sm text-neutral-500 font-normal">
        Learn. Practice. Code. Grow.
      </p>
    </div>
  )
}
