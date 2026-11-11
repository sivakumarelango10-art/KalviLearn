import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { fetchContentManagerProfile, ContentManagerProfile } from '@/lib/contentManagerService'
import { ContentPermission, hasContentPermission } from '@/lib/contentPermissions'

interface ContentManagerContextValue {
  profile: ContentManagerProfile | null
  loading: boolean
  error: string | null
  hasPermission: (perm: ContentPermission) => boolean
  setProfileData: (p: ContentManagerProfile | null) => void
  refreshProfile: () => Promise<ContentManagerProfile | null>
}

const ContentManagerContext = createContext<ContentManagerContextValue | undefined>(undefined)

export const ContentManagerProvider: React.FC<{
  initialProfile?: ContentManagerProfile | null
  children: React.ReactNode
}> = ({ initialProfile = null, children }) => {
  const [profile, setProfile] = useState<ContentManagerProfile | null>(initialProfile)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refreshProfile = useCallback(async () => {
    setLoading(true)
    setError(null)
    const res = await fetchContentManagerProfile()
    setLoading(false)
    if (res.success && res.data) {
      setProfile(res.data)
      return res.data
    }
    setProfile(null)
    setError(res.error || 'Content Manager authorization failed.')
    return null
  }, [])

  const hasPermission = useCallback(
    (perm: ContentPermission) => hasContentPermission(profile?.permissions, perm),
    [profile?.permissions]
  )

  const value = useMemo(
    () => ({
      profile,
      loading,
      error,
      hasPermission,
      setProfileData: setProfile,
      refreshProfile,
    }),
    [profile, loading, error, hasPermission, refreshProfile]
  )

  return <ContentManagerContext.Provider value={value}>{children}</ContentManagerContext.Provider>
}

export function useContentManager() {
  const ctx = useContext(ContentManagerContext)
  if (!ctx) {
    throw new Error('useContentManager must be used within a ContentManagerProvider')
  }
  return ctx
}
