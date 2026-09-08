import React from 'react'
import {
  Bug,
  Lightbulb,
  MessageSquare,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  X,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
import { FeedbackType } from '@/services/feedbackService'
import { useAuth } from '@/contexts/AuthContext'

interface FeedbackMenuProps {
  onSelectType: (type: FeedbackType) => void
  onClose: () => void
  portal?: string
}

interface MenuOption {
  type: FeedbackType
  label: string
  description: string
  icon: React.ElementType
  badgeColor?: string
}

const MENU_OPTIONS: MenuOption[] = [
  {
    type: 'BUG',
    label: 'Report a Bug',
    description: 'Something is broken or not working as expected',
    icon: Bug,
    badgeColor: 'text-red-600 bg-red-50 border-red-200',
  },
  {
    type: 'FEATURE_REQUEST',
    label: 'Suggest a Feature',
    description: 'Propose a new capability or learning tool',
    icon: Lightbulb,
    badgeColor: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    type: 'FEEDBACK',
    label: 'Give Feedback',
    description: 'Share your thoughts and rating on KalviLearn',
    icon: MessageSquare,
    badgeColor: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    type: 'ISSUE',
    label: 'Report an Issue',
    description: 'Problems with content, curriculum, or account',
    icon: AlertTriangle,
    badgeColor: 'text-orange-600 bg-orange-50 border-orange-200',
  },
  {
    type: 'IMPROVEMENT',
    label: 'Suggest an Improvement',
    description: 'Ideas to refine or enhance an existing feature',
    icon: Sparkles,
    badgeColor: 'text-purple-600 bg-purple-50 border-purple-200',
  },
  {
    type: 'OTHER',
    label: 'Other',
    description: 'General inquiries or other platform feedback',
    icon: HelpCircle,
    badgeColor: 'text-neutral-600 bg-neutral-100 border-neutral-200',
  },
]

export const FeedbackMenu: React.FC<FeedbackMenuProps> = ({ onSelectType, onClose, portal }) => {
  const { user } = useAuth()

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-200">
      {/* Menu Header */}
      <div className="px-5 py-4 border-b border-[#e5e7eb] flex items-center justify-between bg-[#fafafa]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#191c1e] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 id="feedback-dialog-title" className="text-sm sm:text-base font-bold text-[#191c1e] leading-tight">
              Feedback & Support
            </h2>
            <p className="text-[11px] text-[#5d5e64]">
              How can we help you today?
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close feedback menu"
          className="p-1.5 rounded-lg text-[#5d5e64] hover:text-black hover:bg-[#edeef0] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Menu Options List */}
      <div className="p-4 space-y-2 overflow-y-auto max-h-[68vh] sm:max-h-[60vh]">
        {MENU_OPTIONS.map((option) => {
          const Icon = option.icon
          return (
            <button
              key={option.type}
              type="button"
              onClick={() => onSelectType(option.type)}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-[#e5e7eb] bg-white hover:bg-[#f8f9fb] hover:border-neutral-300 transition-all text-left group cursor-pointer shadow-2xs hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-black"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${option.badgeColor}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-[#191c1e] group-hover:text-black leading-snug">
                    {option.label}
                  </h3>
                  <p className="text-[11px] text-[#5d5e64] line-clamp-1">
                    {option.description}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#9ca3af] group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </button>
          )
        })}
      </div>

      {/* Context Footer */}
      <div className="p-3 bg-[#fafafa] border-t border-[#e5e7eb] flex items-center justify-between text-[11px] text-[#5d5e64]">
        <div className="flex items-center gap-1.5 truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="truncate">
            Authenticated as <strong className="text-[#191c1e] font-semibold">{user?.name || user?.email || 'User'}</strong>
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-[#e5e7eb] font-bold text-[#191c1e] shrink-0">
          {portal || (user?.role ? user.role.toUpperCase() : 'PORTAL')}
        </span>
      </div>
    </div>
  )
}
