import { type FC } from 'react'
import { cn } from '@/lib/utils'

interface BrandLogoProps {
  className?: string
  iconClassName?: string
  textClassName?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  orientation?: 'horizontal' | 'vertical'
  showWordmark?: boolean
}

/**
 * Official Kalvi Learn Brand Logo Component
 *
 * Mark: Red geometric emblem matching the official Kalvi brand identity
 * Wordmark: "Kalvi" (Red #ED2A2B) + "Learn" (Black #111827)
 */
export const BrandLogo: FC<BrandLogoProps> = ({
  className,
  iconClassName,
  textClassName,
  size = 'lg',
  orientation = 'vertical',
  showWordmark = true,
}) => {
  const sizeStyles = {
    sm: {
      icon: 'w-7 h-8',
      text: 'text-lg',
      gap: orientation === 'vertical' ? 'gap-2' : 'gap-2.5',
    },
    md: {
      icon: 'w-9 h-11',
      text: 'text-xl',
      gap: orientation === 'vertical' ? 'gap-2.5' : 'gap-3',
    },
    lg: {
      icon: 'w-12 h-14',
      text: 'text-2xl',
      gap: orientation === 'vertical' ? 'gap-3' : 'gap-3.5',
    },
    xl: {
      icon: 'w-16 h-20',
      text: 'text-3xl',
      gap: orientation === 'vertical' ? 'gap-3.5' : 'gap-4',
    },
  }

  const currentSize = sizeStyles[size]

  return (
    <div
      className={cn(
        'inline-flex items-center select-none',
        orientation === 'vertical' ? 'flex-col justify-center text-center' : 'flex-row justify-center',
        currentSize.gap,
        className
      )}
      aria-label="Kalvi Learn"
      role="img"
    >
      {/* Official Kalvi Geometric Emblem */}
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('flex-shrink-0 transition-transform duration-200', currentSize.icon, iconClassName)}
        aria-hidden="true"
      >
        {/* Outer Red Frame */}
        <rect
          x="15"
          y="15"
          width="70"
          height="90"
          stroke="#ED2A2B"
          strokeWidth="11"
          strokeLinejoin="miter"
        />
        {/* Inner Chevron forming Stylized 'K' */}
        <polyline
          points="79.5 20.5 20.5 60 79.5 99.5"
          stroke="#ED2A2B"
          strokeWidth="11"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>

      {/* Brand Wordmark: Kalvi (Red) + Learn (Black) */}
      {showWordmark && (
        <span
          className={cn(
            'font-bold tracking-tight inline-flex items-center',
            currentSize.text,
            textClassName
          )}
        >
          <span className="text-[#ED2A2B]">Kalvi</span>
          <span className="text-neutral-900 ml-1.5 font-semibold">Learn</span>
        </span>
      )}
    </div>
  )
}
