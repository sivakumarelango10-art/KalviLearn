import { type FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { AuthProvider } from '@/contexts/AuthContext'
import { GlobalErrorBoundary } from '@/components/common/GlobalErrorBoundary'

/**
 * Root Application Component for Kalvi Learn with GlobalErrorBoundary & AuthProvider
 */
export const App: FC = () => {
  return (
    <GlobalErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GlobalErrorBoundary>
  )
}

export default App
