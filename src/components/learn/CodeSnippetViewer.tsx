import React, { useState, useMemo } from 'react'
import { Check, Copy, Code2, Terminal, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SupportedLanguage = 'python' | 'cpp' | 'java' | 'javascript'

export interface MultilingualSnippets {
  python?: string
  cpp?: string
  java?: string
  javascript?: string
}

interface CodeSnippetViewerProps {
  codeSnippets: MultilingualSnippets
  unitTitle?: string
  defaultLanguage?: SupportedLanguage
  className?: string
}

interface LanguageMeta {
  id: SupportedLanguage
  label: string
  versionTag: string
  badgeClass: string
  dotColor: string
}

const LANGUAGES: LanguageMeta[] = [
  {
    id: 'python',
    label: 'Python',
    versionTag: 'Python 3',
    badgeClass: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    dotColor: '#F59E0B',
  },
  {
    id: 'cpp',
    label: 'C++',
    versionTag: 'C++ 20',
    badgeClass: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    dotColor: '#3B82F6',
  },
  {
    id: 'java',
    label: 'Java',
    versionTag: 'Java 17',
    badgeClass: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    dotColor: '#F97316',
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    versionTag: 'Node.js',
    badgeClass: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    dotColor: '#EAB308',
  },
]

// Language keyword sets
const PYTHON_KEYWORDS = new Set([
  'def', 'class', 'import', 'from', 'return', 'if', 'elif', 'else', 'for', 'while',
  'in', 'is', 'not', 'and', 'or', 'True', 'False', 'None', 'match', 'case', 'break',
  'continue', 'pass', 'try', 'except', 'finally', 'raise', 'with', 'as', 'lambda', 'yield'
])

const CPP_KEYWORDS = new Set([
  'int', 'long', 'double', 'float', 'char', 'bool', 'void', 'string', 'vector',
  'auto', 'cout', 'cin', 'endl', 'return', 'if', 'else', 'for', 'while', 'do',
  'switch', 'case', 'default', 'break', 'continue', 'struct', 'class', 'public',
  'private', 'protected', 'namespace', 'using', 'include', 'new', 'delete', 'const',
  'static', 'template', 'typename', 'pair', 'queue', 'stack', 'set', 'map'
])

const JAVA_KEYWORDS = new Set([
  'int', 'long', 'double', 'float', 'char', 'boolean', 'void', 'String', 'List',
  'ArrayList', 'Map', 'HashMap', 'Set', 'HashSet', 'System', 'out', 'println',
  'print', 'Scanner', 'return', 'if', 'else', 'for', 'while', 'do', 'switch',
  'case', 'default', 'break', 'continue', 'class', 'public', 'private', 'protected',
  'static', 'final', 'new', 'this', 'super', 'import', 'package', 'try', 'catch',
  'finally', 'throw', 'throws', 'null', 'true', 'false'
])

const JS_KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
  'switch', 'case', 'default', 'break', 'continue', 'import', 'export', 'from',
  'class', 'new', 'this', 'async', 'await', 'try', 'catch', 'finally', 'throw',
  'typeof', 'instanceof', 'true', 'false', 'null', 'undefined', 'require', 'console',
  'log', 'Array', 'Map', 'Set', 'Number', 'String', 'Boolean'
])

/**
 * Tokenizes a single code line into styled React spans for beautiful, zero-lag syntax highlighting.
 */
function highlightCodeLine(line: string, lang: SupportedLanguage): React.ReactNode {
  if (!line) return <span>&nbsp;</span>

  // Comments
  // Python single-line comment (# ...)
  if (lang === 'python') {
    const hashIdx = line.indexOf('#')
    if (hashIdx !== -1) {
      // Check if inside a string
      const before = line.substring(0, hashIdx)
      const quoteCount = (before.match(/['"]/g) || []).length
      if (quoteCount % 2 === 0) {
        return (
          <>
            {highlightCodeLine(before, lang)}
            <span className="text-emerald-400/90 italic font-mono">{line.substring(hashIdx)}</span>
          </>
        )
      }
    }
  }

  // C++, Java, JS single-line comment (// ...)
  if (lang === 'cpp' || lang === 'java' || lang === 'javascript') {
    const slashIdx = line.indexOf('//')
    if (slashIdx !== -1) {
      const before = line.substring(0, slashIdx)
      const quoteCount = (before.match(/['"]/g) || []).length
      if (quoteCount % 2 === 0) {
        return (
          <>
            {highlightCodeLine(before, lang)}
            <span className="text-emerald-400/90 italic font-mono">{line.substring(slashIdx)}</span>
          </>
        )
      }
    }
  }

  // Regex to match string literals, words, numbers, and symbols
  const regex = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|[a-zA-Z_]\w*|\b\d+(?:\.\d+)?\b|[^\s\w])/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  const keywords =
    lang === 'python'
      ? PYTHON_KEYWORDS
      : lang === 'cpp'
      ? CPP_KEYWORDS
      : lang === 'java'
      ? JAVA_KEYWORDS
      : JS_KEYWORDS

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(line.substring(lastIndex, match.index))
    }
    const token = match[0]

    // String literals
    if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'")) ||
      (token.startsWith('`') && token.endsWith('`'))
    ) {
      nodes.push(
        <span key={match.index} className="text-emerald-300 font-mono">
          {token}
        </span>
      )
    }
    // Keywords & types
    else if (keywords.has(token)) {
      nodes.push(
        <span key={match.index} className="text-rose-400 font-semibold font-mono">
          {token}
        </span>
      )
    }
    // Numbers
    else if (/^\d+(?:\.\d+)?$/.test(token)) {
      nodes.push(
        <span key={match.index} className="text-amber-300 font-mono">
          {token}
        </span>
      )
    }
    // Punctuation / Operators
    else if (/^[=+\-*/%&|^!<>?:;,.[\](){}]+$/.test(token)) {
      nodes.push(
        <span key={match.index} className="text-sky-300/80 font-mono">
          {token}
        </span>
      )
    }
    // Standard identifier
    else {
      nodes.push(
        <span key={match.index} className="text-neutral-200 font-mono">
          {token}
        </span>
      )
    }

    lastIndex = match.index + token.length
  }

  if (lastIndex < line.length) {
    nodes.push(line.substring(lastIndex))
  }

  return <>{nodes}</>
}

export const CodeSnippetViewer: React.FC<CodeSnippetViewerProps> = ({
  codeSnippets,
  unitTitle: _unitTitle,
  defaultLanguage = 'python',
  className,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(defaultLanguage)
  const [copied, setCopied] = useState(false)

  const activeSnippet = useMemo(() => {
    return (codeSnippets[selectedLanguage] || '').trim()
  }, [codeSnippets, selectedLanguage])

  const activeMeta = useMemo(() => {
    return LANGUAGES.find((l) => l.id === selectedLanguage) || LANGUAGES[0]
  }, [selectedLanguage])

  const lines = useMemo(() => {
    if (!activeSnippet) return []
    return activeSnippet.split('\n')
  }, [activeSnippet])

  const handleCopy = async () => {
    if (!activeSnippet) return
    try {
      await navigator.clipboard.writeText(activeSnippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      setCopied(false)
    }
  }

  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-800 bg-[#0c111d] overflow-hidden shadow-md flex flex-col transition-all duration-200',
        className
      )}
    >
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-[#111827] border-b border-neutral-800/80">
        {/* Language Selection Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <div className="flex items-center gap-1 text-xs font-bold text-neutral-400 uppercase tracking-wider mr-2 shrink-0">
            <Code2 className="w-3.5 h-3.5 text-[#ED2A2B]" />
            <span className="hidden md:inline">Language:</span>
          </div>

          <div className="flex items-center p-0.5 bg-neutral-900/90 rounded-xl border border-neutral-800">
            {LANGUAGES.map((lang) => {
              const isActive = lang.id === selectedLanguage
              const hasCode = !!(codeSnippets[lang.id] && codeSnippets[lang.id]?.trim())

              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={cn(
                    'relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap',
                    isActive
                      ? 'bg-neutral-800 text-white shadow-sm font-bold'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50',
                    !hasCode && 'opacity-50'
                  )}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: lang.dotColor }}
                  />
                  <span>{lang.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#ED2A2B] rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Actions: Language Tag & Copy Button */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5">
          <span
            className={cn(
              'px-2 py-0.5 rounded-md text-[11px] font-mono font-medium border',
              activeMeta.badgeClass
            )}
          >
            {activeMeta.versionTag}
          </span>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!activeSnippet}
            aria-label="Copy code snippet"
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700/60 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed'
            )}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Display Area with Line Numbers */}
      <div className="relative flex-1 bg-[#090d16] overflow-x-auto min-h-[140px] max-h-[420px] scrollbar-thin scrollbar-thumb-neutral-800">
        {lines.length > 0 ? (
          <div className="flex font-mono text-[13px] leading-relaxed py-3.5 min-w-full">
            {/* Line numbers column */}
            <div
              aria-hidden="true"
              className="select-none pr-4 pl-4 text-right text-neutral-600 font-mono border-r border-neutral-800/80 shrink-0 bg-[#090d16]"
            >
              {lines.map((_, i) => (
                <div key={i} className="h-6 leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code lines */}
            <div className="pl-4 pr-6 flex-1 whitespace-pre">
              {lines.map((line, i) => (
                <div key={i} className="h-6 leading-6">
                  {highlightCodeLine(line, selectedLanguage)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-neutral-500 flex flex-col items-center justify-center gap-2">
            <Terminal className="w-5 h-5 text-neutral-600" />
            <span>No code snippet available for {activeMeta.label} in this unit.</span>
          </div>
        )}
      </div>

      {/* Footer Sub-indicator */}
      <div className="px-4 py-2 bg-[#0c111d] border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#ED2A2B]" />
          <span>Interactive Language Switcher</span>
        </span>
        <span>
          Viewing <strong className="text-neutral-300 font-semibold">{activeMeta.label}</strong> example
        </span>
      </div>
    </div>
  )
}
