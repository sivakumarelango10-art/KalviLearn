import React, { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import { useContentManager } from '@/contexts/ContentManagerContext'
import { fetchCmCurriculumModules } from '@/lib/contentManagerService'
import { SuperAdminQuestionsPage } from '@/pages/super-admin/SuperAdminQuestionsPage'

export const ContentManagerQuestionsPage: React.FC = () => {
  const { profile, hasPermission } = useContentManager()
  const [scopedUnits, setScopedUnits] = useState<Array<{ id: string; title: string; moduleId?: string }>>([])

  useEffect(() => {
    document.title = 'KalviLearn — Coding Questions Studio'
    fetchCmCurriculumModules().then((res) => {
      if (res.success && res.data?.modules) {
        const units: Array<{ id: string; title: string; moduleId?: string }> = []
        for (const m of res.data.modules) {
          for (const u of m.learningUnits || []) {
            units.push({
              id: u.id,
              title: `M${m.order}: ${m.title} → ${u.title}`,
              moduleId: m.id,
            })
          }
        }
        setScopedUnits(units)
      }
    })
  }, [])

  if (!hasPermission('content.question.view')) {
    return (
      <div className="p-8 rounded-2xl border border-[#681717] bg-[#1F0B0B]/30 text-center space-y-3">
        <Lock className="w-8 h-8 text-[#FF6266] mx-auto" />
        <h2 className="text-lg font-bold text-white">Coding Questions Access Restricted</h2>
        <p className="text-sm text-neutral-400">
          Your assignment does not include the <code className="text-[#FF6266]">content.question.view</code> permission.
        </p>
      </div>
    )
  }

  return (
    <SuperAdminQuestionsPage
      apiMode="content-manager"
      grantedPermissions={profile?.permissions || []}
      scopedUnits={scopedUnits}
      customTitle="Coding Questions Studio"
      customDescription="Create, edit, test, and submit coding problems with full 7-tab editor support within your authorized curriculum scope."
    />
  )
}
