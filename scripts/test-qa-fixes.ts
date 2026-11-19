import baseAssert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { GlobalWindow } from 'happy-dom'
import React, { act } from 'react'
import { createRoot, Root } from 'react-dom/client'
import { formatCampusLocation } from '../src/utils/formatCampusLocation'
import { selectStudentDashboardMetrics } from '../src/utils/studentMetrics'
import { useDocumentTitle } from '../src/hooks/useDocumentTitle'

// ─── Dynamic Assertion & Static Check Tracking ──────────────────────────────
let currentGroupAssertions = 0
let totalUnitAssertions = 0
let totalStaticChecks = 0

// Proxy to track executable unit test assertions dynamically
const assert = new Proxy(baseAssert, {
  apply(target, thisArg, args) {
    currentGroupAssertions++
    totalUnitAssertions++
    return Reflect.apply(target, thisArg, args)
  },
  get(target, prop, receiver) {
    const orig = Reflect.get(target, prop, receiver)
    if (typeof orig === 'function') {
      return (...args: any[]) => {
        currentGroupAssertions++
        totalUnitAssertions++
        return orig.apply(target, args)
      }
    }
    return orig
  },
})

function consumeGroupAssertions(): number {
  const count = currentGroupAssertions
  currentGroupAssertions = 0
  return count
}

console.log('--- RUNNING QA FIXES & ACCESSIBILITY REGRESSION TEST SUITE ---')

// ─── 1. formatCampusLocation unit tests ─────────────────────────────────────
console.log('\n[TEST GROUP 1] formatCampusLocation edge cases:')

assert.strictEqual(
  formatCampusLocation({ city: 'Bengaluru', state: 'Karnataka' }),
  'Bengaluru, Karnataka',
  'Should format city and state with comma'
)

assert.strictEqual(
  formatCampusLocation({ city: 'Remote', state: null }),
  'Remote',
  'CRITICAL: Should NOT output trailing comma when state is null (BUG-02 fix)'
)

assert.strictEqual(
  formatCampusLocation({ city: 'Remote', state: undefined }),
  'Remote',
  'CRITICAL: Should NOT output trailing comma when state is undefined'
)

assert.strictEqual(
  formatCampusLocation({ city: 'Remote', state: '' }),
  'Remote',
  'CRITICAL: Should NOT output trailing comma when state is empty string'
)

assert.strictEqual(
  formatCampusLocation({ city: 'Remote', state: '   ' }),
  'Remote',
  'CRITICAL: Should NOT output trailing comma when state is whitespace'
)

assert.strictEqual(
  formatCampusLocation({ city: null, state: 'Karnataka' }),
  'Karnataka',
  'Should format state only when city is null'
)

assert.strictEqual(
  formatCampusLocation({ city: '', state: '' }),
  'Not configured',
  'Should return default fallback when both are empty'
)

assert.strictEqual(
  formatCampusLocation({ city: null, state: null }, 'Unspecified'),
  'Unspecified',
  'Should return custom fallback when provided'
)

assert.strictEqual(
  formatCampusLocation(null, 'Not configured'),
  'Not configured',
  'Should handle null campus object safely'
)

assert.strictEqual(
  formatCampusLocation(undefined, 'Unspecified'),
  'Unspecified',
  'Should handle undefined campus object safely'
)

console.log(`✓ Group 1: All ${consumeGroupAssertions()} formatCampusLocation unit assertions passed!`)

// ─── 2. useDocumentTitle Actual React Hook Tests (Real React Renderer) ──────
console.log('\n[TEST GROUP 2] useDocumentTitle Actual React Hook Tests (React 19 createRoot + act):')

interface GlobalPropertyState {
  existed: boolean
  descriptor?: PropertyDescriptor
  value?: any
}

const originalGlobals = new Map<string | symbol, GlobalPropertyState>()
let activeWindow: GlobalWindow | null = null

function trackAndSet(key: string | symbol, value: any) {
  if (!originalGlobals.has(key)) {
    const existed = Object.prototype.hasOwnProperty.call(globalThis, key) || key in globalThis
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, key)
    originalGlobals.set(key, {
      existed,
      descriptor,
      value: (globalThis as any)[key],
    })
  }
  try {
    ;(globalThis as any)[key] = value
  } catch {
    Object.defineProperty(globalThis, key, {
      value,
      configurable: true,
      writable: true,
      enumerable: true,
    })
  }
}

function setupDOM(): GlobalWindow {
  const win = new GlobalWindow()
  activeWindow = win

  // 1. Preserve original IS_REACT_ACT_ENVIRONMENT and set to true for React act()
  trackAndSet('IS_REACT_ACT_ENVIRONMENT', true)

  // 2. Set window and document from GlobalWindow
  trackAndSet('window', win)
  trackAndSet('document', win.document)

  // 3. Explicit DOM classes required by React 19 createRoot and reconciliation
  const keysToCopy = [
    'HTMLIFrameElement',
    'HTMLElement',
    'HTMLDivElement',
    'Element',
    'Node',
    'Document',
    'Event',
    'CustomEvent',
    'MutationObserver',
  ]
  for (const key of keysToCopy) {
    trackAndSet(key, (win as any)[key])
  }

  // 4. Track and copy all additional properties from GlobalWindow to globalThis
  for (const key of Object.getOwnPropertyNames(win)) {
    if (!(key in globalThis)) {
      trackAndSet(key, (win as any)[key])
    }
  }

  return win
}

function teardownDOM() {
  // Restore all modified or added globals in reverse order
  const entries = Array.from(originalGlobals.entries()).reverse()
  for (const [key, state] of entries) {
    if (state.existed && state.descriptor) {
      try {
        Object.defineProperty(globalThis, key, state.descriptor)
      } catch {
        ;(globalThis as any)[key] = state.value
      }
    } else {
      // If the property did not exist, or existed only through the prototype chain
      // without an own property descriptor, delete the own property created by setup
      // so the inherited prototype property is restored naturally.
      try {
        delete (globalThis as any)[key]
      } catch {
        ;(globalThis as any)[key] = undefined
      }
    }
  }
  originalGlobals.clear()

  // Close the GlobalWindow instance after React unmount and DOM cleanup, if supported
  if (activeWindow && typeof activeWindow.close === 'function') {
    try {
      activeWindow.close()
    } catch {
      // Safe fallback
    }
  }
  activeWindow = null
}

setupDOM()

let testRoot: Root | null = null

try {
  const container = document.createElement('div')
  testRoot = createRoot(container)

  // Real React component calling the actual hook
  function TitleTester({ title }: { title: string }) {
    useDocumentTitle(title)
    return null
  }

  // 2.1: A normal page title receives the KalviLearn suffix
  document.title = ''
  act(() => {
    testRoot!.render(React.createElement(TitleTester, { title: 'Super Admin Dashboard' }))
  })
  assert.strictEqual(
    document.title,
    'Super Admin Dashboard — KalviLearn',
    'A normal page title must receive the KalviLearn suffix'
  )

  // 2.2: An already-suffixed title does not receive a duplicate suffix
  act(() => {
    testRoot!.render(
      React.createElement(TitleTester, { title: 'Super Admin Dashboard — KalviLearn' })
    )
  })
  assert.strictEqual(
    document.title,
    'Super Admin Dashboard — KalviLearn',
    'An already-suffixed title must not receive a duplicate suffix'
  )

  // 2.3: Leading and trailing whitespace is trimmed before appending suffix
  act(() => {
    testRoot!.render(React.createElement(TitleTester, { title: '   Campus Management   ' }))
  })
  assert.strictEqual(
    document.title,
    'Campus Management — KalviLearn',
    'Leading and trailing whitespace must be trimmed before appending suffix'
  )

  // 2.4: Empty or whitespace-only title preserves existing document title without mutating
  act(() => {
    testRoot!.render(React.createElement(TitleTester, { title: '' }))
  })
  assert.strictEqual(
    document.title,
    'Campus Management — KalviLearn',
    'Empty title must preserve existing document title without mutating'
  )

  act(() => {
    testRoot!.render(React.createElement(TitleTester, { title: '   ' }))
  })
  assert.strictEqual(
    document.title,
    'Campus Management — KalviLearn',
    'Whitespace-only title must preserve existing document title without mutating'
  )

  // 2.5: Changing the title prop updates document.title via real React reconciliation
  act(() => {
    testRoot!.render(React.createElement(TitleTester, { title: 'Questions Management' }))
  })
  assert.strictEqual(
    document.title,
    'Questions Management — KalviLearn',
    'Changing the title prop must update document.title via real useEffect'
  )

  // 2.6: Actual React unmounting does not corrupt or reset document.title
  act(() => {
    testRoot!.unmount()
    testRoot = null
  })
  assert.strictEqual(
    document.title,
    'Questions Management — KalviLearn',
    'Actual React unmount must preserve document title without unexpected reset'
  )
} finally {
  if (testRoot) {
    try {
      act(() => {
        testRoot!.unmount()
      })
    } catch {
      // Safe cleanup during error handling
    }
  }
  teardownDOM()
}

// 2.7: Isolated regression test verifying setupDOM / teardownDOM restoration logic
{
  const inheritedKey = '__kalviTestInheritedProp__'
  const nonExistentKey = '__kalviTestNonExistentProp__'
  const ownKey = '__kalviTestOwnProp__'

  // Setup initial state before DOM initialization
  ;(Object.prototype as any)[inheritedKey] = 'prototype_inherited_value'
  ;(globalThis as any)[ownKey] = 'original_own_value'
  delete (globalThis as any)[nonExistentKey]

  try {
    setupDOM()

    // Simulate setup tracking and modification
    trackAndSet(inheritedKey, 'shadowed_during_setup')
    trackAndSet(ownKey, 'mutated_during_setup')
    trackAndSet(nonExistentKey, 'created_during_setup')

    // Run teardown
    teardownDOM()

    // Case 1: An inherited property remains inherited after teardown
    assert.strictEqual(
      (globalThis as any)[inheritedKey],
      'prototype_inherited_value',
      'Case 1: An inherited property must remain inherited and accessible after teardown'
    )

    // Case 2: No temporary own property is left behind
    assert.strictEqual(
      Object.prototype.hasOwnProperty.call(globalThis, inheritedKey),
      false,
      'Case 2: No temporary own property must be left behind on globalThis for inherited properties'
    )

    // Case 3: A property that did not originally exist is deleted after teardown
    assert.strictEqual(
      nonExistentKey in globalThis,
      false,
      'Case 3: A property that did not originally exist must be completely deleted after teardown'
    )

    // Case 4: An original own property is restored correctly
    assert.strictEqual(
      (globalThis as any)[ownKey],
      'original_own_value',
      'Case 4: An original own property must be restored to its exact original value'
    )
    assert.strictEqual(
      Object.prototype.hasOwnProperty.call(globalThis, ownKey),
      true,
      'Case 4: An original own property must remain an own property on globalThis'
    )
  } finally {
    delete (Object.prototype as any)[inheritedKey]
    delete (globalThis as any)[ownKey]
    delete (globalThis as any)[nonExistentKey]
    teardownDOM()
  }
}

console.log(
  `✓ Group 2: All ${consumeGroupAssertions()} useDocumentTitle actual React hook and DOM restoration unit assertions passed (via React 19 createRoot)!`
)

// ─── 3. Student Metric Selection Logic (Active Students vs Student-role Accounts) ───
console.log('\n[TEST GROUP 3] Student Metric Selection Logic (Active Students vs Student-role Accounts):')

// 3.1: Active student records come directly from overview.activeStudents
{
  const result = selectStudentDashboardMetrics(
    { activeStudents: 85, totalStudents: 90 },
    { STUDENT: 92 }
  )
  assert.strictEqual(
    result.activeStudents,
    85,
    'Active student records must come directly from overview.activeStudents'
  )
}

// 3.2: Student-role accounts come directly from roleDistribution.STUDENT
{
  const result = selectStudentDashboardMetrics(
    { activeStudents: 50 },
    { STUDENT: 65 }
  )
  assert.strictEqual(
    result.studentRoleAccounts,
    65,
    'Student-role accounts must come directly from roleDistribution.STUDENT'
  )
  assert.strictEqual(
    result.footerLabel,
    '65 student-role accounts',
    'Footer label must format student-role accounts with label'
  )
}

// 3.3: Missing values and nulls are handled safely without throwing
{
  const nullOverviewResult = selectStudentDashboardMetrics(null, { STUDENT: 12 })
  assert.strictEqual(
    nullOverviewResult.activeStudents,
    undefined,
    'Missing overview must safely result in undefined activeStudents'
  )
  assert.strictEqual(
    nullOverviewResult.studentRoleAccounts,
    12,
    'Missing overview must not impede studentRoleAccounts'
  )

  const nullDistributionResult = selectStudentDashboardMetrics({ activeStudents: 30 }, null)
  assert.strictEqual(
    nullDistributionResult.activeStudents,
    30,
    'Valid overview must be preserved when roleDistribution is null'
  )
  assert.strictEqual(
    nullDistributionResult.studentRoleAccounts,
    0,
    'Missing roleDistribution must default studentRoleAccounts safely to 0'
  )
  assert.strictEqual(
    nullDistributionResult.footerLabel,
    '0 student-role accounts',
    'Footer label must safely handle 0 accounts'
  )

  const emptyResult = selectStudentDashboardMetrics(undefined, undefined)
  assert.strictEqual(
    emptyResult.activeStudents,
    undefined,
    'Completely undefined telemetry must safely return undefined activeStudents'
  )
  assert.strictEqual(
    emptyResult.studentRoleAccounts,
    0,
    'Completely undefined telemetry must safely return 0 studentRoleAccounts'
  )
}

// 3.4: Equal counts are valid and do not cause test failures (no subset/inequality assumption)
{
  const equalResult = selectStudentDashboardMetrics(
    { activeStudents: 100 },
    { STUDENT: 100 }
  )
  assert.strictEqual(equalResult.activeStudents, 100, 'Equal activeStudents count must be preserved')
  assert.strictEqual(equalResult.studentRoleAccounts, 100, 'Equal studentRoleAccounts count must be preserved')
  assert.strictEqual(equalResult.footerLabel, '100 student-role accounts', 'Equal counts footer must format properly')
}

// 3.5: Active students count greater than student-role accounts is valid (independent populations)
{
  const independentResult = selectStudentDashboardMetrics(
    { activeStudents: 150 },
    { STUDENT: 120 }
  )
  assert.strictEqual(independentResult.activeStudents, 150)
  assert.strictEqual(independentResult.studentRoleAccounts, 120)
}

// 3.6: Description and explanation terminology accurately describe underlying data
{
  const metrics = selectStudentDashboardMetrics({ activeStudents: 10 }, { STUDENT: 10 })
  assert.strictEqual(
    metrics.description,
    'Active records in students table',
    'Description must accurately describe active records in students table'
  )
  assert(
    metrics.explanation.includes('Active students = active records in the students table.'),
    'Explanation must accurately describe Active Students source'
  )
  assert(
    metrics.explanation.includes('Student-role accounts = user accounts assigned the STUDENT role.'),
    'Explanation must accurately describe Student-role Accounts source'
  )
}

console.log(`✓ Group 3: All ${consumeGroupAssertions()} student metric selection unit assertions passed!`)

// ─── 4. Static Accessibility Inspection ─────────────────────────────────────
console.log('\n[TEST GROUP 4] Static Accessibility Attributes on Search Inputs (OBS-02):')

const pagesToCheck = [
  {
    file: 'src/pages/super-admin/SuperAdminStudentsPage.tsx',
    expectedAttrs: ['id="student-search"', 'name="student-search"', 'type="search"', 'aria-label='],
  },
  {
    file: 'src/pages/super-admin/SuperAdminQuestionsPage.tsx',
    expectedAttrs: ['id="question-search"', 'name="question-search"', 'type="search"', 'aria-label='],
  },
  {
    file: 'src/pages/super-admin/SuperAdminCampusesPage.tsx',
    expectedAttrs: ['id="campus-search"', 'name="campus-search"', 'type="search"', 'aria-label='],
  },
  {
    file: 'src/pages/super-admin/SuperAdminManagersPage.tsx',
    expectedAttrs: ['id="manager-search"', 'name="manager-search"', 'type="search"', 'aria-label='],
  },
  {
    file: 'src/pages/super-admin/SuperAdminMentorsPage.tsx',
    expectedAttrs: ['id="mentor-search"', 'name="mentor-search"', 'type="search"', 'aria-label='],
  },
  {
    file: 'src/pages/super-admin/SuperAdminRolesPage.tsx',
    expectedAttrs: ['id="role-user-search"', 'name="role-user-search"', 'type="search"', 'aria-label='],
  },
  {
    file: 'src/pages/super-admin/SuperAdminContentManagersPage.tsx',
    expectedAttrs: ['id="cm-search"', 'name="cm-search"', 'type="search"', 'aria-label='],
  },
  {
    file: 'src/pages/super-admin/SuperAdminCoursesPage.tsx',
    expectedAttrs: ['id="curriculum-unit-search"', 'name="curriculum-unit-search"', 'type="search"', 'aria-label='],
  },
  {
    file: 'src/pages/super-admin/SuperAdminLearnCodingPage.tsx',
    expectedAttrs: ['id="learn-coding-search"', 'name="learn-coding-search"', 'type="search"', 'aria-label='],
  },
  {
    file: 'src/pages/super-admin/SuperAdminPracticeCodingPage.tsx',
    expectedAttrs: ['id="practice-coding-search"', 'name="practice-coding-search"', 'type="search"', 'aria-label='],
  },
]

for (const { file, expectedAttrs } of pagesToCheck) {
  const fullPath = path.resolve(process.cwd(), file)
  const content = fs.readFileSync(fullPath, 'utf-8')
  for (const attr of expectedAttrs) {
    totalStaticChecks++
    baseAssert(
      content.includes(attr),
      `Expected ${file} to contain ${attr}`
    )
  }
  console.log(`✓ ${path.basename(file)} search input accessibility attributes verified`)
}

console.log(
  `✓ Group 4: All ${totalStaticChecks} static accessibility attribute checks passed across ${pagesToCheck.length} files (${pagesToCheck[0]?.expectedAttrs.length} attributes/file)!`
)

console.log('\n--- QA FIXES SUITE SUMMARY ---')
console.log(`Executable Unit Assertions : ${totalUnitAssertions} (Groups 1–3)`)
console.log(`Static Source-Code Checks  : ${totalStaticChecks} (Group 4 across ${pagesToCheck.length} files)`)
console.log(
  `Total Checks Performed     : ${totalUnitAssertions + totalStaticChecks} (${totalUnitAssertions} executable assertions + ${totalStaticChecks} static source checks)`
)
console.log('--- ALL QA FIXES & REGRESSION TESTS PASSED SUCCESSFULLY! ---')
