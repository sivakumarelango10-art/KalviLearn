import { Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { MentorProtectedRoute } from '@/components/auth/MentorProtectedRoute'
import { AppLayout } from '@/layouts/AppLayout'
import { MentorLayout } from '@/layouts/MentorLayout'
import { lazyWithRetry } from '@/lib/lazyWithRetry'
import { RouteErrorBoundary } from '@/components/common/RouteErrorBoundary'

// Safe code-split dynamic route imports with automatic deployment recovery
const LoginPage = lazyWithRetry(() => import('@/pages/auth/LoginPage'), 'LoginPage')
const DashboardPage = lazyWithRetry(
  () => import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
  'DashboardPage'
)
const LearnPage = lazyWithRetry(
  () => import('@/pages/LearnPage').then((m) => ({ default: m.LearnPage })),
  'LearnPage'
)
const PracticePage = lazyWithRetry(
  () => import('@/pages/PracticePage').then((m) => ({ default: m.PracticePage })),
  'PracticePage'
)
const LanguagePracticePage = lazyWithRetry(
  () => import('@/pages/LanguagePracticePage').then((m) => ({ default: m.LanguagePracticePage })),
  'LanguagePracticePage'
)
const ProblemArenaPage = lazyWithRetry(
  () => import('@/pages/ProblemArenaPage').then((m) => ({ default: m.ProblemArenaPage })),
  'ProblemArenaPage'
)
const RevisePage = lazyWithRetry(
  () => import('@/pages/RevisePage').then((m) => ({ default: m.RevisePage })),
  'RevisePage'
)
const ProfilePage = lazyWithRetry(
  () => import('@/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })),
  'ProfilePage'
)
const NotFoundPage = lazyWithRetry(
  () => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
  'NotFoundPage'
)
const PrivacyPolicyPage = lazyWithRetry(
  () => import('@/pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })),
  'PrivacyPolicyPage'
)
const TermsAndConditionsPage = lazyWithRetry(
  () => import('@/pages/TermsAndConditionsPage').then((m) => ({ default: m.TermsAndConditionsPage })),
  'TermsAndConditionsPage'
)
const MentorDashboardPage = lazyWithRetry(
  () => import('@/pages/mentor/MentorDashboardPage').then((m) => ({ default: m.MentorDashboardPage })),
  'MentorDashboardPage'
)
const MentorStudentsPage = lazyWithRetry(
  () => import('@/pages/mentor/MentorStudentsPage').then((m) => ({ default: m.MentorStudentsPage })),
  'MentorStudentsPage'
)
const MentorSubmissionsPage = lazyWithRetry(
  () => import('@/pages/mentor/MentorSubmissionsPage').then((m) => ({ default: m.MentorSubmissionsPage })),
  'MentorSubmissionsPage'
)
const MentorCurriculumPage = lazyWithRetry(
  () => import('@/pages/mentor/MentorCurriculumPage').then((m) => ({ default: m.MentorCurriculumPage })),
  'MentorCurriculumPage'
)
const MentorAnnouncementsPage = lazyWithRetry(
  () => import('@/pages/mentor/MentorAnnouncementsPage').then((m) => ({ default: m.MentorAnnouncementsPage })),
  'MentorAnnouncementsPage'
)
const MentorProfilePage = lazyWithRetry(
  () => import('@/pages/mentor/MentorProfilePage').then((m) => ({ default: m.MentorProfilePage })),
  'MentorProfilePage'
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
 * Kalvi Learn Application Route Definitions with Code Splitting & Chunk Recovery
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: withSuspense(<LoginPage />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/privacy-policy',
    element: withSuspense(<PrivacyPolicyPage />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/terms-and-conditions',
    element: withSuspense(<TermsAndConditionsPage />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <RouteErrorBoundary />,
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
            path: 'practice/:lang',
            element: withSuspense(<LanguagePracticePage />),
          },
          {
            path: 'practice/:lang/:slug',
            element: withSuspense(<ProblemArenaPage />),
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
          {
            path: '*',
            element: withSuspense(<NotFoundPage />),
          },
        ],
      },
    ],
  },
  {
    path: '/mentor',
    element: <MentorProtectedRoute />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: '',
        element: <MentorLayout />,
        children: [
          {
            index: true,
            element: withSuspense(<MentorDashboardPage />),
          },
          {
            path: 'dashboard',
            element: withSuspense(<MentorDashboardPage />),
          },
          {
            path: 'students',
            element: withSuspense(<MentorStudentsPage />),
          },
          {
            path: 'submissions',
            element: withSuspense(<MentorSubmissionsPage />),
          },
          {
            path: 'curriculum',
            element: withSuspense(<MentorCurriculumPage />),
          },
          {
            path: 'announcements',
            element: withSuspense(<MentorAnnouncementsPage />),
          },
          {
            path: 'profile',
            element: withSuspense(<MentorProfilePage />),
          },
          {
            path: '*',
            element: withSuspense(<NotFoundPage />),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(<NotFoundPage />),
    errorElement: <RouteErrorBoundary />,
  },
])
