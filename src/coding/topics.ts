import {
  Variable,
  Calculator,
  GitBranch,
  Repeat,
  Layers,
  Braces,
  Eye,
  List,
  Type,
  Grid,
  Search,
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
  Terminal,
  GitMerge,
} from 'lucide-react'
import type { CodingTopic } from './types'

/**
 * Authoritative Centralized Configuration for all 24 Coding Topics.
 * Normalizes source titles to student-facing UI titles.
 * NEVER exposes question counts.
 */
export const CODING_TOPICS: CodingTopic[] = [
  {
    id: 'variables-data-types',
    title: 'Variables & Data Types',
    sourceTitle: 'Variables & Data Types',
    description: 'Understand variables, values, types, conversions, and data representation.',
    icon: Variable,
  },
  {
    id: 'basic-arithmetic-operations',
    title: 'Basic Arithmetic Operations',
    sourceTitle: 'Basic Arithmetic Operations',
    description: 'Strengthen arithmetic reasoning using operators and mathematical expressions.',
    icon: Calculator,
  },
  {
    id: 'conditionals-control-flow',
    title: 'Conditionals / Control Flow',
    sourceTitle: 'Conditionals / Control Flow',
    description: 'Practice decision-making using conditions and logical control flow.',
    icon: GitBranch,
  },
  {
    id: 'loops',
    title: 'Loops',
    sourceTitle: 'Loops',
    description: 'Build repetition-based solutions using iterative programming.',
    icon: Repeat,
  },
  {
    id: 'nested-loops',
    title: 'Nested Loops',
    sourceTitle: 'Nested Loops',
    description: 'Solve problems requiring multiple levels of iteration.',
    icon: Layers,
  },
  {
    id: 'functions',
    title: 'Functions',
    sourceTitle: 'Functions',
    description: 'Practice reusable logic through function-based programming.',
    icon: Braces,
  },
  {
    id: 'scope',
    title: 'Scope',
    sourceTitle: 'Scope',
    description: 'Understand variable visibility, lifetime, and scope behavior.',
    icon: Eye,
  },
  {
    id: 'arrays-1d-lists',
    title: '1D Arrays / Lists',
    sourceTitle: '1D Arrays / Lists',
    description: 'Solve array and list traversal, manipulation, and reasoning problems.',
    icon: List,
  },
  {
    id: 'strings-as-arrays',
    title: 'Strings as Arrays',
    sourceTitle: 'Strings as Arrays',
    description: 'Work with strings as character sequences and solve character-level problems.',
    icon: Type,
  },
  {
    id: 'arrays-2d-matrices',
    title: '2D Arrays / Matrices',
    sourceTitle: '2D Arrays / Matrices',
    description: 'Practice grids, matrices, rows, columns, and matrix operations.',
    icon: Grid,
  },
  {
    id: 'linear-search',
    title: 'Linear Search',
    sourceTitle: 'Linear Search',
    description: 'Search sequential data using straightforward traversal.',
    icon: Search,
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    sourceTitle: 'Binary Search',
    description: 'Solve ordered search and search-space problems efficiently.',
    icon: Split,
  },
  {
    id: 'sorting',
    title: 'Sorting',
    sourceTitle: 'Sorting',
    description: 'Practice arranging and processing data using sorting techniques.',
    icon: ArrowUpDown,
  },
  {
    id: 'sets',
    title: 'Sets',
    sourceTitle: 'Sets',
    description: 'Work with uniqueness, membership, union, intersection, and set operations.',
    icon: Shapes,
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    sourceTitle: 'Two-Pointer Techniques',
    description: 'Solve sequence problems using coordinated pointer movement.',
    icon: ArrowLeftRight,
  },
  {
    id: 'dictionaries-hash-maps',
    title: 'Dictionaries / Hash Maps',
    sourceTitle: 'Dictionaries / Hash Maps',
    description: 'Use key-value structures for fast lookup, counting, and grouping.',
    icon: Key,
  },
  {
    id: 'recursion',
    title: 'Recursion',
    sourceTitle: 'Recursion',
    description: 'Build solutions by breaking a problem into recursive subproblems.',
    icon: RotateCw,
  },
  {
    id: 'trees-bst',
    title: 'Trees / BST',
    sourceTitle: 'Trees / BST',
    description: 'Practice tree traversal, binary trees, BST operations, and tree reasoning.',
    icon: Network,
  },
  {
    id: 'graphs',
    title: 'Graphs',
    sourceTitle: 'Graphs',
    description: 'Solve traversal, connectivity, path, component, and graph-algorithm problems.',
    icon: Share2,
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    sourceTitle: 'Dynamic Programming',
    description: 'Solve overlapping-subproblem and optimization problems with DP.',
    icon: Cpu,
  },
  {
    id: 'dsa-algorithms',
    title: 'DSA Algorithms',
    sourceTitle: 'DSA Algorithms',
    description: 'Practice common data structures and algorithmic techniques.',
    icon: Binary,
  },
  {
    id: 'oop-classes-objects',
    title: 'OOP — Classes & Objects',
    sourceTitle: 'OOP — Classes & Objects',
    description: 'Practice object-oriented modeling using classes and objects.',
    icon: Boxes,
  },
  {
    id: 'oop-methods',
    title: 'OOP — Methods',
    sourceTitle: 'OOP — Methods',
    description: 'Model object behavior through methods and encapsulation.',
    icon: Terminal,
  },
  {
    id: 'oop-inheritance',
    title: 'OOP — Inheritance',
    sourceTitle: 'OOP — Inheritance',
    description: 'Practice inheritance, derived classes, and reusable object hierarchies.',
    icon: GitMerge,
  },
]

/**
 * Fast lookup map from topic ID to CodingTopic
 */
export const CODING_TOPICS_BY_ID = new Map<string, CodingTopic>(
  CODING_TOPICS.map((topic) => [topic.id, topic])
)

/**
 * Normalization map to resolve raw source headings into authoritative topic config.
 */
export const SOURCE_TOPIC_LOOKUP = new Map<string, CodingTopic>()
for (const topic of CODING_TOPICS) {
  SOURCE_TOPIC_LOOKUP.set(topic.sourceTitle.toLowerCase(), topic)
  SOURCE_TOPIC_LOOKUP.set(topic.title.toLowerCase(), topic)
  SOURCE_TOPIC_LOOKUP.set(topic.id.toLowerCase(), topic)
}

export function normalizeTopicTitle(rawTitle: string): CodingTopic | undefined {
  const cleaned = rawTitle
    .replace(/^#\s*/, '')
    .trim()

  const direct = SOURCE_TOPIC_LOOKUP.get(cleaned.toLowerCase())
  if (direct) return direct

  // Check with standardized dashes
  const normalizedDashes = cleaned.replace(/[—–]/g, '-').toLowerCase()
  for (const [key, topic] of SOURCE_TOPIC_LOOKUP.entries()) {
    if (key.replace(/[—–]/g, '-') === normalizedDashes) {
      return topic
    }
  }

  return undefined
}
