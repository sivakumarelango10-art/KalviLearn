import { type FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { AuthProvider } from '@/contexts/AuthContext'

/**
 * Root Application Component for Kalvi Learn with AuthProvider
 */
export const App: FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
