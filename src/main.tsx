// Global listener for Vite chunk/preload errors across deployments (registered immediately)
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event: Event) => {
    const key = 'kalvi_last_preload_reload'
    const lastReload = sessionStorage.getItem(key)
    const now = Date.now()

    if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
      sessionStorage.setItem(key, String(now))
      console.warn('[Vite] Preload error detected. Reloading to obtain latest deployment assets...')
      window.location.reload()
    } else {
      console.error('[Vite] Preload error persisted after reload attempt:', event)
    }
  })
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import { App } from '@/app/App'
import { GlobalErrorBoundary } from '@/components/common/GlobalErrorBoundary'

const rootElement = document.getElementById('root')

if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <GlobalErrorBoundary>
          <App />
        </GlobalErrorBoundary>
      </StrictMode>
    )
  } catch (err) {
    console.error('Fatal initialization error in React mount:', err)
  }
}

