import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { CampusManagerNavbar } from '@/components/campus/CampusManagerNavbar'
import { CampusManagerSidebar } from '@/components/campus/CampusManagerSidebar'
import { OfflineBanner } from '@/components/common/OfflineBanner'

export const CampusManagerLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex flex-col h-screen w-full bg-neutral-50 overflow-hidden font-sans text-neutral-900">
      {/* Offline Status Detection */}
      <OfflineBanner />

      {/* Top Header: Kalvi Learn + Campus Manager + Profile Dropdown */}
      <CampusManagerNavbar onToggleMobileSidebar={() => setMobileOpen(true)} />

      {/* Split: Sidebar + Content Viewport */}
      <div className="flex-1 flex overflow-hidden">
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

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-neutral-50/60">
          <div key={location.pathname} className="animate-page-enter min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
