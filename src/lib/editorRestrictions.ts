/**
 * KalviLearn Code Editor Security & Anti-Plagiarism Restrictions
 *
 * Implements platform-wide, editor-scoped restrictions that prevent students
 * from copying code out of KalviLearn's coding editors or pasting external code into them:
 *
 * 1. Blocks Ctrl+C, Cmd+C (macOS), Ctrl+Insert from copying code out of the editor.
 * 2. Blocks Ctrl+X, Cmd+X (macOS) from cutting code (does not copy to clipboard, does not delete code via cut).
 * 3. Blocks Ctrl+V, Cmd+V (macOS), Shift+Insert from pasting external code into the editor.
 * 4. Disables Monaco context menu and intercepts DOM contextmenu on the editor container.
 * 5. Intercepts DOM clipboard events (copy, cut, paste, beforecopy, beforecut, beforepaste) in capture phase.
 * 6. Intercepts drag-and-drop text/file insertion (dragover, drop) into the editor.
 * 7. Intercepts middle-click paste (auxclick button 1) where supported.
 * 8. Overrides Monaco internal commands for clipboard shortcuts.
 * 9. Cleans up all DOM listeners and Monaco disposables on editor unmount/dispose.
 * 10. Prevents duplicate handler registration if called repeatedly on the same instance.
 *
 * NOTE ON SECURITY BOUNDARY:
 * These browser-level restrictions are an effective deterrent against casual/accidental
 * copy-pasting inside the web application. They do NOT guarantee absolute protection against
 * privileged client environments such as browser DevTools, browser extensions, OCR/screenshots,
 * or automated browser agents.
 */

export interface EditorDisposable {
  dispose: () => void
}

/**
 * Checks whether an event matches a Copy keyboard shortcut (Ctrl+C, Cmd+C, Ctrl+Insert)
 */
export function isCopyShortcut(e: { ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean; key?: string; code?: string }): boolean {
  const isModifier = Boolean(e.ctrlKey || e.metaKey)
  const key = e.key ? e.key.toLowerCase() : ''
  const code = e.code ? e.code.toLowerCase() : ''
  return (isModifier && (key === 'c' || code === 'keyc')) || (isModifier && (key === 'insert' || code === 'insert'))
}

/**
 * Checks whether an event matches a Paste keyboard shortcut (Ctrl+V, Cmd+V, Shift+Insert)
 */
export function isPasteShortcut(e: { ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean; key?: string; code?: string }): boolean {
  const isModifier = Boolean(e.ctrlKey || e.metaKey)
  const key = e.key ? e.key.toLowerCase() : ''
  const code = e.code ? e.code.toLowerCase() : ''
  return (isModifier && (key === 'v' || code === 'keyv')) || (Boolean(e.shiftKey) && (key === 'insert' || code === 'insert'))
}

/**
 * Checks whether an event matches a Cut keyboard shortcut (Ctrl+X, Cmd+X)
 */
export function isCutShortcut(e: { ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean; key?: string; code?: string }): boolean {
  const isModifier = Boolean(e.ctrlKey || e.metaKey)
  const key = e.key ? e.key.toLowerCase() : ''
  const code = e.code ? e.code.toLowerCase() : ''
  return isModifier && (key === 'x' || code === 'keyx')
}

/**
 * Applies scoped copy, cut, paste, context-menu, and drag-drop restrictions to a Monaco editor instance.
 * Returns a disposal cleanup function.
 */
export function applyCodeEditorRestrictions(
  editor: any,
  monaco?: any
): () => void {
  if (!editor) {
    return () => {}
  }

  // Idempotency guard: prevent duplicate registrations on the same editor instance
  if ((editor as any).__kalvi_restrictions_applied) {
    return (editor as any).__kalvi_restrictions_cleanup || (() => {})
  }
  ;(editor as any).__kalvi_restrictions_applied = true

  const disposables: Array<() => void> = []

  // Layer 1: Disable Monaco's built-in context menu
  try {
    if (typeof editor.updateOptions === 'function') {
      editor.updateOptions({ contextmenu: false })
    }
  } catch {
    // Ignore if options cannot be updated
  }

  // Layer 2: Scoped DOM event listeners on the editor root DOM node
  const domNode: HTMLElement | null =
    typeof editor.getDomNode === 'function' ? editor.getDomNode() : null

  if (domNode) {
    // Clipboard DOM event interceptor (capture phase)
    const handleClipboardEvent = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      if ('stopImmediatePropagation' in e) {
        e.stopImmediatePropagation()
      }
    }

    // Context menu interceptor
    const handleContextMenu = (e: MouseEvent | Event) => {
      e.preventDefault()
      e.stopPropagation()
      if ('stopImmediatePropagation' in e) {
        e.stopImmediatePropagation()
      }
    }

    // Drag-over interceptor (indicates drop is not allowed)
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'none'
      }
    }

    // Drop interceptor (blocks external text/file drops)
    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if ('stopImmediatePropagation' in e) {
        e.stopImmediatePropagation()
      }
    }

    // Middle-click paste interceptor (mouse button 1)
    const handleAuxClick = (e: MouseEvent) => {
      if (e.button === 1) {
        e.preventDefault()
        e.stopPropagation()
        if ('stopImmediatePropagation' in e) {
          e.stopImmediatePropagation()
        }
      }
    }

    // DOM Keydown interceptor (capture phase)
    const handleDomKeyDown = (e: KeyboardEvent) => {
      if (isCopyShortcut(e) || isPasteShortcut(e) || isCutShortcut(e)) {
        e.preventDefault()
        e.stopPropagation()
        if ('stopImmediatePropagation' in e) {
          e.stopImmediatePropagation()
        }
      }
    }

    // Register all DOM events in CAPTURE phase so they run before Monaco's internal listeners
    domNode.addEventListener('copy', handleClipboardEvent, true)
    domNode.addEventListener('cut', handleClipboardEvent, true)
    domNode.addEventListener('paste', handleClipboardEvent, true)
    domNode.addEventListener('beforecopy', handleClipboardEvent, true)
    domNode.addEventListener('beforecut', handleClipboardEvent, true)
    domNode.addEventListener('beforepaste', handleClipboardEvent, true)
    domNode.addEventListener('contextmenu', handleContextMenu, true)
    domNode.addEventListener('dragover', handleDragOver as any, true)
    domNode.addEventListener('drop', handleDrop as any, true)
    domNode.addEventListener('auxclick', handleAuxClick as any, true)
    domNode.addEventListener('keydown', handleDomKeyDown, true)

    disposables.push(() => {
      domNode.removeEventListener('copy', handleClipboardEvent, true)
      domNode.removeEventListener('cut', handleClipboardEvent, true)
      domNode.removeEventListener('paste', handleClipboardEvent, true)
      domNode.removeEventListener('beforecopy', handleClipboardEvent, true)
      domNode.removeEventListener('beforecut', handleClipboardEvent, true)
      domNode.removeEventListener('beforepaste', handleClipboardEvent, true)
      domNode.removeEventListener('contextmenu', handleContextMenu, true)
      domNode.removeEventListener('dragover', handleDragOver as any, true)
      domNode.removeEventListener('drop', handleDrop as any, true)
      domNode.removeEventListener('auxclick', handleAuxClick as any, true)
      domNode.removeEventListener('keydown', handleDomKeyDown, true)
    })
  }

  // Layer 3: Monaco onKeyDown event listener
  try {
    if (typeof editor.onKeyDown === 'function') {
      const keySub = editor.onKeyDown((e: any) => {
        const isModifier = Boolean(e.ctrlKey || e.metaKey)
        const browserEvent = e.browserEvent

        // Check using browser event if present
        let matched = false
        if (browserEvent) {
          matched = isCopyShortcut(browserEvent) || isPasteShortcut(browserEvent) || isCutShortcut(browserEvent)
        }

        // Check using Monaco KeyCodes if available
        if (!matched && monaco?.KeyCode) {
          const isMonacoCopy = isModifier && (e.keyCode === monaco.KeyCode.KeyC || e.keyCode === monaco.KeyCode.Insert)
          const isMonacoPaste = (isModifier && e.keyCode === monaco.KeyCode.KeyV) || (Boolean(e.shiftKey) && e.keyCode === monaco.KeyCode.Insert)
          const isMonacoCut = isModifier && e.keyCode === monaco.KeyCode.KeyX
          matched = isMonacoCopy || isMonacoPaste || isMonacoCut
        }

        if (matched) {
          e.preventDefault?.()
          e.stopPropagation?.()
          browserEvent?.preventDefault?.()
          browserEvent?.stopPropagation?.()
          browserEvent?.stopImmediatePropagation?.()
        }
      })

      if (keySub && typeof keySub.dispose === 'function') {
        disposables.push(() => keySub.dispose())
      }
    }
  } catch {
    // Ignore Monaco key subscription failure
  }

  // Layer 4: Monaco editor commands overriding (no-ops)
  try {
    if (monaco?.KeyMod && monaco?.KeyCode && typeof editor.addCommand === 'function') {
      const noop = () => {}
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC, noop)
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, noop)
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyX, noop)
      editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Insert, noop)
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Insert, noop)
    }
  } catch {
    // Ignore if commands cannot be bound
  }

  // Comprehensive cleanup function
  let cleanedUp = false
  const cleanup = () => {
    if (cleanedUp) return
    cleanedUp = true
    delete (editor as any).__kalvi_restrictions_applied
    delete (editor as any).__kalvi_restrictions_cleanup

    for (const dispose of disposables) {
      try {
        dispose()
      } catch {
        // Safe disposal
      }
    }
    disposables.length = 0
  }

  ;(editor as any).__kalvi_restrictions_cleanup = cleanup

  // Automatically attach to editor's own dispose lifecycle
  try {
    if (typeof editor.onDidDispose === 'function') {
      editor.onDidDispose(cleanup)
    }
  } catch {
    // Ignore if onDidDispose unavailable
  }

  return cleanup
}
