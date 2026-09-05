import React, { useState, useEffect } from 'react'
import {
  Megaphone,
  Plus,
  CheckCircle2,
  X,
  Send,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { fetchMentorRoster } from '@/lib/mentorService'

interface AnnouncementItem {
  id: string
  title: string
  content: string
  author: string
  date: string
  priority: 'normal' | 'high' | 'urgent'
  readCount: number
  totalScholars: number
}

const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Weekend Algorithmic Sprint — Belt 2 Mastery',
    content:
      'Scholars targeting Belt 2 promotion must complete the Two-Pointer and Prefix Sum practice sets before Sunday 11:59 PM. Mentor office hours will be held on Saturday from 2:00 PM to 4:00 PM.',
    author: 'Faculty Mentor',
    date: 'Today at 10:15 AM',
    priority: 'high',
    readCount: 2,
    totalScholars: 2,
  },
  {
    id: 'ann-2',
    title: 'Hidden Test Cases Notice: Input Parsing Hygiene',
    content:
      'Ensure input reading in Python and Java accounts for trailing whitespace or multi-token lines without hardcoded edge case returns.',
    author: 'Mentor Team',
    date: 'Yesterday at 4:30 PM',
    priority: 'urgent',
    readCount: 2,
    totalScholars: 2,
  },
  {
    id: 'ann-3',
    title: 'New Problem Sets Released in Belt 3 Dynamic Programming',
    content:
      'We have added new multi-state DP challenges to the Belt 3 catalog. Scholars are encouraged to explore bottom-up tabulation.',
    author: 'Mentor Team',
    date: 'Sep 2, 2026',
    priority: 'normal',
    readCount: 1,
    totalScholars: 2,
  },
]

export const MentorAnnouncementsPage: React.FC = () => {
  const { user } = useAuth()
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS)
  const [totalScholars, setTotalScholars] = useState<number>(2)
  const [showModal, setShowModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newPriority, setNewPriority] = useState<'normal' | 'high' | 'urgent'>('normal')

  useEffect(() => {
    let isMounted = true
    fetchMentorRoster(user?.id).then((students) => {
      if (isMounted && students.length > 0) {
        setTotalScholars(students.length)
        setAnnouncements((prev) =>
          prev.map((a) => ({ ...a, totalScholars: students.length }))
        )
      }
    }).catch(console.warn)
    return () => {
      isMounted = false
    }
  }, [user?.id])

  const authorName = user?.name ? `${user.name} (Mentor)` : 'Faculty Mentor'

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) return

    const item: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      title: newTitle.trim(),
      content: newContent.trim(),
      author: authorName,
      date: 'Just now',
      priority: newPriority,
      readCount: 0,
      totalScholars,
    }

    setAnnouncements([item, ...announcements])
    setNewTitle('')
    setNewContent('')
    setShowModal(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-page-enter">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-50 text-[#ED2A2B] border border-red-100">
              <Megaphone className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Cohort Announcements
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">
            Broadcast updates, contest notices, and mentoring guidelines to your registered students.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs font-semibold shadow-xs transition-all interactive-btn"
        >
          <Plus className="w-4 h-4" />
          <span>New Broadcast</span>
        </button>
      </div>

      {/* Announcements Stream */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3 interactive-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full',
                      ann.priority === 'urgent'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : ann.priority === 'high'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-neutral-100 text-neutral-600'
                    )}
                  >
                    {ann.priority}
                  </span>
                  <span className="text-xs text-neutral-400">•</span>
                  <span className="text-xs text-neutral-400">{ann.date}</span>
                </div>
                <h2 className="text-base font-bold text-neutral-900">{ann.title}</h2>
              </div>

              <div className="text-right text-xs text-neutral-400">
                <span className="font-bold text-neutral-800">{ann.readCount}</span> /{' '}
                {ann.totalScholars} read
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {ann.content}
            </p>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
              <span>Posted by {ann.author}</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Broadcast
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: New Broadcast */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6 relative animate-modal-pop">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                Broadcast New Announcement
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                This notice will be pinned to your students' dashboards and notification feeds.
              </p>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700 block">
                  Announcement Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weekend Algorithmic Sprint"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700 block">
                  Priority Level
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent Action Required</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700 block">
                  Message Content
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type announcement instructions, deadlines, or tips..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100 font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shadow-xs transition-all interactive-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MentorAnnouncementsPage
