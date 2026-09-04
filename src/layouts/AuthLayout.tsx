import { type FC, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AuthLayoutProps {
  children: ReactNode
  className?: string
}

/**
 * Authentication Layout
 *
 * Provides a minimal, full-viewport, distraction-free container.
 * Centered vertically and horizontally across desktop displays,
 * and responsive single-column padding across mobile screens without overflow.
 */
export const AuthLayout: FC<AuthLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8 overflow-x-hidden">
      <main
        className={cn(
          'w-full max-w-md flex flex-col items-center justify-center',
          className
        )}
      >
        {children}
      </main>
    </div>
  )
}
