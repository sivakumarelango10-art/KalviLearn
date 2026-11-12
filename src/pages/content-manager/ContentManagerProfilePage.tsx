import React, { useEffect } from 'react'
import { UserCheck, CheckCircle2, RefreshCw } from 'lucide-react'
import { useContentManager } from '@/contexts/ContentManagerContext'
import { FIXED_CONTENT_MANAGER_AREAS } from '@/lib/contentPermissions'

export const ContentManagerProfilePage: React.FC = () => {
  const { profile, loading, refreshProfile } = useContentManager()

  useEffect(() => {
    document.title = 'KalviLearn — Content Manager Profile'
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-[#FF6266]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">My Profile &amp; Content Access</h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Review your active Content Manager identity and unified educational content authoring capabilities.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refreshProfile()}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#080808] border border-white/10 hover:border-white/20 text-xs font-medium text-neutral-300"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF6266]' : ''}`} />
          Refresh Profile
        </button>
      </div>

      {/* Identity Card */}
      <div className="p-5 rounded-2xl bg-[#080808] border border-white/10 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">Account Identity</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-neutral-500 block">Name</span>
            <span className="text-sm font-semibold text-white">{profile?.name || 'Content Manager'}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Email</span>
            <span className="text-sm font-mono text-white">{profile?.email}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Role</span>
            <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-[#1F0B0B] text-[#FF6266] border border-[#681717] font-mono font-bold text-[11px]">
              {profile?.role || 'CONTENT_MANAGER'}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 block">Granted By / At</span>
            <span className="text-neutral-300">
              {profile?.grantedBy || 'Super Admin'}
              {profile?.grantedAt ? ` · ${new Date(profile.grantedAt).toLocaleDateString()}` : ''}
            </span>
          </div>
        </div>
        {profile?.notes && (
          <div className="pt-2 border-t border-white/10 text-xs text-neutral-400">
            <span className="font-semibold text-neutral-300">Admin Note: </span>
            {profile.notes}
          </div>
        )}
      </div>

      {/* Fixed Content Capabilities */}
      <div className="p-5 rounded-2xl bg-[#080808] border border-white/10 space-y-5">
        <div>
          <h2 className="text-base font-bold text-white">Standard Content Manager Capabilities</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Every active Content Manager automatically receives full authoring access across all three educational content areas. Platform administration, student/mentor management, and security settings remain Super Admin-only.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FIXED_CONTENT_MANAGER_AREAS.map((area) => (
            <div key={area.id} className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF6266]">{area.title}</div>
              <p className="text-[11px] text-neutral-400">{area.description}</p>
              <ul className="space-y-1.5 pt-1">
                {area.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2 text-xs text-neutral-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
