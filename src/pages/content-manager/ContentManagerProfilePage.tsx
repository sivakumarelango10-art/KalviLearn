import React, { useEffect } from 'react'
import { UserCheck, Shield, Globe, Lock, CheckCircle2, XCircle, RefreshCw } from 'lucide-react'
import { useContentManager } from '@/contexts/ContentManagerContext'
import { CONTENT_PERMISSION_CATALOG } from '@/lib/contentPermissions'

export const ContentManagerProfilePage: React.FC = () => {
  const { profile, loading, refreshProfile, hasPermission } = useContentManager()

  useEffect(() => {
    document.title = 'KalviLearn — Content Manager Profile'
  }, [])

  const categories = Array.from(new Set(CONTENT_PERMISSION_CATALOG.map((p) => p.category)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-[#FF6266]" />
            <h1 className="text-2xl font-bold text-white tracking-tight">My Profile & Access Policy</h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Review your active Content Manager identity, curriculum scope, and granular permissions.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refreshProfile()}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#080808] border border-white/10 hover:border-white/20 text-xs font-medium text-neutral-300"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF6266]' : ''}`} />
          Sync Permissions
        </button>
      </div>

      {/* Identity Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 p-5 rounded-2xl bg-[#080808] border border-white/10 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">Account Identity</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
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

        <div className="p-5 rounded-2xl bg-[#080808] border border-white/10 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">Assigned Scope</div>
          <div className="flex items-center gap-2">
            {profile?.scopeType === 'GLOBAL' ? (
              <Globe className="w-5 h-5 text-emerald-400" />
            ) : profile?.scopeType === 'SCOPED' ? (
              <Shield className="w-5 h-5 text-amber-400" />
            ) : (
              <Lock className="w-5 h-5 text-[#FF6266]" />
            )}
            <span className="text-base font-bold text-white">{profile?.scopeType || 'NONE'}</span>
          </div>
          {profile?.scopeType === 'SCOPED' && (
            <div className="text-xs text-neutral-400 space-y-1">
              <div>Modules assigned: <strong className="text-white">{profile.assignedModuleIds.length}</strong></div>
              <div>Learning units assigned: <strong className="text-white">{profile.assignedLearningUnitIds.length}</strong></div>
            </div>
          )}
          {profile?.scopeType === 'GLOBAL' && (
            <p className="text-xs text-neutral-400">Global access across all curriculum modules and lessons.</p>
          )}
          {profile?.scopeType === 'NONE' && (
            <p className="text-xs text-[#FF6266]">Restricted: No curriculum scope assigned.</p>
          )}
        </div>
      </div>

      {/* Granular Permission Matrix */}
      <div className="p-5 rounded-2xl bg-[#080808] border border-white/10 space-y-5">
        <div>
          <h2 className="text-base font-bold text-white">Granular Permission Matrix</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Permissions are enforced server-side on every request. Destructive and direct-publish privileges remain disabled unless explicitly granted by the Super Admin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat} className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF6266]">{cat}</div>
              <div className="space-y-2">
                {CONTENT_PERMISSION_CATALOG.filter((p) => p.category === cat).map((perm) => {
                  const granted = hasPermission(perm.id)
                  return (
                    <div key={perm.id} className="flex items-start justify-between gap-2 text-xs">
                      <div>
                        <div className={granted ? 'text-white font-medium' : 'text-neutral-500'}>
                          {perm.label}
                        </div>
                        <div className="text-[10px] font-mono text-neutral-500">{perm.id}</div>
                      </div>
                      {granted ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-800/60 text-[10px] font-semibold shrink-0">
                          <CheckCircle2 className="w-3 h-3" /> Granted
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-900 text-neutral-500 border border-neutral-800 text-[10px] font-semibold shrink-0">
                          <XCircle className="w-3 h-3" /> Restricted
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
