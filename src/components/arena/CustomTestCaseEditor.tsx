import React from 'react'
import { RotateCcw, AlertTriangle, CheckCircle2, XCircle, Info, Clock } from 'lucide-react'
import { type CustomTestCase } from '../../types/customTest'
import { computeLineDiff, validateJsonInput, type DiffResult } from '../../lib/judge/compare'
import { cn } from '../../lib/utils'

interface CustomTestCaseEditorProps {
  customCase: CustomTestCase
  exampleInput: string
  isJsonQuestion?: boolean
  inputFormatHint?: string
  isRunning?: boolean
  onUpdate: (updated: Partial<CustomTestCase>) => void
  onReset: () => void
}

export const CustomTestCaseEditor: React.FC<CustomTestCaseEditorProps> = ({
  customCase,
  exampleInput,
  isJsonQuestion = false,
  inputFormatHint,
  isRunning = false,
  onUpdate,
  onReset,
}) => {
  // Live JSON validation for JSON questions
  const jsonCheck = React.useMemo(() => {
    if (!isJsonQuestion) return { valid: true }
    return validateJsonInput(customCase.input)
  }, [isJsonQuestion, customCase.input])

  // Compute line-by-line diff if expected output is provided and case has been run
  const diffResult: DiffResult | null = React.useMemo(() => {
    if (!customCase.expectedOutput || !customCase.expectedOutput.trim()) return null
    if (customCase.actualOutput === undefined && !customCase.error && !customCase.compilationError) return null
    return computeLineDiff(customCase.actualOutput || '', customCase.expectedOutput)
  }, [customCase.actualOutput, customCase.expectedOutput, customCase.error, customCase.compilationError])

  const hasExpected = !!customCase.expectedOutput && customCase.expectedOutput.trim().length > 0
  const hasRun = customCase.actualOutput !== undefined || !!customCase.error || !!customCase.compilationError

  return (
    <div className="space-y-4 font-sans text-xs">
      {/* Top Controls Row */}
      <div className="flex items-center justify-between gap-3 border-b border-neutral-800/80 pb-2.5 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
            {customCase.name}
          </span>

          {/* Result Badge */}
          {hasRun && (
            <>
              {customCase.compilationError ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold text-[11px] bg-rose-950/80 text-rose-300 border border-rose-800">
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  <span>Compilation Error</span>
                </span>
              ) : customCase.error && customCase.status === 'error' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold text-[11px] bg-rose-950/80 text-rose-300 border border-rose-800">
                  <XCircle className="w-3 h-3 text-rose-400" />
                  <span>Runtime Error</span>
                </span>
              ) : hasExpected ? (
                customCase.status === 'matches' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold text-[11px] bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Matches</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold text-[11px] bg-rose-950/80 text-rose-300 border border-rose-800">
                    <XCircle className="w-3 h-3 text-rose-400" />
                    <span>Doesn&apos;t match</span>
                  </span>
                )
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold text-[11px] bg-neutral-800 text-neutral-300 border border-neutral-700">
                  <span>Output Generated</span>
                </span>
              )}

              {typeof customCase.executionTimeMs === 'number' && (
                <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-500" />
                  <span>{customCase.executionTimeMs}ms</span>
                </span>
              )}
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onReset}
          title="Reset to example input"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-neutral-400 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/60 transition-colors text-[11px]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Input</span>
        </button>
      </div>

      {/* JSON Shape Hint & Validation Banner for JSON Questions */}
      {isJsonQuestion && (
        <div className="space-y-2">
          {inputFormatHint && (
            <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/60 text-[11px] text-blue-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-blue-200">Expected JSON Format: </strong>
                <span>{inputFormatHint}</span>
              </div>
            </div>
          )}

          {!jsonCheck.valid && customCase.input.trim().length > 0 && (
            <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-900/80 text-[11px] text-rose-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{jsonCheck.error}</span>
            </div>
          )}
        </div>
      )}

      {/* Input and Expected Output Box Grid (Stacked vertically on mobile 375px) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Input Box */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Input (stdin)
            </label>
            <span className="text-[10px] text-neutral-500">
              {customCase.input.length} / 65536 chars
            </span>
          </div>
          <textarea
            value={customCase.input}
            onChange={(e) => onUpdate({ input: e.target.value })}
            placeholder={exampleInput || 'Enter custom input here...'}
            rows={5}
            className={cn(
              'w-full p-2.5 rounded-lg bg-neutral-950 border font-mono text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:ring-1 transition-all resize-y',
              !jsonCheck.valid && isJsonQuestion && customCase.input.trim().length > 0
                ? 'border-rose-800 focus:ring-rose-600'
                : 'border-neutral-800 focus:ring-neutral-600'
            )}
          />
        </div>

        {/* Expected Output Box */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Expected Output (optional)
            </label>
            <span className="text-[10px] text-neutral-500">
              {customCase.expectedOutput ? `${customCase.expectedOutput.length} chars` : 'Leave empty for raw output'}
            </span>
          </div>
          <textarea
            value={customCase.expectedOutput}
            onChange={(e) => onUpdate({ expectedOutput: e.target.value })}
            placeholder="Optional: enter expected output to compare against your result..."
            rows={5}
            className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all resize-y"
          />
        </div>
      </div>

      {/* Your Output Box */}
      {hasRun && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Your Output
            </span>
            {typeof customCase.executionTimeMs === 'number' && (
              <span className="text-[10px] font-mono text-neutral-500">
                Wall-clock: {customCase.executionTimeMs}ms
              </span>
            )}
          </div>

          {customCase.compilationError ? (
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/60 font-mono text-xs text-rose-300 whitespace-pre-wrap overflow-x-auto">
              <div className="flex items-center gap-1.5 font-bold text-rose-400 pb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Compilation / Syntax Error</span>
              </div>
              {customCase.compilationError}
            </div>
          ) : customCase.error ? (
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/60 font-mono text-xs text-rose-300 whitespace-pre-wrap overflow-x-auto">
              <div className="flex items-center gap-1.5 font-bold text-rose-400 pb-1">
                <XCircle className="w-3.5 h-3.5" />
                <span>Runtime Error / Stderr</span>
              </div>
              {customCase.error}
              {customCase.actualOutput && (
                <div className="mt-2 pt-2 border-t border-rose-900/40">
                  <div className="text-[10px] font-bold uppercase text-neutral-400 mb-1">Stdout</div>
                  <pre className="text-neutral-200">{customCase.actualOutput}</pre>
                </div>
              )}
            </div>
          ) : (
            <pre
              className={cn(
                'p-3 rounded-lg border font-mono text-xs whitespace-pre-wrap overflow-x-auto',
                hasExpected
                  ? customCase.status === 'matches'
                    ? 'bg-emerald-950/20 border-emerald-900/60 text-emerald-200'
                    : 'bg-rose-950/20 border-rose-900/60 text-rose-200'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-200'
              )}
            >
              {customCase.actualOutput || '(no output)'}
            </pre>
          )}

          {/* Simple Line-by-Line Difference View (when Expected is filled and doesn't match) */}
          {hasExpected && diffResult && !diffResult.matches && (
            <div className="mt-3 p-3 rounded-xl bg-neutral-950/90 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-1.5">
                <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Line-by-Line Difference</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {diffResult.summary}
                </span>
              </div>

              <div className="font-mono text-xs space-y-1 max-h-48 overflow-y-auto pr-1">
                {diffResult.items.map((item) => (
                  <div
                    key={item.lineNum}
                    className={cn(
                      'p-1.5 rounded text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 border',
                      item.status === 'match'
                        ? 'bg-neutral-900/40 border-transparent text-neutral-400'
                        : 'bg-rose-950/30 border-rose-900/50 text-rose-200'
                    )}
                  >
                    <span className="text-[10px] text-neutral-500 font-semibold shrink-0">
                      Line {item.lineNum}:
                    </span>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] min-w-0">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-neutral-500 block">
                          Expected
                        </span>
                        <span className="font-mono truncate block">
                          {item.expected !== undefined ? item.expected : '(end of expected)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-neutral-500 block">
                          Your Output
                        </span>
                        <span
                          className={cn(
                            'font-mono truncate block',
                            item.status === 'mismatch' || item.status === 'actual_extra'
                              ? 'text-rose-300 font-semibold'
                              : 'text-neutral-300'
                          )}
                        >
                          {item.actual !== undefined ? item.actual : '(end of output)'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {isRunning && (
        <div className="flex items-center gap-2 text-amber-400 text-xs py-1">
          <span className="w-3 h-3 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
          <span>Executing custom test input...</span>
        </div>
      )}
    </div>
  )
}
