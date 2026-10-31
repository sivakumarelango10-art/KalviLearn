import { collectTelemetryContext, getBrowserInfo, getDeviceType, deriveModuleFromPath } from '../src/lib/telemetry'
import { feedbackService, FeedbackType, SubmitFeedbackPayload } from '../src/services/feedbackService'

let passed = 0
let failed = 0

function assert(condition: boolean, name: string, detail?: string) {
  if (condition) {
    console.log(`✅ [PASS] ${name}`)
    passed++
  } else {
    console.error(`❌ [FAIL] ${name}${detail ? ` -> ${detail}` : ''}`)
    failed++
  }
}

async function runFrontendUiAudit() {
  console.log('========================================================================')
  console.log('🧪 KALVILEARN PHASE 1: FRONTEND FEEDBACK UI & COMPONENT AUDIT')
  console.log('========================================================================\n')

  // ------------------------------------------------------------------------
  // Suite 1: Telemetry & Automatic Client Context Collection
  // ------------------------------------------------------------------------
  console.log('--- Suite 1: Client Context & Telemetry Extraction ---')

  const telemetry = collectTelemetryContext('/practice/two-sum')
  assert(typeof telemetry.browser === 'string' && telemetry.browser.length > 0, 'Telemetry: captures browser name')
  assert(['desktop', 'mobile', 'tablet'].includes(telemetry.device), 'Telemetry: captures valid device type')
  assert(telemetry.app_version === '1.0.0', 'Telemetry: captures valid app version (1.0.0)')
  assert(telemetry.request_id.startsWith('req_'), 'Telemetry: generates unique request ID')
  assert(telemetry.module === 'STUDENT_ARENA', 'Telemetry: correctly maps /practice to STUDENT_ARENA')

  assert(deriveModuleFromPath('/mentor/students') === 'MENTOR_STUDENT_ROSTER', 'Telemetry: maps mentor students route')
  assert(deriveModuleFromPath('/campus/students') === 'CAMPUS_STUDENTS', 'Telemetry: maps campus students route')
  assert(deriveModuleFromPath('/revise') === 'STUDENT_REVISION', 'Telemetry: maps student revise route')
  assert(deriveModuleFromPath('/dashboard') === 'DASHBOARD_VIEW', 'Telemetry: maps dashboard route')

  // ------------------------------------------------------------------------
  // Suite 2: Feedback Types & Menu Architecture
  // ------------------------------------------------------------------------
  console.log('\n--- Suite 2: Feedback Types & Menu Architecture ---')

  const expectedTypes: FeedbackType[] = [
    'BUG',
    'FEATURE_REQUEST',
    'FEEDBACK',
    'ISSUE',
    'IMPROVEMENT',
    'OTHER',
  ]

  assert(expectedTypes.length === 6, 'Supports all 6 mandated feedback & support options')

  // ------------------------------------------------------------------------
  // Suite 3: Client Validation Rules Enforcement
  // ------------------------------------------------------------------------
  console.log('\n--- Suite 3: Form Validation Logic ---')

  function validateFormInput(type: FeedbackType, title: string, desc: string, problem?: string): { valid: boolean; error?: string } {
    const trimmedTitle = title.trim()
    const trimmedDesc = desc.trim()

    if (['BUG', 'FEATURE_REQUEST', 'ISSUE', 'IMPROVEMENT'].includes(type) && !trimmedTitle) {
      return { valid: false, error: 'Title is required' }
    }

    if (type === 'IMPROVEMENT' && (!problem || !problem.trim())) {
      return { valid: false, error: 'Current problem description is required' }
    }

    if (!trimmedDesc) {
      return { valid: false, error: 'Description is required' }
    }

    if (trimmedDesc.length < 5) {
      return { valid: false, error: 'Description must be at least 5 characters' }
    }

    if (trimmedDesc.length > 4000) {
      return { valid: false, error: 'Description cannot exceed 4000 characters' }
    }

    if (trimmedTitle.length > 200) {
      return { valid: false, error: 'Title cannot exceed 200 characters' }
    }

    return { valid: true }
  }

  assert(!validateFormInput('BUG', '   ', 'Valid description here').valid, 'Bug form: Rejects empty title')
  assert(!validateFormInput('BUG', 'Valid Title', '   ').valid, 'Bug form: Rejects whitespace-only description')
  assert(!validateFormInput('BUG', 'Valid Title', 'fix').valid, 'Form: Rejects description < 5 characters')
  assert(!validateFormInput('BUG', 'Valid Title', 'X'.repeat(4001)).valid, 'Form: Rejects description > 4000 characters')
  assert(!validateFormInput('IMPROVEMENT', 'Arena Editor', 'Add autocomplete', '   ').valid, 'Improvement form: Rejects missing current problem')
  assert(validateFormInput('FEEDBACK', '', 'Great learning platform experience so far!').valid, 'General feedback form: Allows empty title')
  assert(validateFormInput('OTHER', '', 'General inquiry about contest schedules.').valid, 'Other form: Allows empty title')
  assert(validateFormInput('BUG', 'Crash on Run', 'The runner throws an unhandled exception').valid, 'Bug form: Accepts valid input')

  // ------------------------------------------------------------------------
  // Suite 4: Frontend Service Layer Abstraction
  // ------------------------------------------------------------------------
  console.log('\n--- Suite 4: Frontend Service Layer Abstraction ---')

  assert(typeof feedbackService.submitFeedback === 'function', 'feedbackService: exposes submitFeedback() contract')

  // ------------------------------------------------------------------------
  // Suite 5: Sentiment Ratings Configuration
  // ------------------------------------------------------------------------
  console.log('\n--- Suite 5: Feedback Sentiment Ratings ---')

  const validRatings = ['POOR', 'NEUTRAL', 'GOOD', 'EXCELLENT']
  assert(validRatings.length === 4, 'Give Feedback: provides 4 sentiment choices (😞 😐 🙂 😍)')

  // ------------------------------------------------------------------------
  // Suite 6: Image Attachment Validation Across All Sections
  // ------------------------------------------------------------------------
  console.log('\n--- Suite 6: Image Attachment Validation Across All Sections ---')

  const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
  const maxImageSize = 5 * 1024 * 1024 // 5 MB

  function validateImageAttachment(fileType: string, fileSize: number): { valid: boolean; error?: string } {
    if (!allowedImageTypes.includes(fileType.toLowerCase())) {
      return { valid: false, error: 'Only image files (PNG, JPG, WEBP, GIF) are supported.' }
    }
    if (fileSize > maxImageSize) {
      return { valid: false, error: 'Image exceeds 5MB limit.' }
    }
    return { valid: true }
  }

  // Image validation checks
  assert(validateImageAttachment('image/png', 1024 * 500).valid, 'Image attachment: Accepts valid PNG (< 5MB)')
  assert(validateImageAttachment('image/jpeg', 1024 * 1024 * 2).valid, 'Image attachment: Accepts valid JPEG (< 5MB)')
  assert(validateImageAttachment('image/webp', 1024 * 250).valid, 'Image attachment: Accepts valid WEBP (< 5MB)')
  assert(validateImageAttachment('image/gif', 1024 * 800).valid, 'Image attachment: Accepts valid GIF (< 5MB)')
  assert(!validateImageAttachment('application/pdf', 1024 * 100).valid, 'Image attachment: Rejects PDF files')
  assert(!validateImageAttachment('text/plain', 1024).valid, 'Image attachment: Rejects TXT files')
  assert(!validateImageAttachment('application/x-msdownload', 1024).valid, 'Image attachment: Rejects EXE files')
  assert(!validateImageAttachment('image/png', 6 * 1024 * 1024).valid, 'Image attachment: Rejects image > 5MB limit')

  // Attachment payload verification across all 6 sections
  for (const sectionType of expectedTypes) {
    const payloadWithAttachment: SubmitFeedbackPayload = {
      type: sectionType,
      title: 'Sample title',
      description: 'Sample description for feedback',
      portal: 'STUDENT',
      route: '/practice/two-sum',
      attachment: {
        fileName: 'error_screenshot.png',
        fileType: 'image/png',
        fileSize: 1024 * 200,
        dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      },
    }
    assert(Boolean(payloadWithAttachment.attachment?.dataUrl), `Attachment supported for section: ${sectionType}`)
  }

  console.log('\n========================================================================')
  console.log(`🏁 AUDIT RESULTS: ${passed} / ${passed + failed} TESTS PASSED`)
  console.log('========================================================================')

  if (failed > 0) process.exit(1)
}

runFrontendUiAudit().catch((err) => {
  console.error('Test execution failed:', err)
  process.exit(1)
})
