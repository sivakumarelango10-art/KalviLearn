import React, { useState, useRef, useEffect } from 'react'
import {
  ArrowLeft,
  X,
  Loader2,
  AlertTriangle,
  Info,
  Bug,
  Lightbulb,
  MessageSquare,
  AlertCircle,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Image as ImageIcon,
  Upload,
  Trash2,
} from 'lucide-react'
import {
  FeedbackType,
  FeedbackAttachment,
  feedbackService,
  FeedbackSubmissionResult,
} from '@/services/feedbackService'
import { useAuth } from '@/contexts/AuthContext'
import { collectTelemetryContext } from '@/lib/telemetry'

interface FeedbackFormProps {
  type: FeedbackType
  onBack: () => void
  onClose: () => void
  onSuccess: (result: FeedbackSubmissionResult) => void
  portal?: string
}

const RATING_OPTIONS = [
  { value: 'POOR', emoji: '😞', label: 'Poor' },
  { value: 'NEUTRAL', emoji: '😐', label: 'Okay' },
  { value: 'GOOD', emoji: '🙂', label: 'Good' },
  { value: 'EXCELLENT', emoji: '😍', label: 'Great' },
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB limit
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  type,
  onBack,
  onClose,
  onSuccess,
  portal,
}) => {
  const { user } = useAuth()

  // Form Fields
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState<string | undefined>(undefined)
  const [currentProblem, setCurrentProblem] = useState('')
  const [attachment, setAttachment] = useState<FeedbackAttachment | null>(null)

  // UI States
  const [validationError, setValidationError] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const titleInputRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-focus first input on load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (type === 'FEEDBACK') {
        descriptionRef.current?.focus()
      } else {
        titleInputRef.current?.focus() || descriptionRef.current?.focus()
      }
    }, 150)
    return () => clearTimeout(timer)
  }, [type])

  // Process selected or pasted image file
  const processImageFile = (file: File) => {
    setFileError(null)

    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      setFileError('Only image files (PNG, JPG, WEBP, GIF) are supported.')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError(`Image exceeds 5MB limit (${formatFileSize(file.size)}).`)
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      if (dataUrl) {
        setAttachment({
          fileName: file.name || 'screenshot.png',
          fileType: file.type || 'image/png',
          fileSize: file.size,
          dataUrl,
        })
      }
    }
    reader.onerror = () => {
      setFileError('Failed to process image file.')
    }
    reader.readAsDataURL(file)
  }

  // Handle clipboard paste for screenshots (Ctrl+V / Cmd+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile()
          if (file) {
            processImageFile(file)
            break
          }
        }
      }
    }

    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processImageFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      processImageFile(file)
    }
  }

  const handleRemoveAttachment = () => {
    setAttachment(null)
    setFileError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Form Meta Configuration based on Feedback Type
  const getFormConfig = () => {
    switch (type) {
      case 'BUG':
        return {
          title: 'Report a Bug',
          subtitle: 'Tell us what went wrong.',
          icon: Bug,
          iconColor: 'text-red-600 bg-red-50 border-red-200',
          titleLabel: 'Title',
          titlePlaceholder: 'Short description (e.g., Code editor timed out on test case 4)',
          titleRequired: true,
          descLabel: 'Description',
          descPlaceholder: 'Describe what happened and how to reproduce it...',
        }
      case 'FEATURE_REQUEST':
        return {
          title: 'Suggest a Feature',
          subtitle: 'What would you like to see on KalviLearn?',
          icon: Lightbulb,
          iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
          titleLabel: 'Feature Title',
          titlePlaceholder: 'e.g., Interactive debugging stepper or syntax highlighter themes',
          titleRequired: true,
          descLabel: 'Description',
          descPlaceholder: 'Describe your idea and how it would help students or mentors...',
        }
      case 'FEEDBACK':
        return {
          title: 'Give Feedback',
          subtitle: 'How was your experience?',
          icon: MessageSquare,
          iconColor: 'text-blue-600 bg-blue-50 border-blue-200',
          titleLabel: 'Subject (Optional)',
          titlePlaceholder: 'Brief summary',
          titleRequired: false,
          descLabel: 'Tell us more',
          descPlaceholder: 'Your thoughts, general experience, or suggestions...',
        }
      case 'ISSUE':
        return {
          title: 'Report an Issue',
          subtitle: 'Report problems with curriculum, test cases, or accounts.',
          icon: AlertCircle,
          iconColor: 'text-orange-600 bg-orange-50 border-orange-200',
          titleLabel: 'Issue Title',
          titlePlaceholder: 'e.g., Incorrect test case expectation in Binary Search #12',
          titleRequired: true,
          descLabel: 'Description',
          descPlaceholder: 'Describe the issue in detail...',
        }
      case 'IMPROVEMENT':
        return {
          title: 'Suggest an Improvement',
          subtitle: 'Describe how an existing feature can be made better.',
          icon: Sparkles,
          iconColor: 'text-purple-600 bg-purple-50 border-purple-200',
          titleLabel: 'Feature / Area',
          titlePlaceholder: 'e.g., Practice Arena, Submissions Panel, Student Roster',
          titleRequired: true,
          descLabel: 'Suggested Improvement',
          descPlaceholder: 'Explain how it should behave and why it helps...',
        }
      case 'OTHER':
      default:
        return {
          title: 'Other',
          subtitle: 'Share any questions, thoughts, or suggestions.',
          icon: HelpCircle,
          iconColor: 'text-neutral-600 bg-neutral-100 border-neutral-200',
          titleLabel: 'Title',
          titlePlaceholder: 'Summary of your report',
          titleRequired: false,
          descLabel: 'Description',
          descPlaceholder: 'Details of your report or question...',
        }
    }
  }

  const config = getFormConfig()
  const Icon = config.icon

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)
    setApiError(null)

    // Title validation if required
    const trimmedTitle = title.trim()
    if (config.titleRequired && !trimmedTitle) {
      setValidationError(`Please enter a ${config.titleLabel.toLowerCase()}.`)
      titleInputRef.current?.focus()
      return
    }

    if (config.titleRequired && trimmedTitle.length < 3) {
      setValidationError('Title must be at least 3 characters long.')
      titleInputRef.current?.focus()
      return
    }

    // Improvement-specific validation
    if (type === 'IMPROVEMENT') {
      if (!currentProblem.trim()) {
        setValidationError('Please specify what is currently not working well.')
        return
      }
    }

    // Description validation
    const trimmedDesc = description.trim()
    if (!trimmedDesc) {
      setValidationError('Please enter a description.')
      descriptionRef.current?.focus()
      return
    }

    if (trimmedDesc.length < 5) {
      setValidationError('Description must be at least 5 characters.')
      descriptionRef.current?.focus()
      return
    }

    if (trimmedDesc.length > 4000) {
      setValidationError('Description cannot exceed 4000 characters.')
      return
    }

    setIsSubmitting(true)

    try {
      const telemetry = collectTelemetryContext()

      let finalDescription = trimmedDesc
      if (type === 'IMPROVEMENT' && currentProblem.trim()) {
        finalDescription = `Current Problem: ${currentProblem.trim()}\n\nSuggested Improvement:\n${trimmedDesc}`
      }

      const payload = {
        type,
        title: trimmedTitle || undefined,
        description: finalDescription,
        rating: type === 'FEEDBACK' ? rating : undefined,
        featureArea: type === 'IMPROVEMENT' ? trimmedTitle : undefined,
        attachment: attachment || undefined,
        portal: portal || (user?.role ? user.role.toUpperCase() : 'GENERAL'),
        route: telemetry.route,
        module: telemetry.module,
        browser: telemetry.browser,
        device: telemetry.device,
        app_version: telemetry.app_version,
        request_id: telemetry.request_id,
      }

      const result = await feedbackService.submitFeedback(payload)
      if (result && result.success) {
        onSuccess(result)
      } else {
        throw new Error(result?.message || 'Unable to submit your feedback.')
      }
    } catch (err: any) {
      console.error('Feedback submission failed:', err)
      setApiError(err.message || 'Unable to submit your feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-200">
      {/* Form Header */}
      <div className="px-5 py-4 border-b border-[#e5e7eb] flex items-center justify-between bg-[#fafafa]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            aria-label="Back to feedback menu"
            className="p-1.5 -ml-1 rounded-lg text-[#5d5e64] hover:text-black hover:bg-[#edeef0] transition-colors cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${config.iconColor}`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 id="feedback-dialog-title" className="text-sm font-bold text-[#191c1e] leading-tight">
                {config.title}
              </h2>
              <p className="text-[11px] text-[#5d5e64] line-clamp-1">
                {config.subtitle}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close feedback modal"
          className="p-1.5 rounded-lg text-[#5d5e64] hover:text-black hover:bg-[#edeef0] transition-colors disabled:opacity-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ED2A2B]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto max-h-[70vh] sm:max-h-[62vh]">
        {/* Error Alert */}
        {apiError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2 animate-in fade-in duration-150">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{apiError}</p>
              <p className="text-[11px] text-red-600 mt-0.5">Your input is preserved below so you can try submitting again.</p>
            </div>
          </div>
        )}

        {/* Informative Helper for Issues */}
        {type === 'ISSUE' && (
          <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-[11px] text-[#5d5e64] flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
            <span>
              Use this form for incorrect curriculum details, broken buttons, account anomalies, or evaluation issues.
            </span>
          </div>
        )}

        {/* Optional Sentiment Rating for Give Feedback */}
        {type === 'FEEDBACK' && (
          <div>
            <label className="text-xs font-semibold text-[#191c1e] block mb-2">
              How was your experience? <span className="text-[#5d5e64] font-normal text-[11px]">(Optional)</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {RATING_OPTIONS.map((item) => {
                const isSelected = rating === item.value
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setRating(isSelected ? undefined : item.value)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-black bg-black text-white shadow-2xs'
                        : 'border-[#e5e7eb] bg-[#f8f9fb] text-[#47464a] hover:bg-white hover:border-neutral-300'
                    }`}
                  >
                    <span className="text-xl mb-0.5">{item.emoji}</span>
                    <span className="text-[10px] font-medium leading-tight">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Primary Title Field */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="feedback-title-input" className="text-xs font-semibold text-[#191c1e]">
              {config.titleLabel}{' '}
              {config.titleRequired ? (
                <span className="text-red-500">*</span>
              ) : (
                <span className="text-[#5d5e64] font-normal text-[11px]">(Optional)</span>
              )}
            </label>
            <span className="text-[10px] text-[#5d5e64] font-mono">{title.length}/200</span>
          </div>
          <input
            id="feedback-title-input"
            ref={titleInputRef}
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value.slice(0, 200))
              if (validationError) setValidationError(null)
            }}
            disabled={isSubmitting}
            placeholder={config.titlePlaceholder}
            className="w-full bg-[#f8f9fb] border border-[#e5e7eb] text-xs p-2.5 rounded-xl text-[#191c1e] placeholder:text-[#9ca3af] focus:bg-white focus:border-black focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        {/* Improvement-Specific: Current Problem Field */}
        {type === 'IMPROVEMENT' && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="feedback-problem-input" className="text-xs font-semibold text-[#191c1e]">
                Current Problem <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-[#5d5e64] font-mono">{currentProblem.length}/1000</span>
            </div>
            <textarea
              id="feedback-problem-input"
              value={currentProblem}
              onChange={(e) => {
                setCurrentProblem(e.target.value.slice(0, 1000))
                if (validationError) setValidationError(null)
              }}
              disabled={isSubmitting}
              rows={2}
              placeholder="What could be improved or is hard to use currently?"
              className="w-full bg-[#f8f9fb] border border-[#e5e7eb] text-xs p-2.5 rounded-xl text-[#191c1e] placeholder:text-[#9ca3af] focus:bg-white focus:border-black focus:outline-none transition-colors resize-none disabled:opacity-50"
            />
          </div>
        )}

        {/* Description Field */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="feedback-desc-input" className="text-xs font-semibold text-[#191c1e]">
              {config.descLabel} <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] text-[#5d5e64] font-mono">{description.length}/4000</span>
          </div>
          <textarea
            id="feedback-desc-input"
            ref={descriptionRef}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value.slice(0, 4000))
              if (validationError) setValidationError(null)
            }}
            disabled={isSubmitting}
            rows={type === 'IMPROVEMENT' ? 3 : 4}
            placeholder={config.descPlaceholder}
            className={`w-full bg-[#f8f9fb] border ${
              validationError ? 'border-red-500 focus:border-red-500' : 'border-[#e5e7eb] focus:border-black'
            } text-xs p-2.5 rounded-xl text-[#191c1e] placeholder:text-[#9ca3af] focus:bg-white focus:outline-none transition-colors resize-none disabled:opacity-50`}
            required
          />
          {validationError && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <Info className="w-3 h-3 shrink-0" /> {validationError}
            </p>
          )}
        </div>

        {/* Screenshot / Image Attachment Field (Supported across all 6 sections) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-[#191c1e] flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-neutral-500" />
              <span>Attach Screenshot / Image</span>
              <span className="text-[#5d5e64] font-normal text-[11px]">(Optional)</span>
            </label>
            {attachment && (
              <button
                type="button"
                onClick={handleRemoveAttachment}
                disabled={isSubmitting}
                className="text-[11px] text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove</span>
              </button>
            )}
          </div>

          {attachment ? (
            /* Thumbnail preview card */
            <div className="p-2.5 rounded-xl border border-neutral-200 bg-[#f8f9fb] flex items-center gap-3 animate-in fade-in duration-150">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-neutral-300 bg-neutral-100 flex-shrink-0 shadow-2xs">
                <img
                  src={attachment.dataUrl}
                  alt="Attachment preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-neutral-900 truncate">
                  {attachment.fileName}
                </p>
                <p className="text-[10px] text-neutral-500">
                  {formatFileSize(attachment.fileSize)} • Image ready to upload
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveAttachment}
                disabled={isSubmitting}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                aria-label="Remove attached image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Upload dropzone / click to browse trigger */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-3.5 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-[#ED2A2B] bg-red-50/60'
                  : 'border-[#e5e7eb] hover:border-neutral-400 bg-[#f8f9fb] hover:bg-white'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
                disabled={isSubmitting}
              />
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 shadow-2xs">
                  <Upload className="w-4 h-4" />
                </div>
                <p className="text-xs font-medium text-neutral-700">
                  <span className="text-black font-semibold underline underline-offset-2">Click to browse</span> or drag and drop image
                </p>
                <p className="text-[10px] text-neutral-400">
                  PNG, JPG, WEBP, GIF up to 5MB (or paste with Ctrl+V)
                </p>
              </div>
            </div>
          )}

          {fileError && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 shrink-0" /> {fileError}
            </p>
          )}
        </div>

        {/* User Identity & Portal Telemetry Context Preview */}
        <div className="p-2.5 rounded-xl bg-[#f8f9fb] border border-[#e5e7eb] flex items-center justify-between text-[11px] text-[#5d5e64]">
          <div className="flex items-center gap-1.5 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">
              Submitting as <strong className="text-black font-medium">{user?.name || user?.email || 'Authenticated User'}</strong> ({user?.role || 'user'})
            </span>
          </div>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#e5e7eb] font-bold text-black shrink-0">
            {portal || (user?.role ? user.role.toUpperCase() : 'GENERAL')}
          </span>
        </div>

        {/* Form Actions */}
        <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-[#e5e7eb]">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="px-3.5 py-2 text-xs font-semibold text-[#5d5e64] hover:text-black hover:bg-[#f3f4f6] rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !description.trim() || (config.titleRequired && !title.trim())}
            className="px-5 py-2 text-xs font-semibold bg-black text-white rounded-xl hover:bg-neutral-800 transition-colors shadow-2xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
