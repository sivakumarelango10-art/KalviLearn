import { useEffect } from 'react'

const APP_NAME = 'KalviLearn'
const SUFFIX = ` — ${APP_NAME}`

/**
 * Custom React hook to update the browser document title.
 * Automatically appends ' — KalviLearn' unless already present.
 * Ensures consistent title updates across client-side navigation.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    if (!title) return
    const trimmed = title.trim()
    if (!trimmed) return

    if (trimmed.endsWith(SUFFIX)) {
      document.title = trimmed
    } else {
      document.title = `${trimmed}${SUFFIX}`
    }
  }, [title])
}
