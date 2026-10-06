import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { CodingTopic } from '@/coding/types'
import { cn } from '@/lib/utils'

interface CodingTopicCardProps {
  topic: CodingTopic
  className?: string
}

/**
 * CodingTopicCard
 * Displays a single Coding topic with icon, title, description, and Practice CTA.
 * STRICT RULE: NEVER displays question counts or numbers of problems.
 */
export const CodingTopicCard: React.FC<CodingTopicCardProps> = ({ topic, className }) => {
  const Icon = topic.icon

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
        {/* Icon & Title */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-200">
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold text-neutral-900 group-hover:text-neutral-950 transition-colors">
            {topic.title}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2">
            {topic.description}
          </p>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-700 group-hover:text-neutral-950 flex items-center gap-1.5 transition-colors">
          <span>Practice</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export default CodingTopicCard
