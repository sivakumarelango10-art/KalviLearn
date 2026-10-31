import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Top-Level React Application Error Boundary
 * Catches any unhandled render/runtime exceptions before crashing to a blank white screen.
 * Displays a branded, accessible error state without leaking technical stack traces.
 */
export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log sanitized error details in development for debugging
    if (import.meta.env.DEV) {
      console.error('Uncaught error in GlobalErrorBoundary:', error, errorInfo)
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen w-full flex items-center justify-center p-4 bg-neutral-50 font-sans text-neutral-900"
        >
          <div className="max-w-md w-full bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-10 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Branded Icon */}
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 text-[#ED2A2B] flex items-center justify-center mx-auto shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Something went wrong
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                An unexpected application error occurred. We have safely prevented a system crash.
                Please try reloading the page to resume your learning session.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
