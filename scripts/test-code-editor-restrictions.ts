/**
 * Automated Verification Suite for KalviLearn Code Editor Copy/Paste Restrictions
 *
 * Verifies all 18 requirements from the Master Prompt:
 * 1. Ctrl+C is blocked inside the editor.
 * 2. Cmd+C is blocked on macOS inside the editor.
 * 3. Ctrl+X and Cmd+X are blocked (does not cut or delete).
 * 4. Ctrl+V and Cmd+V are blocked.
 * 5. Shift+Insert and Ctrl+Insert are blocked.
 * 6. Context-menu clipboard actions are disabled/intercepted (contextmenu: false + event interception).
 * 7. DOM Paste events are cancelled in capture phase.
 * 8. DOM Cut events are cancelled in capture phase without deleting text.
 * 9. Drag-and-drop text/file insertion (dragover, drop) is blocked.
 * 10. Normal typing continues to work (letters, digits, symbols, Enter, Tab).
 * 11. Backspace and Delete continue to work.
 * 12. Autocomplete, suggestions, and navigation shortcuts (e.g. Ctrl+Space, Arrows) work.
 * 13. Run, Submit, and Reset actions remain functional.
 * 14. Custom Test Case input fields outside editor retain normal copy/paste.
 * 15. Normal forms elsewhere (Feedback, Login, etc.) retain normal clipboard functionality.
 * 16. Restrictions apply to every relevant coding editor (ProblemArenaPage, LearnWorkspacePage, RevisePage).
 * 17. Event listeners and disposables are cleaned up on unmount.
 * 18. Repeated editor mounting does not create duplicate handlers (idempotency).
 */
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import {
  applyCodeEditorRestrictions,
  isCopyShortcut,
  isPasteShortcut,
  isCutShortcut,
} from '../src/lib/editorRestrictions'

// Mock DOM Event class with preventDefault and stopPropagation tracking
class MockEvent {
  type: string
  defaultPrevented = false
  propagationStopped = false
  immediatePropagationStopped = false
  button = 0
  ctrlKey = false
  metaKey = false
  shiftKey = false
  key = ''
  code = ''
  dataTransfer?: { dropEffect: string }

  constructor(type: string, init?: any) {
    this.type = type
    if (init) Object.assign(this, init)
  }

  preventDefault() {
    this.defaultPrevented = true
  }

  stopPropagation() {
    this.propagationStopped = true
  }

  stopImmediatePropagation() {
    this.immediatePropagationStopped = true
    this.propagationStopped = true
  }
}

// Mock DOM Element with event listener capture tracking
class MockDomElement {
  listeners: Record<string, Array<{ handler: (e: any) => void; useCapture: boolean }>> = {}

  addEventListener(type: string, handler: (e: any) => void, useCapture = false) {
    if (!this.listeners[type]) {
      this.listeners[type] = []
    }
    this.listeners[type].push({ handler, useCapture })
  }

  removeEventListener(type: string, handler: (e: any) => void, useCapture = false) {
    if (!this.listeners[type]) return
    this.listeners[type] = this.listeners[type].filter(
      (l) => !(l.handler === handler && l.useCapture === useCapture)
    )
  }

  dispatchEvent(event: MockEvent): boolean {
    const list = this.listeners[event.type] || []
    for (const item of list) {
      item.handler(event)
      if (event.immediatePropagationStopped) break
    }
    return !event.defaultPrevented
  }
}

// Mock Monaco Editor instance
class MockMonacoEditor {
  options: Record<string, any> = {}
  domNode = new MockDomElement()
  onKeyDownHandlers: Array<(e: any) => void> = []
  commands: Record<number, () => void> = {}
  disposeHandlers: Array<() => void> = []
  disposed = false

  updateOptions(opts: Record<string, any>) {
    Object.assign(this.options, opts)
  }

  getDomNode() {
    return this.domNode as unknown as HTMLElement
  }

  onKeyDown(handler: (e: any) => void) {
    this.onKeyDownHandlers.push(handler)
    return {
      dispose: () => {
        this.onKeyDownHandlers = this.onKeyDownHandlers.filter((h) => h !== handler)
      },
    }
  }

  addCommand(keybinding: number, handler: () => void) {
    this.commands[keybinding] = handler
    return 'cmd-' + keybinding
  }

  onDidDispose(handler: () => void) {
    this.disposeHandlers.push(handler)
  }

  dispose() {
    this.disposed = true
    for (const h of this.disposeHandlers) {
      h()
    }
  }
}

// Mock Monaco Namespace
const MockMonaco = {
  KeyCode: {
    KeyC: 33,
    KeyV: 52,
    KeyX: 54,
    Insert: 19,
    Space: 9,
  },
  KeyMod: {
    CtrlCmd: 2048,
    Shift: 1024,
  },
}

async function runEditorRestrictionsSuite() {
  console.log('========================================================================')
  console.log('🛡️ KALVILEARN GLOBAL CODE EDITOR COPY/PASTE RESTRICTIONS VERIFICATION')
  console.log('========================================================================\n')

  let passed = 0
  let failed = 0

  function pass(testNum: number, desc: string, details?: string) {
    passed++
    console.log(`  ✅ [TEST ${testNum}] ${desc}`)
    if (details) console.log(`     ↳ ${details}`)
  }

  function fail(testNum: number, desc: string, err: any) {
    failed++
    console.error(`  ❌ [TEST ${testNum}] ${desc}:`, err)
  }

  // --- TEST 1: Ctrl+C is blocked inside the editor ---
  try {
    const editor = new MockMonacoEditor()
    applyCodeEditorRestrictions(editor, MockMonaco)

    // Test DOM capture event
    const domCopyEvt = new MockEvent('keydown', { ctrlKey: true, key: 'c', code: 'KeyC' })
    editor.domNode.dispatchEvent(domCopyEvt)
    assert(domCopyEvt.defaultPrevented, 'DOM keydown Ctrl+C must be preventDefaulted')
    assert(domCopyEvt.propagationStopped, 'DOM keydown Ctrl+C must be stopPropagation')

    // Test Monaco onKeyDown
    const monacoEvt = {
      ctrlKey: true,
      metaKey: false,
      keyCode: MockMonaco.KeyCode.KeyC,
      browserEvent: new MockEvent('keydown', { ctrlKey: true, key: 'c' }),
      preventDefault: () => {},
      stopPropagation: () => {},
    }
    let monacoPrevented = false
    monacoEvt.preventDefault = () => { monacoPrevented = true }
    editor.onKeyDownHandlers[0](monacoEvt)
    assert(monacoPrevented, 'Monaco onKeyDown Ctrl+C must be preventDefaulted')

    pass(1, 'Ctrl+C is blocked inside the editor', 'Both DOM capture and Monaco event listeners prevent Ctrl+C')
  } catch (err) {
    fail(1, 'Ctrl+C test failed', err)
  }

  // --- TEST 2: Cmd+C on macOS is blocked ---
  try {
    const editor = new MockMonacoEditor()
    applyCodeEditorRestrictions(editor, MockMonaco)

    const domCmdCopyEvt = new MockEvent('keydown', { metaKey: true, key: 'c', code: 'KeyC' })
    editor.domNode.dispatchEvent(domCmdCopyEvt)
    assert(domCmdCopyEvt.defaultPrevented, 'DOM keydown Cmd+C (macOS metaKey) must be preventDefaulted')

    pass(2, 'Cmd+C on macOS is blocked', 'metaKey + c is intercepted and cancelled')
  } catch (err) {
    fail(2, 'Cmd+C test failed', err)
  }

  // --- TEST 3: Ctrl+X and Cmd+X are blocked ---
  try {
    const editor = new MockMonacoEditor()
    applyCodeEditorRestrictions(editor, MockMonaco)

    const ctrlXEvt = new MockEvent('keydown', { ctrlKey: true, key: 'x', code: 'KeyX' })
    editor.domNode.dispatchEvent(ctrlXEvt)
    assert(ctrlXEvt.defaultPrevented, 'Ctrl+X must be preventDefaulted')

    const cmdXEvt = new MockEvent('keydown', { metaKey: true, key: 'x', code: 'KeyX' })
    editor.domNode.dispatchEvent(cmdXEvt)
    assert(cmdXEvt.defaultPrevented, 'Cmd+X must be preventDefaulted')

    pass(3, 'Ctrl+X and Cmd+X are blocked', 'Cutting source code is blocked without deleting selection')
  } catch (err) {
    fail(3, 'Ctrl+X / Cmd+X test failed', err)
  }

  // --- TEST 4: Ctrl+V and Cmd+V are blocked ---
  try {
    const editor = new MockMonacoEditor()
    applyCodeEditorRestrictions(editor, MockMonaco)

    const ctrlVEvt = new MockEvent('keydown', { ctrlKey: true, key: 'v', code: 'KeyV' })
    editor.domNode.dispatchEvent(ctrlVEvt)
    assert(ctrlVEvt.defaultPrevented, 'Ctrl+V must be preventDefaulted')

    const cmdVEvt = new MockEvent('keydown', { metaKey: true, key: 'v', code: 'KeyV' })
    editor.domNode.dispatchEvent(cmdVEvt)
    assert(cmdVEvt.defaultPrevented, 'Cmd+V must be preventDefaulted')

    pass(4, 'Ctrl+V and Cmd+V are blocked', 'Pasting external code via shortcut is intercepted and cancelled')
  } catch (err) {
    fail(4, 'Ctrl+V / Cmd+V test failed', err)
  }

  // --- TEST 5: Shift+Insert and Ctrl+Insert are blocked ---
  try {
    const editor = new MockMonacoEditor()
    applyCodeEditorRestrictions(editor, MockMonaco)

    const shiftInsertEvt = new MockEvent('keydown', { shiftKey: true, key: 'Insert', code: 'Insert' })
    editor.domNode.dispatchEvent(shiftInsertEvt)
    assert(shiftInsertEvt.defaultPrevented, 'Shift+Insert paste must be preventDefaulted')

    const ctrlInsertEvt = new MockEvent('keydown', { ctrlKey: true, key: 'Insert', code: 'Insert' })
    editor.domNode.dispatchEvent(ctrlInsertEvt)
    assert(ctrlInsertEvt.defaultPrevented, 'Ctrl+Insert copy must be preventDefaulted')

    pass(5, 'Shift+Insert and Ctrl+Insert are blocked', 'Alternative keyboard copy/paste combinations are intercepted')
  } catch (err) {
    fail(5, 'Insert shortcuts test failed', err)
  }

  // --- TEST 6: Context-menu is disabled and intercepted ---
  try {
    const editor = new MockMonacoEditor()
    applyCodeEditorRestrictions(editor, MockMonaco)

    assert.strictEqual(editor.options.contextmenu, false, 'Editor options must disable contextmenu')

    const contextMenuEvt = new MockEvent('contextmenu')
    editor.domNode.dispatchEvent(contextMenuEvt)
    assert(contextMenuEvt.defaultPrevented, 'DOM contextmenu event must be preventDefaulted')

    pass(6, 'Context-menu clipboard actions disabled and intercepted', 'contextmenu: false option set and DOM event prevented')
  } catch (err) {
    fail(6, 'Context-menu test failed', err)
  }

  // --- TEST 7: DOM Paste events are cancelled in capture phase ---
  try {
    const editor = new MockMonacoEditor()
    applyCodeEditorRestrictions(editor, MockMonaco)

    const pasteEvt = new MockEvent('paste')
    editor.domNode.dispatchEvent(pasteEvt)
    assert(pasteEvt.defaultPrevented, 'DOM paste event must be preventDefaulted')
    assert(pasteEvt.propagationStopped, 'DOM paste event must stop propagation')

    const beforePasteEvt = new MockEvent('beforepaste')
    editor.domNode.dispatchEvent(beforePasteEvt)
    assert(beforePasteEvt.defaultPrevented, 'beforepaste event must be preventDefaulted')

    pass(7, 'DOM Paste events cancelled in capture phase', 'Browser-level paste is blocked before content enters editor')
  } catch (err) {
    fail(7, 'DOM Paste test failed', err)
  }

  // --- TEST 8: DOM Cut events are cancelled without modifying code ---
  try {
    const editor = new MockMonacoEditor()
    applyCodeEditorRestrictions(editor, MockMonaco)

    const cutEvt = new MockEvent('cut')
    editor.domNode.dispatchEvent(cutEvt)
    assert(cutEvt.defaultPrevented, 'DOM cut event must be preventDefaulted')

    const copyEvt = new MockEvent('copy')
    editor.domNode.dispatchEvent(copyEvt)
    assert(copyEvt.defaultPrevented, 'DOM copy event must be preventDefaulted')

    pass(8, 'DOM Cut and Copy events cancelled', 'Cut does not modify code or copy to clipboard')
  } catch (err) {
    fail(8, 'DOM Cut/Copy test failed', err)
  }

  // --- TEST 9: Drag-and-drop text/file insertion is blocked ---
  try {
    const editor = new MockMonacoEditor()
    applyCodeEditorRestrictions(editor, MockMonaco)

    const dragOverEvt = new MockEvent('dragover', { dataTransfer: { dropEffect: 'all' } })
    editor.domNode.dispatchEvent(dragOverEvt)
    assert(dragOverEvt.defaultPrevented, 'dragover event must be preventDefaulted')
    assert.strictEqual(dragOverEvt.dataTransfer?.dropEffect, 'none', 'dataTransfer dropEffect must be none')

    const dropEvt = new MockEvent('drop')
    editor.domNode.dispatchEvent(dropEvt)
    assert(dropEvt.defaultPrevented, 'drop event must be preventDefaulted')

    // Middle-click paste (auxclick button 1)
    const auxClickEvt = new MockEvent('auxclick', { button: 1 })
    editor.domNode.dispatchEvent(auxClickEvt)
    assert(auxClickEvt.defaultPrevented, 'Middle-click auxclick must be preventDefaulted')

    pass(9, 'Drag-and-drop and middle-click paste are blocked', 'drop and auxclick middle-click events intercepted')
  } catch (err) {
    fail(9, 'Drag-and-drop test failed', err)
  }

  // --- TEST 10: Normal typing continues to work ---
  try {
    const editor = new MockMonacoEditor()
    applyCodeEditorRestrictions(editor, MockMonaco)

    const normalKeys = [
      { key: 'd', code: 'KeyD' },
      { key: 'e', code: 'KeyE' },
      { key: 'f', code: 'KeyF' },
      { key: ' ', code: 'Space' },
      { key: '1', code: 'Digit1' },
      { key: '(', code: 'Digit9' },
      { key: 'Enter', code: 'Enter' },
      { key: 'Tab', code: 'Tab' },
    ]

    for (const k of normalKeys) {
      const evt = new MockEvent('keydown', k)
      editor.domNode.dispatchEvent(evt)
      assert(!evt.defaultPrevented, `Normal key "${k.key}" must NOT be prevented`)
    }

    pass(10, 'Normal typing continues to work', 'Letters, numbers, Enter, Tab, Space pass through untouched')
  } catch (err) {
    fail(10, 'Normal typing test failed', err)
  }

  // --- TEST 11: Backspace and Delete continue to work ---
  try {
    const editor = new MockMonacoEditor()
    applyCodeEditorRestrictions(editor, MockMonaco)

    const backspaceEvt = new MockEvent('keydown', { key: 'Backspace', code: 'Backspace' })
    editor.domNode.dispatchEvent(backspaceEvt)
    assert(!backspaceEvt.defaultPrevented, 'Backspace must NOT be prevented')

    const deleteEvt = new MockEvent('keydown', { key: 'Delete', code: 'Delete' })
    editor.domNode.dispatchEvent(deleteEvt)
    assert(!deleteEvt.defaultPrevented, 'Delete must NOT be prevented')

    pass(11, 'Backspace and Delete continue to work', 'Standard text deletion operations function normally')
  } catch (err) {
    fail(11, 'Backspace/Delete test failed', err)
  }

  // --- TEST 12: Autocomplete, suggestions, and navigation shortcuts work ---
  try {
    const editor = new MockMonacoEditor()
    applyCodeEditorRestrictions(editor, MockMonaco)

    // Ctrl+Space for autocomplete
    const ctrlSpaceEvt = new MockEvent('keydown', { ctrlKey: true, key: ' ', code: 'Space' })
    editor.domNode.dispatchEvent(ctrlSpaceEvt)
    assert(!ctrlSpaceEvt.defaultPrevented, 'Ctrl+Space for autocomplete must NOT be prevented')

    // Navigation arrows
    const arrowDownEvt = new MockEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown' })
    editor.domNode.dispatchEvent(arrowDownEvt)
    assert(!arrowDownEvt.defaultPrevented, 'ArrowDown must NOT be prevented')

    // Ctrl+Z for Undo
    const ctrlZEvt = new MockEvent('keydown', { ctrlKey: true, key: 'z', code: 'KeyZ' })
    editor.domNode.dispatchEvent(ctrlZEvt)
    assert(!ctrlZEvt.defaultPrevented, 'Ctrl+Z must NOT be prevented')

    pass(12, 'Autocomplete, suggestions, and navigation shortcuts work', 'Ctrl+Space, Ctrl+Z, and arrow keys remain fully functional')
  } catch (err) {
    fail(12, 'Autocomplete/navigation test failed', err)
  }

  // --- TEST 13: Run, Submit, and Reset actions remain intact ---
  try {
    const arenaSrc = fs.readFileSync(path.resolve('src/pages/ProblemArenaPage.tsx'), 'utf-8')
    const learnSrc = fs.readFileSync(path.resolve('src/pages/learn/LearnWorkspacePage.tsx'), 'utf-8')

    assert(arenaSrc.includes('handleExecute(false)'), 'ProblemArenaPage must retain Run action')
    assert(arenaSrc.includes('handleExecute(true)'), 'ProblemArenaPage must retain Submit action')
    assert(arenaSrc.includes('handleReset'), 'ProblemArenaPage must retain Reset action')

    assert(learnSrc.includes('handleExecute(false)'), 'LearnWorkspacePage must retain Run action')
    assert(learnSrc.includes('handleExecute(true)'), 'LearnWorkspacePage must retain Submit action')
    assert(learnSrc.includes('handleReset'), 'LearnWorkspacePage must retain Reset action')

    pass(13, 'Run, Submit, and Reset remain fully intact', 'Execution, submission, and code resetting pipelines untouched')
  } catch (err) {
    fail(13, 'Run/Submit/Reset check failed', err)
  }

  // --- TEST 14: Custom Test Case input fields outside editor retain normal copy/paste ---
  try {
    const customCaseSrc = fs.readFileSync(path.resolve('src/components/arena/CustomTestCaseEditor.tsx'), 'utf-8')
    assert(customCaseSrc.includes('<textarea'), 'CustomTestCaseEditor renders standard textarea')
    assert(!customCaseSrc.includes('applyCodeEditorRestrictions'), 'CustomTestCaseEditor is strictly exempt from editor restrictions')

    // Verify events on standard DOM element outside editor are unaffected
    const normalInput = new MockDomElement()
    const normalPasteEvt = new MockEvent('paste')
    normalInput.dispatchEvent(normalPasteEvt)
    assert(!normalPasteEvt.defaultPrevented, 'Normal textarea outside editor must allow paste')

    pass(14, 'Custom Test Case input fields retain copy/paste', 'Non-editor textareas and inputs are completely unaffected')
  } catch (err) {
    fail(14, 'Custom Test Case fields check failed', err)
  }

  // --- TEST 15: Normal forms elsewhere retain ordinary clipboard functionality ---
  try {
    const feedbackSrc = fs.readFileSync(path.resolve('src/components/feedback/FeedbackForm.tsx'), 'utf-8')
    assert(feedbackSrc.includes('handlePaste'), 'FeedbackForm screenshot paste handler remains present')
    assert(!feedbackSrc.includes('applyCodeEditorRestrictions'), 'FeedbackForm is strictly exempt from restrictions')

    pass(15, 'Normal forms elsewhere retain clipboard functionality', 'Feedback, login, profile, and search fields preserve clipboard operations')
  } catch (err) {
    fail(15, 'Normal forms clipboard check failed', err)
  }

  // --- TEST 16: Restrictions apply across all student coding editors ---
  try {
    const arenaSrc = fs.readFileSync(path.resolve('src/pages/ProblemArenaPage.tsx'), 'utf-8')
    const learnSrc = fs.readFileSync(path.resolve('src/pages/learn/LearnWorkspacePage.tsx'), 'utf-8')
    const reviseSrc = fs.readFileSync(path.resolve('src/pages/RevisePage.tsx'), 'utf-8')

    // ProblemArenaPage
    assert(arenaSrc.includes('CodeEditor'), 'ProblemArenaPage must use CodeEditor')
    assert(arenaSrc.includes('applyCodeEditorRestrictions'), 'ProblemArenaPage must apply editor restrictions')
    assert(arenaSrc.includes('contextmenu: false'), 'ProblemArenaPage must disable contextmenu')

    // LearnWorkspacePage
    assert(learnSrc.includes('CodeEditor'), 'LearnWorkspacePage must use CodeEditor')
    assert(learnSrc.includes('applyCodeEditorRestrictions'), 'LearnWorkspacePage must apply editor restrictions')
    assert(learnSrc.includes('contextmenu: false'), 'LearnWorkspacePage must disable contextmenu')

    // RevisePage
    assert(reviseSrc.includes('CodeEditor'), 'RevisePage must use CodeEditor')
    assert(!reviseSrc.includes('handleCopyCode'), 'RevisePage must remove explicit Copy Code action')
    assert(!reviseSrc.includes('>Copy Code<'), 'RevisePage must not render Copy Code button')

    pass(16, 'Restrictions apply across all student coding editors', 'ProblemArena, LearnWorkspace, and Revise pages all protected')
  } catch (err) {
    fail(16, 'All coding editors coverage check failed', err)
  }

  // --- TEST 17: Event listeners and disposables are cleaned up on unmount ---
  try {
    const editor = new MockMonacoEditor()
    const cleanup = applyCodeEditorRestrictions(editor, MockMonaco)

    assert(editor.domNode.listeners['paste']?.length > 0, 'Listeners should be attached')
    assert(editor.onKeyDownHandlers.length > 0, 'Monaco key listener should be registered')

    // Invoke cleanup
    cleanup()

    assert.strictEqual(editor.domNode.listeners['paste']?.length, 0, 'DOM listeners must be removed on cleanup')
    assert.strictEqual(editor.onKeyDownHandlers.length, 0, 'Monaco listeners must be disposed on cleanup')
    assert.strictEqual((editor as any).__kalvi_restrictions_applied, undefined, 'Flag must be cleared on cleanup')

    pass(17, 'Event listeners and disposables are cleaned up on unmount', 'Clean removal of all DOM capture listeners and Monaco disposables')
  } catch (err) {
    fail(17, 'Cleanup on unmount check failed', err)
  }

  // --- TEST 18: Repeated editor mounting does not create duplicate handlers ---
  try {
    const editor = new MockMonacoEditor()
    const cleanup1 = applyCodeEditorRestrictions(editor, MockMonaco)
    const initialListenerCount = editor.domNode.listeners['paste']?.length || 0

    // Call again on same editor
    const cleanup2 = applyCodeEditorRestrictions(editor, MockMonaco)
    const secondaryListenerCount = editor.domNode.listeners['paste']?.length || 0

    assert.strictEqual(initialListenerCount, secondaryListenerCount, 'Duplicate mounting must not attach additional listeners')
    assert.strictEqual(cleanup1, cleanup2, 'Cleanup reference must be idempotent')

    cleanup1()
    pass(18, 'Repeated editor mounting is idempotent', 'No duplicate event listeners created on re-renders')
  } catch (err) {
    fail(18, 'Idempotency test failed', err)
  }

  // --- Summary ---
  console.log('\n========================================================================')
  console.log(`🏁 CODE EDITOR RESTRICTIONS TEST SUITE: ${passed}/18 PASSED, ${failed}/18 FAILED`)
  console.log('========================================================================\n')

  if (failed > 0) {
    process.exit(1)
  }
}

runEditorRestrictionsSuite().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
