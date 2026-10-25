import React from 'react'
import { cn } from '@/lib/utils'

interface BeltCardProps {
  order: number
  name: string
  title: string
  color: string
  solved: number
  total: number
  percentage: number
  isSelected: boolean
  onClick: () => void
}

export const BeltCard: React.FC<BeltCardProps> = ({
  name,
  title,
  color,
  solved,
  total,
  percentage,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'cursor-pointer rounded-xl p-5 border transition-all duration-200 bg-white hover:shadow-md relative overflow-hidden',
        isSelected
          ? 'border-neutral-900 ring-2 ring-neutral-900 shadow-sm'
          : 'border-neutral-200/80 hover:border-neutral-300'
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <span className="font-bold text-neutral-900 text-sm">{name}</span>
        </div>
        {total === 0 ? (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            New problems coming soon
          </span>
        ) : (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
            {solved} / {total} Solved
          </span>
        )}
      </div>

      <div className="text-xs text-neutral-500 font-medium line-clamp-1 mb-3">
        {title}
      </div>

      {/* Progress bar */}
      {total > 0 ? (
        <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
            }}
          />
        </div>
      ) : (
        <div className="text-[11px] text-neutral-400 italic">
          Curated challenges in development
        </div>
      )}
    </div>
  )
}
