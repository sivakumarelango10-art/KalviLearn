import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu, X, ShieldAlert } from 'lucide-react'
import { SuperAdminSidebar } from '@/components/super-admin/SuperAdminSidebar'
import { OfflineBanner } from '@/components/common/OfflineBanner'

export const SuperAdminLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex h-screen w-full bg-neutral-950 overflow-hidden font-sans text-neutral-100">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex flex-shrink-0 h-full">
        <SuperAdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-neutral-900 z-50 shadow-2xl border-r border-neutral-800">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
            <SuperAdminSidebar onCloseMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="lg:hidden h-14 bg-neutral-900 border-b border-neutral-800 px-4 flex items-center justify-between flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-black text-sm tracking-tight text-white">
              Kalvi<span className="text-[#ED2A2B]">Admin</span>
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 uppercase tracking-wider flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" />
            Super Admin
          </span>
        </header>

        {/* Offline Status Detection */}
        <OfflineBanner />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-neutral-950 p-4 sm:p-6 lg:p-8">
          <div key={location.pathname} className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
