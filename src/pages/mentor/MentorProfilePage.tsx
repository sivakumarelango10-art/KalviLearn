import React, { useState, useEffect } from 'react'
import {
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { getMentorProfile, MentorProfile } from '@/lib/mentorService'

export const MentorProfilePage: React.FC = () => {
  const { user } = useAuth()
  const [mentorProfile, setMentorProfile] = useState<MentorProfile | null>(null)

  useEffect(() => {
    let isMounted = true
    if (user?.id) {
      getMentorProfile(user.id)
        .then((profile) => {
          if (isMounted) {
            setMentorProfile(profile)
          }
        })
        .catch(console.warn)
    }
    return () => { isMounted = false }
  }, [user?.id])

  const mentorName =
    mentorProfile?.name || mentorProfile?.user?.name || user?.name || (user?.email ? user.email.split('@')[0].replace(/\./g, ' ') : 'Faculty Mentor')
  const mentorEmail = mentorProfile?.email || mentorProfile?.user?.email || user?.email || ''
  const initial = (mentorName[0] || 'M').toUpperCase()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-page-enter">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 interactive-card">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-neutral-900 to-neutral-700 text-white font-bold text-2xl flex items-center justify-center shadow-xs relative">
            <span>{initial}</span>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white animate-pulse-subtle" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
                {mentorName}
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-[#ED2A2B] border border-red-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Senior Faculty Mentor
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 font-mono">
              {mentorEmail}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Active Mentor Record
          </span>
        </div>
      </div>

      {/* Account Permissions & Scope */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-neutral-900">
          Platform Permissions & Privileges
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-neutral-700 font-medium">Inspect all student code submissions</span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-neutral-700 font-medium">View hidden test cases benchmark metrics</span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-neutral-700 font-medium">Broadcast cohort announcements & hints</span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-neutral-700 font-medium">Full access to Belt 1, 2, and 3 analytics</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentorProfilePage
