import type { LucideIcon } from 'lucide-react'
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

// Authoritative Centralized Configuration for all 24 Learn Coding Topics.
export interface LearnCodingTopic {
  id: string
  slug: string
  title: string
  description: string
  order: number
  icon: LucideIcon
}

export const LEARN_CODING_TOPICS: LearnCodingTopic[] = [
  {
    id: "variables-data-types",
    slug: "variables-data-types",
    title: "Variables & Data Types",
    description: "Understand variables, values, types, conversions, and data representation.",
    order: 1,
    icon: Variable,
  },
  {
    id: "basic-arithmetic-operations",
    slug: "basic-arithmetic-operations",
    title: "Basic Arithmetic Operations",
    description: "Strengthen arithmetic reasoning using operators and mathematical expressions.",
    order: 2,
    icon: Calculator,
  },
  {
    id: "conditionals-control-flow",
    slug: "conditionals-control-flow",
    title: "Conditionals / Control Flow",
    description: "Practice decision-making using conditions and logical control flow.",
    order: 3,
    icon: GitBranch,
  },
  {
    id: "loops",
    slug: "loops",
    title: "Loops",
    description: "Build repetition-based solutions using iterative programming.",
    order: 4,
    icon: Repeat,
  },
  {
    id: "nested-loops",
    slug: "nested-loops",
    title: "Nested Loops",
    description: "Solve problems requiring multiple levels of iteration.",
    order: 5,
    icon: Layers,
  },
  {
    id: "functions",
    slug: "functions",
    title: "Functions",
    description: "Practice reusable logic through function-based programming.",
    order: 6,
    icon: Braces,
  },
  {
    id: "scope",
    slug: "scope",
    title: "Scope",
    description: "Understand variable visibility, lifetime, and scope behavior.",
    order: 7,
    icon: Eye,
  },
  {
    id: "arrays-1d-lists",
    slug: "arrays-1d-lists",
    title: "1D Arrays / Lists",
    description: "Solve array and list traversal, manipulation, and reasoning problems.",
    order: 8,
    icon: List,
  },
  {
    id: "strings-as-arrays",
    slug: "strings-as-arrays",
    title: "Strings as Arrays",
    description: "Work with strings as character sequences and solve character-level problems.",
    order: 9,
    icon: Type,
  },
  {
    id: "arrays-2d-matrices",
    slug: "arrays-2d-matrices",
    title: "2D Arrays / Matrices",
    description: "Practice grids, matrices, rows, columns, and matrix operations.",
    order: 10,
    icon: Grid,
  },
  {
    id: "linear-search",
    slug: "linear-search",
    title: "Linear Search",
    description: "Search sequential data using straightforward traversal.",
    order: 11,
    icon: Search,
  },
  {
    id: "binary-search",
    slug: "binary-search",
    title: "Binary Search",
    description: "Solve ordered search and search-space problems efficiently.",
    order: 12,
    icon: Split,
  },
  {
    id: "sorting",
    slug: "sorting",
    title: "Sorting",
    description: "Practice arranging and processing data using sorting techniques.",
    order: 13,
    icon: ArrowUpDown,
  },
  {
    id: "sets",
    slug: "sets",
    title: "Sets",
    description: "Work with uniqueness, membership, union, intersection, and set operations.",
    order: 14,
    icon: Shapes,
  },
  {
    id: "two-pointers",
    slug: "two-pointers",
    title: "Two Pointers",
    description: "Solve sequence problems using coordinated pointer movement.",
    order: 15,
    icon: ArrowLeftRight,
  },
  {
    id: "dictionaries-hash-maps",
    slug: "dictionaries-hash-maps",
    title: "Dictionaries / Hash Maps",
    description: "Use key-value structures for fast lookup, counting, and grouping.",
    order: 16,
    icon: Key,
  },
  {
    id: "recursion",
    slug: "recursion",
    title: "Recursion",
    description: "Build solutions by breaking a problem into recursive subproblems.",
    order: 17,
    icon: RotateCw,
  },
  {
    id: "trees-bst",
    slug: "trees-bst",
    title: "Trees / BST",
    description: "Practice tree traversal, binary trees, BST operations, and tree reasoning.",
    order: 18,
    icon: Network,
  },
  {
    id: "graphs",
    slug: "graphs",
    title: "Graphs",
    description: "Solve traversal, connectivity, path, component, and graph-algorithm problems.",
    order: 19,
    icon: Share2,
  },
  {
    id: "dynamic-programming",
    slug: "dynamic-programming",
    title: "Dynamic Programming",
    description: "Solve overlapping-subproblem and optimization problems with DP.",
    order: 20,
    icon: Cpu,
  },
  {
    id: "dsa-algorithms",
    slug: "dsa-algorithms",
    title: "DSA Algorithms",
    description: "Practice common data structures and algorithmic techniques.",
    order: 21,
    icon: Binary,
  },
  {
    id: "oop-classes-objects",
    slug: "oop-classes-objects",
    title: "OOP — Classes & Objects",
    description: "Practice object-oriented modeling using classes and objects.",
    order: 22,
    icon: Boxes,
  },
  {
    id: "oop-methods",
    slug: "oop-methods",
    title: "OOP — Methods",
    description: "Model object behavior through methods and encapsulation.",
    order: 23,
    icon: Terminal,
  },
  {
    id: "oop-inheritance",
    slug: "oop-inheritance",
    title: "OOP — Inheritance",
    description: "Practice inheritance, derived classes, and reusable object hierarchies.",
    order: 24,
    icon: GitMerge,
  },
]

export const LEARN_CODING_TOPICS_BY_SLUG = new Map<string, LearnCodingTopic>(
  LEARN_CODING_TOPICS.map((t) => [t.slug.toLowerCase(), t])
)

export function getAllLearnTopics(): LearnCodingTopic[] {
  return LEARN_CODING_TOPICS
}

export function getLearnTopic(slugOrId?: string): LearnCodingTopic | undefined {
  if (!slugOrId) return undefined
  return LEARN_CODING_TOPICS_BY_SLUG.get(slugOrId.toLowerCase())
}

export function searchLearnTopics(query: string): LearnCodingTopic[] {
  const q = query.trim().toLowerCase()
  if (!q) return LEARN_CODING_TOPICS
  return LEARN_CODING_TOPICS.filter(
    (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
  )
}
