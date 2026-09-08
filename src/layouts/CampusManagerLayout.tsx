import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { CampusManagerSidebar } from '@/components/campus/CampusManagerSidebar'
import { OfflineBanner } from '@/components/common/OfflineBanner'
import { GlobalFeedbackWidget } from '@/components/feedback/GlobalFeedbackWidget'

export const CampusManagerLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex h-screen w-full bg-neutral-50 overflow-hidden font-sans text-neutral-900">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex flex-shrink-0 h-full">
        <CampusManagerSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-50 shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-neutral-800 rounded-lg hover:bg-neutral-100"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
            <CampusManagerSidebar onCloseMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="lg:hidden h-14 bg-white border-b border-neutral-200/80 px-4 flex items-center justify-between flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-1.5 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-extrabold text-sm tracking-tight text-neutral-900">
              Kalvi<span className="text-[#ED2A2B]">Learn</span>
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-[#ED2A2B] border border-red-200 uppercase tracking-wider">
            Manager
          </span>
        </header>

        {/* Offline Status Detection */}
        <OfflineBanner />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-neutral-50/60">
          <div key={location.pathname} className="animate-page-enter min-h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Feedback & Support Widget */}
      <GlobalFeedbackWidget portal="CAMPUS_MANAGER" />
    </div>
  )
}

