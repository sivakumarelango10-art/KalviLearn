import { type FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

/**
 * Root Application Component for Kalvi Learn
 */
export const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App
