import React, { useEffect, useState } from 'react'
import { fetchCmBelts, fetchCmCurriculumModules } from '@/lib/contentManagerService'
import { FIXED_CONTENT_MANAGER_PERMISSIONS } from '@/lib/contentPermissions'
import { SuperAdminQuestionsPage } from '@/pages/super-admin/SuperAdminQuestionsPage'

interface ContentManagerQuestionsPageProps {
  questionMode?: 'practice' | 'learn-coding' | 'all'
}

export const ContentManagerQuestionsPage: React.FC<ContentManagerQuestionsPageProps> = ({
  questionMode = 'all',
}) => {
  const [units, setUnits] = useState<Array<{ id: string; title: string; moduleId?: string }>>([])
  const [belts, setBelts] = useState<Array<{ id: string; order: number; name: string; title: string }>>([])

  useEffect(() => {
    document.title =
      questionMode === 'practice'
        ? 'KalviLearn — Practice Questions Studio'
        : questionMode === 'learn-coding'
          ? 'KalviLearn — Learn Coding Questions Studio'
          : 'KalviLearn — Coding Questions Studio'

    if (questionMode !== 'practice') {
      fetchCmCurriculumModules().then((res) => {
        if (res.success && res.data?.modules) {
          const collected: Array<{ id: string; title: string; moduleId?: string }> = []
          for (const m of res.data.modules) {
            for (const u of m.learningUnits || []) {
              collected.push({
                id: u.id,
                title: `M${m.order}: ${m.title} → ${u.title}`,
                moduleId: m.id,
              })
            }
          }
          setUnits(collected)
        }
      })
    }

    if (questionMode !== 'learn-coding') {
      fetchCmBelts().then((res) => {
        if (res.success && res.data) {
          setBelts(res.data)
        }
      })
    }
  }, [questionMode])

  const customTitle =
    questionMode === 'practice'
      ? 'Practice Coding Questions'
      : questionMode === 'learn-coding'
        ? 'Learn Coding Questions'
        : 'Coding Questions Studio'

  const customDescription =
    questionMode === 'practice'
      ? 'View, create, and edit Belt-based Practice coding questions, examples, public/hidden test cases, and starter codes.'
      : questionMode === 'learn-coding'
        ? 'View, create, and edit coding questions attached to Learning Units with full 7-tab authoring and test execution.'
        : 'Create, edit, test, and publish coding questions across Practice Belts and Learn Coding lessons.'

  return (
    <SuperAdminQuestionsPage
      apiMode="content-manager"
      questionMode={questionMode}
      grantedPermissions={FIXED_CONTENT_MANAGER_PERMISSIONS}
      scopedUnits={questionMode === 'practice' ? [] : units}
      availableBelts={belts}
      customTitle={customTitle}
      customDescription={customDescription}
    />
  )
}
