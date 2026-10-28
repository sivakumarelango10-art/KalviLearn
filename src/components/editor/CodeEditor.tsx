import React, { useCallback, useRef, useEffect } from 'react'
import Editor, { EditorProps, OnMount } from '@monaco-editor/react'
import { applyCodeEditorRestrictions } from '@/lib/editorRestrictions'

export interface CodeEditorProps extends EditorProps {
  /**
   * Optional flag to disable restrictions if needed (e.g. for mentor inspection views).
   * Defaults to false (restrictions strictly enforced).
   */
  allowClipboard?: boolean
}

/**
 * Shared KalviLearn Monaco Code Editor Component
 *
 * Automatically enforces platform-wide restrictions against copy, cut, paste,
 * right-click context menu, and external drag-drop within source-code editor bounds.
 */
export const CodeEditor: React.FC<CodeEditorProps> = ({
  onMount,
  options,
  allowClipboard = false,
  ...props
}) => {
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [])

  const handleMount: OnMount = useCallback(
    (editor, monaco) => {
      if (!allowClipboard) {
        if (cleanupRef.current) {
          cleanupRef.current()
        }
        cleanupRef.current = applyCodeEditorRestrictions(editor, monaco)
      }

      if (onMount) {
        onMount(editor, monaco)
      }
    },
    [onMount, allowClipboard]
  )

  const mergedOptions = {
    ...(allowClipboard ? {} : { contextmenu: false }),
    ...options,
    // Guarantee contextmenu is false when restrictions are active even if options passed true
    ...(!allowClipboard ? { contextmenu: false } : {}),
  }

  return (
    <Editor
      {...props}
      options={mergedOptions}
      onMount={handleMount}
    />
  )
}

export default CodeEditor
