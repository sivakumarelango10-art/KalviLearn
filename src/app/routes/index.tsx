import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage } from '@/pages/auth/LoginPage'
import { AppLayout } from '@/layouts/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { LearnPage } from '@/pages/LearnPage'
import { PracticePage } from '@/pages/PracticePage'
import { ProblemArenaPage } from '@/pages/ProblemArenaPage'
import { RevisePage } from '@/pages/RevisePage'
import { ProfilePage } from '@/pages/ProfilePage'

/**
 * Kalvi Learn Application Route Definitions
 *
 * Connected Routes:
 * - /login -> Dedicated Authentication Entry
 * - / -> Redirects to /dashboard
 * - Platform Navigation under AppLayout:
 *   - /dashboard       -> Student Dashboard & Gamification
 *   - /learn           -> 10-Module & 89-Unit Curriculum
 *   - /practice        -> Practice Arena directory (85 problems across 3 Belts)
 *   - /practice/:slug  -> Monaco Coding Arena (Anti-Cheat, 10 Test Cases, Multi-language)
 *   - /revise          -> Solved Problem Vault, Read-only Solution Viewer, Re-attempt
 *   - /profile         -> Student stats, belt mastery badges, settings
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'learn',
        element: <LearnPage />,
      },
      {
        path: 'practice',
        element: <PracticePage />,
      },
      {
        path: 'practice/:slug',
        element: <ProblemArenaPage />,
      },
      {
        path: 'revise',
        element: <RevisePage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])
