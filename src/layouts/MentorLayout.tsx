import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { X } from 'lucide-react'
import { MentorNavbar } from '@/components/mentor/MentorNavbar'
import { MentorSidebar } from '@/components/mentor/MentorSidebar'
import { OfflineBanner } from '@/components/common/OfflineBanner'
import { GlobalFeedbackWidget } from '@/components/feedback/GlobalFeedbackWidget'

export const MentorLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen w-full bg-[#F9FAFB] overflow-hidden font-sans text-neutral-900">
      {/* Offline Status Detection */}
      <OfflineBanner />

      {/* Top Header: Kalvi Learn Mentor + Rahul Profile Dropdown */}
      <MentorNavbar onToggleMobileSidebar={() => setMobileOpen(true)} />

      {/* Dual Layout: Sidebar + Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex flex-shrink-0 h-full">
          <MentorSidebar />
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
              <MentorSidebar onCloseMobile={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
          <Outlet />
        </main>
      </div>

      {/* Global Feedback & Support Widget */}
      <GlobalFeedbackWidget portal="MENTOR" />
    </div>
  )
}
