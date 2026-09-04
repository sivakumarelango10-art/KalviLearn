import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Send,
  Users,
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MentorWelcomeHeroProps {
  mentorName: string
  totalStudents: number
  activeStudents: number
  studentsNeedingAttention: number
  cohortMasteryPercent?: number
  className?: string
}

/**
 * MentorWelcomeHero
 *
 * Implements the Kalvi Learn dark hero design system for the Mentor Panel.
 * Uses the exact visual aesthetics from the Student Portal:
 * - Rounded dark gradient container
 * - Ambient Kalvi red glow accent
 * - Top pill badge: "Kalvi Learn Mentor Platform"
 * - Dynamic "Welcome back, [Mentor Name]" heading
 * - Primary red CTA ("View Students →") and secondary CTA ("Live Submissions")
 * - Translucent right-side mentor cohort telemetry card with SVG circular ring
 */
export const MentorWelcomeHero: React.FC<MentorWelcomeHeroProps> = ({
  mentorName,
  totalStudents,
  activeStudents,
  studentsNeedingAttention,
  cohortMasteryPercent = 77,
  className,
}) => {
  // SVG Ring Calculations (circumference for radius 38 is ~238.76)
  const ringCircumference = 238.76
  const strokeDashoffset =
    ringCircumference - (ringCircumference * Math.min(100, Math.max(0, cohortMasteryPercent))) / 100

  return (
    <section
      aria-label="Mentor Welcome Banner"
      className={cn(
        'bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-neutral-800 relative overflow-hidden',
        className
      )}
    >
      {/* Subtle Kalvi red ambient glow on top-right */}
      <div
        className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-[#ED2A2B]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Mentor Welcome & Actions */}
        <div className="space-y-3 max-w-xl">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15">
            <span>Kalvi Learn Mentor Platform</span>
          </div>

          {/* Dynamic Welcome Heading */}
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {mentorName}
          </h1>

          {/* Supporting Text */}
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Guide your students, review their progress, and help them master their learning journey across Belt algorithms and curriculum milestones.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {/* Primary Action: View Students */}
            <Link
              to="/mentor/students"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-sm font-semibold shadow-sm transition-all interactive-btn hover:shadow-lg hover:shadow-red-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900"
            >
              <span>View Students</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary Action: Live Submissions */}
            <Link
              to="/mentor/submissions"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-sm font-medium transition-all interactive-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900"
            >
              <Send className="w-4 h-4" />
              <span>Live Submissions</span>
            </Link>
          </div>
        </div>

        {/* Right-Side Status Card */}
        <div className="flex-shrink-0 bg-neutral-800/60 backdrop-blur border border-neutral-700/60 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6 interactive-card hover:border-neutral-600">
          {/* Circular Mastery SVG Ring */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg
              className="w-24 h-24 transform -rotate-90"
              aria-label={`Cohort average mastery: ${cohortMasteryPercent}%`}
            >
              <circle
                cx="48"
                cy="48"
                r="38"
                stroke="currentColor"
                strokeWidth="8"
                className="text-neutral-700"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r="38"
                stroke="#ED2A2B"
                strokeWidth="8"
                strokeDasharray={ringCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute text-center select-none pointer-events-none">
              <span className="text-xl font-bold text-white">{cohortMasteryPercent}%</span>
              <span className="block text-[9px] uppercase tracking-wider text-neutral-400">
                Mastery
              </span>
            </div>
          </div>

          {/* Mentor Telemetry Column */}
          <div className="space-y-2 text-center sm:text-left">
            <div>
              <div className="text-xs text-neutral-400 font-medium">Cohort Status</div>
              <div className="text-lg font-bold flex items-center gap-1.5 justify-center sm:justify-start text-white">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>{activeStudents} Active Scholars</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-neutral-300">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-neutral-400" />
                <span className="font-semibold">{totalStudents} Enrolled</span>
              </div>
              <div className="flex items-center gap-1">
                {studentsNeedingAttention > 0 ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-amber-300">
                      {studentsNeedingAttention} Attention
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-emerald-300">All on track</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
