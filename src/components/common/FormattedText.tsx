import React from 'react'

interface FormattedTextProps {
  text?: string | null
  className?: string
  as?: 'div' | 'p' | 'span'
}

/**
 * FormattedText
 * Renders inline code (`code`) and bold (**bold**) safely using React elements.
 * 100% XSS-safe: NEVER uses dangerouslySetInnerHTML or raw HTML parsing.
 */
export const FormattedText: React.FC<FormattedTextProps> = ({
  text,
  className,
  as: Component = 'span',
}) => {
  if (!text) return null

  // Regex matches `code` or **bold**
  const parts: React.ReactNode[] = []
  const regex = /(`([^`]+)`|\*\*([^*]+)\*\*)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[0].startsWith('`') && match[0].endsWith('`')) {
      // Inline code
      const codeContent = match[2]
      parts.push(
        <code
          key={`c-${match.index}`}
          className="px-1.5 py-0.5 mx-0.5 rounded text-[13px] font-mono bg-neutral-100 text-neutral-800 dark:bg-neutral-800/90 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60 font-semibold"
        >
          {codeContent}
        </code>
      )
    } else if (match[0].startsWith('**') && match[0].endsWith('**')) {
      // Bold
      const boldContent = match[3]
      parts.push(
        <strong key={`b-${match.index}`} className="font-bold text-inherit">
          {boldContent}
        </strong>
      )
    }

    lastIndex = regex.lastIndex
  }

  // Trailing text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return <Component className={className}>{parts}</Component>
}

export default FormattedText
