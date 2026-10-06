import React, { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  BookOpen,
} from 'lucide-react'
import { getCodingTopicById, getCodingQuestionBySlug } from '@/coding/questions'
import { getUserState, subscribeProgress } from '@/lib/progress'

/**
 * CodingQuestionDetailPage
 * Displays the complete problem statement, input/output formats, constraints,
 * and 3 worked examples with input, output, and explanation.
 * Provides direct action to solve in the existing Practice Arena.
 * STRICT RULE: No hidden test cases are EVER displayed or referenced.
 */
export const CodingQuestionDetailPage: React.FC = () => {
  const { topicId, slug } = useParams<{ topicId: string; slug: string }>()

  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)
  const [userProgressMap, setUserProgressMap] = useState<Record<string, any>>({})

  const topic = useMemo(() => {
    return topicId ? getCodingTopicById(topicId) : undefined
  }, [topicId])

  const question = useMemo(() => {
    return slug ? getCodingQuestionBySlug(slug) : undefined
  }, [slug])

  // Subscribe to user progress
  useEffect(() => {
    const update = () => {
      const state = getUserState()
      setUserProgressMap(state.progress || {})
    }
    update()
    const unsubscribe = subscribeProgress(update)
    return () => unsubscribe()
  }, [])

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(id)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // Fallback if topic or question is not found
  if (!topic || !question) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400">
          <Code2 className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-neutral-900">Problem Not Found</h1>
        <p className="text-sm text-neutral-500 max-w-md mx-auto">
          The requested coding problem could not be found. Please return to the topic list.
        </p>
        <Link
          to={topic ? `/learn/coding/${topic.id}` : '/learn/coding'}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{topic ? `Back to ${topic.title}` : 'Back to Coding Topics'}</span>
        </Link>
      </div>
    )
  }

  const prog = userProgressMap[question.slug]
  const isSolved = prog?.status === 'SOLVED'
  const isAttempted = prog?.status === 'ATTEMPTED'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 flex-wrap">
        <Link
          to="/learn"
          className="hover:text-neutral-900 transition-colors font-medium"
        >
          Learn
        </Link>
        <span>/</span>
        <Link
          to="/learn/coding"
          className="hover:text-neutral-900 transition-colors font-medium"
        >
          Coding
        </Link>
        <span>/</span>
        <Link
          to={`/learn/coding/${topic.id}`}
          className="hover:text-neutral-900 transition-colors font-medium"
        >
          {topic.title}
        </Link>
        <span>/</span>
        <span className="font-semibold text-neutral-900 truncate max-w-xs">
          {question.title}
        </span>
      </nav>

      {/* Back button */}
      <div>
        <Link
          to={`/learn/coding/${topic.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {topic.title}</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {question.title}
            </h1>
            {isSolved ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Completed</span>
              </span>
            ) : isAttempted ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <Clock className="w-3.5 h-3.5" />
                <span>Attempted</span>
              </span>
            ) : null}
          </div>
          <p className="text-xs text-neutral-500">
            Topic: <span className="font-semibold text-neutral-700">{topic.title}</span>
          </p>
        </div>

        {/* Solve CTA */}
        <Link
          to={`/practice/${question.slug}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ED2A2B] hover:bg-red-600 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all shrink-0 hover:shadow-md"
        >
          <Code2 className="w-4 h-4" />
          <span>Solve in Practice Arena</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Problem Details */}
      <div className="space-y-6">
        {/* Problem Statement Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-neutral-500" />
            <span>Problem Statement</span>
          </h2>
          <div className="text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap">
            {question.problemStatement}
          </div>
        </div>

        {/* Input & Output Format Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Format */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm space-y-3">
            <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Input Format
            </h2>
            <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
              {question.inputFormat}
            </div>
          </div>

          {/* Output Format */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm space-y-3">
            <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Output Format
            </h2>
            <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
              {question.outputFormat}
            </div>
          </div>
        </div>

        {/* Constraints */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            Constraints
          </h2>
          <div className="text-xs sm:text-sm font-mono text-neutral-800 bg-neutral-50 p-4 rounded-xl border border-neutral-100 whitespace-pre-wrap">
            {question.constraints}
          </div>
        </div>

        {/* Worked Examples (1, 2, 3) */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
            Worked Examples
          </h2>

          <div className="grid grid-cols-1 gap-5">
            {question.examples.map((example, idx) => {
              const exampleNum = idx + 1
              return (
                <div
                  key={exampleNum}
                  className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden"
                >
                  <div className="bg-neutral-50/80 px-6 py-3 border-b border-neutral-100 flex items-center justify-between">
                    <h3 className="text-xs font-bold text-neutral-900">
                      Example {exampleNum}
                    </h3>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Input / Output boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Input */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                          <span>Input:</span>
                          <button
                            onClick={() => copyToClipboard(example.input, `in-${exampleNum}`)}
                            className="hover:text-neutral-900 transition-colors flex items-center gap-1 text-[11px]"
                            title="Copy input"
                          >
                            {copiedIndex === `in-${exampleNum}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-3 bg-neutral-900 text-neutral-100 rounded-xl font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                          {example.input}
                        </pre>
                      </div>

                      {/* Output */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                          <span>Output:</span>
                          <button
                            onClick={() => copyToClipboard(example.output, `out-${exampleNum}`)}
                            className="hover:text-neutral-900 transition-colors flex items-center gap-1 text-[11px]"
                            title="Copy output"
                          >
                            {copiedIndex === `out-${exampleNum}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-3 bg-neutral-900 text-neutral-100 rounded-xl font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                          {example.output}
                        </pre>
                      </div>
                    </div>

                    {/* Explanation */}
                    {example.explanation && (
                      <div className="pt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                        <strong className="text-neutral-900 font-semibold">Explanation: </strong>
                        {example.explanation}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA to practice */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-neutral-900">
              Ready to write and evaluate your solution?
            </h3>
            <p className="text-xs text-neutral-500">
              Launch the Practice Arena to write code in Python, Java, Node.js, or C++ with live test execution.
            </p>
          </div>

          <Link
            to={`/practice/${question.slug}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all shrink-0 hover:shadow-md"
          >
            <span>Open in Practice Arena</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CodingQuestionDetailPage
