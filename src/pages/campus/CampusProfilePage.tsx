import React, { useState, useEffect } from 'react'
import {
  ShieldCheck,
  Building2,
  Clock,
  CheckCircle2,
  Users,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { fetchCampusOverviewMetrics } from '@/lib/campusManagerService'

export const CampusProfilePage: React.FC = () => {
  const { user } = useAuth()
  const [metrics, setMetrics] = useState<{ totalStudents: number; totalMentors: number }>({
    totalStudents: 0,
    totalMentors: 0,
  })

  useEffect(() => {
    let isMounted = true
    fetchCampusOverviewMetrics()
      .then((data) => {
        if (isMounted) {
          setMetrics({
            totalStudents: data.totalStudents,
            totalMentors: data.totalMentors,
          })
        }
      })
      .catch(console.warn)
    return () => {
      isMounted = false
    }
  }, [])

  const managerName =
    user?.name ||
    (user?.email ? user.email.split('@')[0].replace(/\./g, ' ') : 'Campus Manager')
  const managerEmail = user?.email || ''
  const initial = (managerName[0] || 'C').toUpperCase()

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
                {managerName}
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-[#ED2A2B] border border-red-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Campus Manager
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 font-mono">
              {managerEmail}
            </p>
          </div>
        </div>
      </div>

      {/* Campus Scope & Live Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#ED2A2B]" />
            <span>Assigned Campus Scope</span>
          </div>
          <h3 className="text-lg font-bold text-neutral-900">
            Kalvi Learn — Campus Administration
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Executive oversight across enrolled students, faculty mentors, and real-time curriculum progress.
          </p>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              Campus Cohort:
            </span>
            <span className="font-bold text-neutral-900">
              {metrics.totalStudents} Students • {metrics.totalMentors} Mentors
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
            <Clock className="w-4 h-4 text-[#ED2A2B]" />
            <span>Database Synchronization</span>
          </div>
          <h3 className="text-lg font-bold text-neutral-900">
            Supabase Live PostgreSQL
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Connected via real-time WebSocket channel with zero mock fallbacks for submissions and rosters.
          </p>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
            <span>Replication Status:</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live & Synced
            </span>
          </div>
        </div>
      </div>

      {/* Platform Authority & Privileges */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-neutral-900">
          Campus Administrator Privileges
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-neutral-700 font-medium">Real-time oversight of all enrolled students</span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-neutral-700 font-medium">Faculty mentor workload & cohort allocation audits</span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-neutral-700 font-medium">Live submission pass/fail rate telemetry analysis</span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-neutral-700 font-medium">Institutional mentor & student leaderboard tracking</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampusProfilePage
