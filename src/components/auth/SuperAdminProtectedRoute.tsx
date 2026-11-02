import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export const SuperAdminProtectedRoute: React.FC = () => {
  const { user, isLoading } = useAuth()
  const [verified, setVerified] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true
    setVerified(null)
    if (!user?.id) return
    supabase.from('users').select('role,status').eq('id',user.id).maybeSingle()
      .then(({data,error}) => {
        if (!active) return
        setVerified(!error && !!data && data.status?.toUpperCase()==='ACTIVE' && data.role?.toUpperCase()==='SUPERADMIN')
      })
    return () => { active = false }
  }, [user?.id])

  if (isLoading || (user && verified === null)) return <div className="min-h-screen bg-[#090909] text-slate-300 flex items-center justify-center text-sm">Verifying administrator access…</div>
  if (!user) return <Navigate to="/login" replace />
  if (!verified) return <Navigate to="/dashboard" replace />
  return <Outlet />
}
