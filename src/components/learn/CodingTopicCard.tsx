import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { CodingTopic } from '@/coding/types'
import type { LearnCodingTopic } from '@/data/learn/coding'
import { getLearnQuestionsByTopic } from '@/data/learn/coding'
import { FormattedText } from '@/components/common/FormattedText'
import { cn } from '@/lib/utils'

interface CodingTopicCardProps {
  topic: CodingTopic | LearnCodingTopic
  className?: string
}

/**
 * CodingTopicCard
 * Displays a single Coding topic with icon, title, description, real question count, and Solve CTA.
 */
export const CodingTopicCard: React.FC<CodingTopicCardProps> = ({ topic, className }) => {
  const Icon = topic.icon

  const topicKey = (topic as any).slug || topic.id
  const questionCount = useMemo(() => {
    return getLearnQuestionsByTopic(topicKey).length
  }, [topicKey])

  return (
    <Link
      to={`/learn/coding/${topic.id}`}
      className={cn(
        'group relative flex flex-col justify-between p-5 sm:p-6 bg-white rounded-2xl border border-neutral-200/80',
        'shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
        className
      )}
    >
      <div className="space-y-3">
        {/* Icon & Count Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-200">
            <Icon className="w-5 h-5" />
          </div>
          {questionCount > 0 && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200/60">
              {questionCount} {questionCount === 1 ? 'Problem' : 'Problems'}
            </span>
          )}
        </div>

        <div>
          <h2 className="text-base font-bold text-neutral-900 group-hover:text-neutral-950 transition-colors">
            {topic.title}
          </h2>
          <FormattedText
            as="p"
            text={topic.description}
            className="mt-1.5 text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2"
          />
        </div>
      </div>

      {/* CTA Footer */}
      <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
        <span className="text-xs text-neutral-500 font-medium">
          {(topic as any).category || 'Topic Module'}
        </span>
        <span className="text-xs font-semibold text-neutral-900 group-hover:text-[#ED2A2B] flex items-center gap-1.5 transition-colors">
          <span>Solve</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export default CodingTopicCard
