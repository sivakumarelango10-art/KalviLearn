import React, { useState, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Terminal,
  ArrowLeft,
  Search,
  Grid,
  Split,
  ArrowUpDown,
  Shapes,
  ArrowLeftRight,
  Key,
  RotateCw,
  Network,
  Share2,
  Cpu,
  Binary,
  Boxes,
  GitMerge,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Edit2,
  X,
  Variable,
  Calculator,
  GitBranch,
  Repeat,
  Layers,
  Braces,
  Eye,
  List,
  Type,
  LucideIcon,
} from 'lucide-react'
import { SuperAdminQuestionsPage } from './SuperAdminQuestionsPage'
import { cn } from '@/lib/utils'

export interface PracticeTopicItem {
  id: string
  title: string
  sourceTitle: string
  description: string
  icon: LucideIcon
  problemCount: number
  publishedCount: number
  draftCount: number
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed'
  isReference: boolean
}

// 15 Reference Practice Topics + 9 Additional Application Topics (Total: 24)
const ALL_PRACTICE_TOPICS: PracticeTopicItem[] = [
  // 15 Reference Topics from Screenshot
  {
    id: 'arrays-2d-matrices',
    title: '2D Arrays / Matrices',
    sourceTitle: '2D Arrays / Matrices',
    description: 'Practice grids, matrices, rows, columns, and matrix operations.',
    icon: Grid,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Mixed',
    isReference: true,
  },
  {
    id: 'linear-search',
    title: 'Linear Search',
    sourceTitle: 'Linear Search',
    description: 'Search sequential data using straightforward traversal.',
    icon: Search,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Easy',
    isReference: true,
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    sourceTitle: 'Binary Search',
    description: 'Solve ordered search and search-space problems efficiently.',
    icon: Split,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Medium',
    isReference: true,
  },
  {
    id: 'sorting',
    title: 'Sorting',
    sourceTitle: 'Sorting',
    description: 'Practice arranging and processing data using sorting techniques.',
    icon: ArrowUpDown,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Medium',
    isReference: true,
  },
  {
    id: 'sets',
    title: 'Sets',
    sourceTitle: 'Sets',
    description: 'Work with uniqueness, membership, union, intersection, and set operations.',
    icon: Shapes,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Easy',
    isReference: true,
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    sourceTitle: 'Two-Pointer Techniques',
    description: 'Solve sequence problems using coordinated pointer movement.',
    icon: ArrowLeftRight,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Medium',
    isReference: true,
  },
  {
    id: 'dictionaries-hash-maps',
    title: 'Dictionaries / Hash Maps',
    sourceTitle: 'Dictionaries / Hash Maps',
    description: 'Use key-value structures for fast lookup, counting, and grouping.',
    icon: Key,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Medium',
    isReference: true,
  },
  {
    id: 'recursion',
    title: 'Recursion',
    sourceTitle: 'Recursion',
    description: 'Build solutions by breaking a problem into recursive subproblems.',
    icon: RotateCw,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Medium',
    isReference: true,
  },
  {
    id: 'trees-bst',
    title: 'Trees / BST',
    sourceTitle: 'Trees / BST',
    description: 'Practice tree traversal, binary trees, BST operations, and tree reasoning.',
    icon: Network,
    problemCount: 75,
    publishedCount: 75,
    draftCount: 0,
    difficulty: 'Hard',
    isReference: true,
  },
  {
    id: 'graphs',
    title: 'Graphs',
    sourceTitle: 'Graphs',
    description: 'Solve traversal, connectivity, path, component, and graph-algorithm problems.',
    icon: Share2,
    problemCount: 130,
    publishedCount: 130,
    draftCount: 0,
    difficulty: 'Hard',
    isReference: true,
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    sourceTitle: 'Dynamic Programming',
    description: 'Solve overlapping-subproblem and optimization problems with DP.',
    icon: Cpu,
    problemCount: 100,
    publishedCount: 100,
    draftCount: 0,
    difficulty: 'Hard',
    isReference: true,
  },
  {
    id: 'dsa-algorithms',
    title: 'DSA Algorithms',
    sourceTitle: 'DSA Algorithms',
    description: 'Practice common data structures and algorithmic techniques.',
    icon: Binary,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Hard',
    isReference: true,
  },
  {
    id: 'oop-classes-objects',
    title: 'OOP — Classes & Objects',
    sourceTitle: 'OOP — Classes & Objects',
    description: 'Practice object-oriented modeling using classes and objects.',
    icon: Boxes,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Easy',
    isReference: true,
  },
  {
    id: 'oop-methods',
    title: 'OOP — Methods',
    sourceTitle: 'OOP — Methods',
    description: 'Model object behavior through methods and encapsulation.',
    icon: Terminal,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Medium',
    isReference: true,
  },
  {
    id: 'oop-inheritance',
    title: 'OOP — Inheritance',
    sourceTitle: 'OOP — Inheritance',
    description: 'Practice inheritance, derived classes, and reusable object hierarchies.',
    icon: GitMerge,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Medium',
    isReference: true,
  },

  // 9 Additional Application Practice Topics
  {
    id: 'variables-data-types',
    title: 'Variables & Data Types',
    sourceTitle: 'Variables & Data Types',
    description: 'Understand variables, values, types, conversions, and data representation.',
    icon: Variable,
    problemCount: 20,
    publishedCount: 20,
    draftCount: 0,
    difficulty: 'Easy',
    isReference: false,
  },
  {
    id: 'basic-arithmetic-operations',
    title: 'Basic Arithmetic Operations',
    sourceTitle: 'Basic Arithmetic Operations',
    description: 'Strengthen arithmetic reasoning using operators and mathematical expressions.',
    icon: Calculator,
    problemCount: 20,
    publishedCount: 20,
    draftCount: 0,
    difficulty: 'Easy',
    isReference: false,
  },
  {
    id: 'conditionals-control-flow',
    title: 'Conditionals / Control Flow',
    sourceTitle: 'Conditionals / Control Flow',
    description: 'Practice decision-making using conditions and logical control flow.',
    icon: GitBranch,
    problemCount: 20,
    publishedCount: 20,
    draftCount: 0,
    difficulty: 'Easy',
    isReference: false,
  },
  {
    id: 'loops',
    title: 'Loops',
    sourceTitle: 'Loops',
    description: 'Build repetition-based solutions using iterative programming.',
    icon: Repeat,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Easy',
    isReference: false,
  },
  {
    id: 'nested-loops',
    title: 'Nested Loops',
    sourceTitle: 'Nested Loops',
    description: 'Solve problems requiring multiple levels of iteration.',
    icon: Layers,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Medium',
    isReference: false,
  },
  {
    id: 'functions',
    title: 'Functions',
    sourceTitle: 'Functions',
    description: 'Practice reusable logic through function-based programming.',
    icon: Braces,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Easy',
    isReference: false,
  },
  {
    id: 'scope',
    title: 'Scope',
    sourceTitle: 'Scope',
    description: 'Understand variable visibility, lifetime, and scope behavior.',
    icon: Eye,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Easy',
    isReference: false,
  },
  {
    id: 'arrays-1d-lists',
    title: '1D Arrays / Lists',
    sourceTitle: '1D Arrays / Lists',
    description: 'Solve array and list traversal, manipulation, and reasoning problems.',
    icon: List,
    problemCount: 205,
    publishedCount: 205,
    draftCount: 0,
    difficulty: 'Medium',
    isReference: false,
  },
  {
    id: 'strings-as-arrays',
    title: 'Strings as Arrays',
    sourceTitle: 'Strings as Arrays',
    description: 'Work with strings as character sequences and solve character-level problems.',
    icon: Type,
    problemCount: 10,
    publishedCount: 10,
    draftCount: 0,
    difficulty: 'Easy',
    isReference: false,
  },
]

export const SuperAdminPracticeCodingPage: React.FC = () => {
  const { topicId: urlTopicId, beltId: urlBeltId } = useParams<{ topicId?: string; beltId?: string }>()

  const [topics, setTopics] = useState<PracticeTopicItem[]>(ALL_PRACTICE_TOPICS)
  const [topicScope, setTopicScope] = useState<'reference' | 'all'>('reference')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [activeScopedTopic, setActiveScopedTopic] = useState<PracticeTopicItem | null>(null)

  // Edit Modal State
  const [editingTopic, setEditingTopic] = useState<PracticeTopicItem | null>(null)
  const [editForm, setEditForm] = useState({ title: '', description: '' })
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Resolve active topic if passed via URL or inline state
  const selectedTopic = useMemo(() => {
    if (activeScopedTopic) return activeScopedTopic
    const identifier = urlTopicId || urlBeltId
    if (!identifier) return null
    return (
      topics.find(
        (t) =>
          t.id === identifier ||
          t.sourceTitle.toLowerCase() === identifier.toLowerCase() ||
          t.title.toLowerCase() === identifier.toLowerCase()
      ) || null
    )
  }, [urlTopicId, urlBeltId, activeScopedTopic, topics])

  // Total metrics
  const totalProblems = useMemo(() => {
    return topics.reduce((sum, t) => sum + t.problemCount, 0)
  }, [topics])

  const referenceProblems = useMemo(() => {
    return topics.filter((t) => t.isReference).reduce((sum, t) => sum + t.problemCount, 0)
  }, [topics])

  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      const matchesScope = topicScope === 'all' || t.isReference
      const matchesSearch =
        !searchQuery.trim() ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase().trim())
      const matchesDiff =
        selectedDifficulty === 'all' || t.difficulty === selectedDifficulty
      return matchesScope && matchesSearch && matchesDiff
    })
  }, [topics, topicScope, searchQuery, selectedDifficulty])

  const handleOpenEditTopic = (t: PracticeTopicItem) => {
    setEditingTopic(t)
    setEditForm({ title: t.title, description: t.description })
  }

  const handleSaveTopic = () => {
    if (!editingTopic || !editForm.title.trim()) return
    setTopics((prev) =>
      prev.map((t) =>
        t.id === editingTopic.id
          ? { ...t, title: editForm.title.trim(), description: editForm.description.trim() }
          : t
      )
    )
    setSuccessMessage(`Practice topic "${editForm.title}" updated.`)
    setEditingTopic(null)
  }

  // --- SUB-VIEW: SCOPED TOPIC QUESTION MANAGEMENT ---
  if (selectedTopic) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-6 sm:p-8 space-y-6 select-none">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 pb-2 border-b border-neutral-800">
          <Link to="/super-admin/content" className="hover:text-white transition-colors">
            Content
          </Link>
          <span className="text-neutral-600">/</span>
          <button
            onClick={() => {
              setActiveScopedTopic(null)
              window.history.pushState({}, '', '/super-admin/content/practice-coding')
            }}
            className="hover:text-white transition-colors text-neutral-400"
          >
            Practice Coding
          </button>
          <span className="text-neutral-600">/</span>
          <span className="text-red-400 font-semibold truncate">
            {selectedTopic.title}
          </span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-300">Questions</span>
        </nav>

        {/* Action Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <button
            onClick={() => {
              setActiveScopedTopic(null)
              window.history.pushState({}, '', '/super-admin/content/practice-coding')
            }}
            className="hover:text-white transition-colors flex items-center gap-1.5 text-xs text-neutral-400 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Practice Coding Topics</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-red-400 bg-red-950/40 px-2.5 py-1 rounded-full border border-red-800/40">
              {selectedTopic.problemCount} Scoped Questions
            </span>
            <Link
              to="/practice"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-red-400" />
              <span>Preview Arena</span>
            </Link>
          </div>
        </div>

        {/* Scoped Questions Page with full Admin Preview, Student Preview & Test Runner */}
        <SuperAdminQuestionsPage
          initialTopic={selectedTopic.sourceTitle || selectedTopic.title}
          backRoute="/super-admin/content/practice-coding"
          backLabel="Back to Practice Coding"
          customTitle={`Practice Topic: ${selectedTopic.title}`}
          customDescription={`Manage questions, test cases, and difficulty parameters for "${selectedTopic.title}". Only questions for this topic are displayed.`}
        />
      </div>
    )
  }

  // --- MAIN VIEW: TOPIC CARDS DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 sm:p-8 space-y-6 select-none">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
            <Link to="/super-admin/content" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Content Hub</span>
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-red-400 font-semibold">Practice Coding</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">
                Practice Coding Management
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Manage coding practice questions organized by topics and categories. Select a topic to view its questions.
              </p>
            </div>
          </div>
        </div>

        {/* Student Protection Pill */}
        <div className="flex items-center gap-3 bg-neutral-900/90 border border-neutral-800 px-4 py-2 rounded-xl self-start sm:self-auto">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">Evaluation Security</span>
            <span className="text-emerald-400 font-semibold">Hidden Test Cases 100% Protected</span>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-emerald-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Reference Topics</span>
          <div className="text-2xl font-black text-white mt-1">15 Topics</div>
          <span className="text-[11px] text-neutral-500">{referenceProblems} Problems</span>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">All App Topics</span>
          <div className="text-2xl font-black text-red-400 mt-1">24 Topics</div>
          <span className="text-[11px] text-neutral-500">{totalProblems} Total Problems</span>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Publication Status</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">100% Active</div>
          <span className="text-[11px] text-neutral-500">Live in Student Arena</span>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Supported Engines</span>
          <div className="text-2xl font-black text-amber-400 mt-1">4 Languages</div>
          <span className="text-[11px] text-neutral-500">Python, JS, Java, C++</span>
        </div>
      </div>

      {/* Search, Scope and Filters Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setTopicScope('reference')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
              topicScope === 'reference'
                ? 'bg-red-600/30 text-red-300 border border-red-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            )}
          >
            Core Practice Topics (15)
          </button>
          <button
            type="button"
            onClick={() => setTopicScope('all')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
              topicScope === 'all'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            )}
          >
            All Practice Topics (24)
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search practice topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1 text-xs shrink-0">
            {(['all', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={cn(
                  'px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors',
                  selectedDifficulty === diff
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                )}
              >
                {diff === 'all' ? 'All' : diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Practice Topic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTopics.map((topic, index) => {
          const Icon = topic.icon

          return (
            <div
              key={topic.id}
              className="group bg-neutral-900/90 border border-neutral-800 hover:border-red-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl shadow-md"
            >
              <div className="space-y-3.5">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
                        Topic {index + 1}
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                        {topic.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenEditTopic(topic)}
                    className="p-1.5 rounded-lg bg-neutral-800/60 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                    title="Edit Topic Details"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                  {topic.description}
                </p>

                {/* Badges */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold text-red-400 bg-red-950/40 border border-red-800/40 px-2.5 py-0.5 rounded-full font-mono">
                    {topic.problemCount} Problems
                  </span>
                  <span
                    className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase',
                      topic.difficulty === 'Easy'
                        ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/50'
                        : topic.difficulty === 'Medium'
                        ? 'bg-amber-950/50 text-amber-400 border border-amber-800/50'
                        : topic.difficulty === 'Hard'
                        ? 'bg-purple-950/50 text-purple-400 border border-purple-800/50'
                        : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                    )}
                  >
                    {topic.difficulty}
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-900/30">
                    Active
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-mono">
                  Full Preview & Runner
                </span>

                <button
                  onClick={() => setActiveScopedTopic(topic)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-semibold transition-all group-hover:bg-red-600 group-hover:text-white shadow-sm"
                >
                  <span>Manage / View Questions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ─── EDIT TOPIC MODAL ─── */}
      {editingTopic && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-red-400" />
                <span>Edit Practice Topic</span>
              </h3>
              <button
                onClick={() => setEditingTopic(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Topic Title *</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                onClick={() => setEditingTopic(null)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTopic}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white shadow-md shadow-red-900/30"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
