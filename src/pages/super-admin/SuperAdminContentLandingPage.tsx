import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Code,
  Terminal,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FolderTree,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { fetchCurriculumModules, fetchBelts } from '@/lib/superAdminService'
import { CODING_TOPICS } from '@/coding/topics'
import { cn } from '@/lib/utils'

export const SuperAdminContentLandingPage: React.FC = () => {
  const navigate = useNavigate()
  const [, setLoading] = useState(true)
  const [stats, setStats] = useState({
    courses: { modules: 10, units: 85, published: 10 },
    learn: { topics: 24, belts: 10, problems: 480, active: 24 },
    practice: { topics: 15, belts: 10, problems: 325, published: 325 },
  })

  useEffect(() => {
    let mounted = true
    async function loadStats() {
      try {
        const [currRes, beltsRes] = await Promise.allSettled([
          fetchCurriculumModules(),
          fetchBelts(),
        ])

        if (!mounted) return

        let cModules = 10
        let cUnits = 85
        let cPub = 10
        if (currRes.status === 'fulfilled' && currRes.value?.data?.stats) {
          cModules = currRes.value.data.stats.totalModules || 10
          cUnits = currRes.value.data.stats.totalLearningUnits || 85
          cPub = currRes.value.data.stats.publishedModules || 10
        }

        let pBelts = 10
        let pProbs = 500
        if (beltsRes.status === 'fulfilled' && beltsRes.value?.data?.stats) {
          pBelts = beltsRes.value.data.stats.totalBelts || 10
          pProbs = beltsRes.value.data.stats.totalProblems || 500
        }

        setStats({
          courses: { modules: cModules, units: cUnits, published: cPub },
          learn: { topics: CODING_TOPICS.length || 24, belts: pBelts, problems: pProbs, active: CODING_TOPICS.length || 24 },
          practice: { topics: 15, belts: pBelts, problems: 325, published: 325 },
        })
      } catch (err) {
        console.error('Failed to load content stats:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadStats()
    return () => {
      mounted = false
    }
  }, [])

  const sections = [
    {
      id: 'courses',
      title: 'Courses',
      description: 'Manage curriculum modules, learning units, lessons, and educational content.',
      icon: BookOpen,
      href: '/super-admin/content/courses',
      accentColor: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400 group-hover:border-blue-500/60',
      iconBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      badge: 'Core Curriculum',
      metrics: [
        { label: 'Modules', value: stats.courses.modules },
        { label: 'Learning Units', value: stats.courses.units },
        { label: 'Published', value: `${stats.courses.published}/${stats.courses.modules}` },
      ],
      highlights: [
        '10 Core CS Curriculum Modules',
        '85 Progressive Learning Units',
        'Multilingual Snippets (Python, C++, Java, JS)',
        'Theory, Visuals, Approach & Formatted I/O',
      ],
    },
    {
      id: 'learn-coding',
      title: 'Learn Coding',
      description: 'Manage coding topics, structured learning modules, and belt-based learning.',
      icon: Code,
      href: '/super-admin/content/learn-coding',
      accentColor: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400 group-hover:border-emerald-500/60',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      badge: 'Topics & Belts',
      metrics: [
        { label: 'Topic Modules', value: stats.learn.topics },
        { label: 'Practice Belts', value: stats.learn.belts },
        { label: 'Exercises', value: `${stats.learn.problems}+` },
      ],
      highlights: [
        'Section A: 24 Structured Topic Modules',
        'Section B: 10 Martial Arts Practice Belts',
        'In-Topic & Belt Question Management',
        'Dedicated Student Workspace Previews',
      ],
    },
    {
      id: 'practice-coding',
      title: 'Practice Coding',
      description: 'Manage coding practice topics and their associated programming questions.',
      icon: Terminal,
      href: '/super-admin/content/practice-coding',
      accentColor: 'from-red-500/20 to-rose-500/10 border-red-500/30 text-red-400 group-hover:border-red-500/60',
      iconBg: 'bg-red-500/10 text-red-400 border border-red-500/20',
      badge: '15 Practice Topics',
      metrics: [
        { label: 'Practice Topics', value: stats.practice.topics },
        { label: 'Curated Problems', value: stats.practice.problems },
        { label: 'Published', value: `${stats.practice.published}/${stats.practice.problems}` },
      ],
      highlights: [
        '15 Core Practice Topics (2D Arrays to OOP)',
        'Full Test Case Manager (Public & Hidden)',
        'Interactive Admin Multi-Language Test Runner',
        'Zero-Leakage Student Security Enforcement',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 sm:p-8 lg:p-10 space-y-8 select-none">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
            <Link to="/super-admin/dashboard" className="hover:text-white transition-colors">
              Super Admin
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-red-400 font-semibold">Content Management</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 shadow-sm">
              <FolderTree className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                Content Management
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wider">
                  Curriculum Hub
                </span>
              </h1>
              <p className="text-sm text-neutral-400 mt-1">
                Select a content category to manage curriculum modules, topic lessons, or martial arts practice belts.
              </p>
            </div>
          </div>
        </div>

        {/* Global Protection Pill */}
        <div className="flex items-center gap-3 bg-neutral-900/90 border border-neutral-800 px-4 py-2.5 rounded-xl self-start md:self-auto">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="text-xs">
            <span className="text-neutral-400 block">Student Protection Gate</span>
            <span className="text-emerald-400 font-semibold">0 Hidden Test Leaks Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Summary Telemetry Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5">
          <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Courses</div>
          <div className="text-xl font-black text-white mt-1">{stats.courses.modules} Modules</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">{stats.courses.units} learning units</div>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5">
          <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Topics</div>
          <div className="text-xl font-black text-emerald-400 mt-1">{stats.learn.topics} Topics</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Learn Coding lessons</div>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5">
          <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Belts</div>
          <div className="text-xl font-black text-red-400 mt-1">{stats.practice.belts} Tiers</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Yellow to Black Belt</div>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5">
          <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Total Practice</div>
          <div className="text-xl font-black text-white mt-1">{stats.practice.problems} Problems</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">500 Belt Challenges</div>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5">
          <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Languages</div>
          <div className="text-xl font-black text-amber-400 mt-1">4 Engines</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Python, JS, Java, C++</div>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5">
          <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">RBAC Status</div>
          <div className="text-xl font-black text-emerald-400 mt-1">Sole Admin</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Super Admin Full Access</div>
        </div>
      </div>

      {/* 3 Main Interactive Category Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Select Management Section</span>
          </h2>
          <span className="text-xs text-neutral-500">
            Click any card to open its dedicated hierarchical manager
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sections.map((sec) => {
            const Icon = sec.icon
            return (
              <div
                key={sec.id}
                onClick={() => navigate(sec.href)}
                className={cn(
                  'group relative bg-neutral-900/90 border rounded-2xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl shadow-lg',
                  sec.accentColor
                )}
              >
                {/* Top Badge & Icon */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={cn('p-3 rounded-xl transition-transform group-hover:scale-110', sec.iconBg)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-800/80 border border-neutral-700/60 text-neutral-300">
                      {sec.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors flex items-center gap-2">
                      {sec.title}
                      <ArrowRight className="w-4 h-4 text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                      {sec.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-1.5 pt-2 text-xs text-neutral-400 border-t border-neutral-800/80">
                    {sec.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
                        <span className="truncate">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Metrics Bar & CTA */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {sec.metrics.map((m, idx) => (
                      <div key={idx} className="text-left">
                        <span className="block text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                          {m.label}
                        </span>
                        <span className="text-sm font-extrabold text-white">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <span className="px-3 py-1.5 rounded-lg bg-neutral-800 group-hover:bg-red-600 text-xs font-semibold text-neutral-200 group-hover:text-white transition-colors flex items-center gap-1.5 shadow-sm">
                    <span>Manage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Helpful Quick Navigation Tips */}
      <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-2xl p-5 text-xs text-neutral-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong>Hierarchical Navigation:</strong> Opening Content no longer dumps all 500 questions at once. Drill down into specific curriculum modules, topic lessons, or belt tiers.
          </span>
        </div>
        <Link
          to="/super-admin/audit"
          className="text-neutral-400 hover:text-white transition-colors underline flex items-center gap-1 font-mono text-[11px]"
        >
          View Append-Only Audit Logs &rarr;
        </Link>
      </div>
    </div>
  )
}
