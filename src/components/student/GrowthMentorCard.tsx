import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useGrowthMentor } from '@/hooks/useGrowthMentor'
import { cn } from '@/lib/utils'

interface GrowthMentorCardProps {
  className?: string
}

/**
 * Growth Mentor Section for Student Portal
 *
 * Displays strictly:
 * - Heading: "Growth Mentor"
 * - The assigned mentor's name (or "No Growth Mentor assigned yet")
 *
 * Excludes email, status, ID, dates, or other metadata as required.
 */
export const GrowthMentorCard: React.FC<GrowthMentorCardProps> = ({ className }) => {
  const { user } = useAuth()
  const isMentor = user?.role === 'MENTOR'
  const { mentorName, isLoading, error } = useGrowthMentor(isMentor ? undefined : user?.id)

  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-5 sm:p-5 border border-neutral-200/80 shadow-xs interactive-card',
        className
      )}
    >
      <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
        Growth Mentor
      </h2>

      {isMentor ? (
        <div className="text-sm font-medium text-neutral-500">
          Preview Mode: Not applicable for Mentors
        </div>
      ) : isLoading ? (
        <div className="py-1">
          <div className="h-6 w-36 bg-neutral-100 animate-pulse rounded-lg" />
        </div>
      ) : error ? (
        <div className="text-sm font-medium text-neutral-400">
          Unable to load mentor
        </div>
      ) : mentorName ? (
        <div className="space-y-1">
          <div className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
            {mentorName}
          </div>
        </div>
      ) : (
        <div className="text-sm font-medium text-neutral-500">
          No Growth Mentor assigned yet
        </div>
      )}
    </div>
  )
}

export default GrowthMentorCard
