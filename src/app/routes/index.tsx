import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { AppLayout } from '@/layouts/AppLayout'

// Code-split dynamic route imports for optimal bundle size
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
)
const LearnPage = lazy(() =>
  import('@/pages/LearnPage').then((m) => ({ default: m.LearnPage }))
)
const PracticePage = lazy(() =>
  import('@/pages/PracticePage').then((m) => ({ default: m.PracticePage }))
)
const ProblemArenaPage = lazy(() =>
  import('@/pages/ProblemArenaPage').then((m) => ({ default: m.ProblemArenaPage }))
)
const RevisePage = lazy(() =>
  import('@/pages/RevisePage').then((m) => ({ default: m.RevisePage }))
)
const ProfilePage = lazy(() =>
  import('@/pages/ProfilePage').then((m) => ({ default: m.ProfilePage }))
)

const PageLoader = () => (
  <div className="h-full min-h-[50vh] w-full flex flex-col items-center justify-center bg-transparent py-16 space-y-3 animate-in fade-in duration-150">
    <div className="w-5 h-5 border-2 border-[#ED2A2B] border-t-transparent rounded-full animate-spin" />
    <span className="text-xs font-semibold text-neutral-400">Loading module...</span>
  </div>
)

const withSuspense = (Component: ReactNode) => (
  <Suspense fallback={<PageLoader />}>{Component}</Suspense>
)

/**
 * Kalvi Learn Application Route Definitions with Code Splitting & Whitelist Guard
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: withSuspense(<LoginPage />),
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: withSuspense(<DashboardPage />),
          },
          {
            path: 'learn',
            element: withSuspense(<LearnPage />),
          },
          {
            path: 'practice',
            element: withSuspense(<PracticePage />),
          },
          {
            path: 'practice/:slug',
            element: withSuspense(<ProblemArenaPage />),
          },
          {
            path: 'revise',
            element: withSuspense(<RevisePage />),
          },
          {
            path: 'profile',
            element: withSuspense(<ProfilePage />),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
])
