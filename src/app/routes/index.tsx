import { Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { MentorProtectedRoute } from '@/components/auth/MentorProtectedRoute'
import { CampusManagerProtectedRoute } from '@/components/auth/CampusManagerProtectedRoute'
import { AppLayout } from '@/layouts/AppLayout'
import { MentorLayout } from '@/layouts/MentorLayout'
import { CampusManagerLayout } from '@/layouts/CampusManagerLayout'
import { lazyWithRetry } from '@/lib/lazyWithRetry'
import { RouteErrorBoundary } from '@/components/common/RouteErrorBoundary'

// Safe code-split dynamic route imports with automatic deployment recovery
const LoginPage = lazyWithRetry(
  () => import('@/pages/auth/LoginPage'),
  'LoginPage'
)
const AuthCallbackPage = lazyWithRetry(
  () => import('@/pages/auth/AuthCallbackPage'),
  'AuthCallbackPage'
)
const DashboardPage = lazyWithRetry(
  () => import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
  'DashboardPage'
)
const LearningModeSelectPage = lazyWithRetry(
  () => import('@/pages/learn/LearningModeSelectPage').then((m) => ({ default: m.LearningModeSelectPage })),
  'LearningModeSelectPage'
)
const CoursesPage = lazyWithRetry(
  () => import('@/pages/learn/CoursesPage').then((m) => ({ default: m.CoursesPage })),
  'CoursesPage'
)
const CodingTopicsPage = lazyWithRetry(
  () => import('@/pages/learn/CodingTopicsPage').then((m) => ({ default: m.CodingTopicsPage })),
  'CodingTopicsPage'
)
const CodingTopicProblemsPage = lazyWithRetry(
  () => import('@/pages/learn/CodingTopicProblemsPage').then((m) => ({ default: m.CodingTopicProblemsPage })),
  'CodingTopicProblemsPage'
)
const CodingQuestionDetailPage = lazyWithRetry(
  () => import('@/pages/learn/CodingQuestionDetailPage').then((m) => ({ default: m.CodingQuestionDetailPage })),
  'CodingQuestionDetailPage'
)
const LearnWorkspacePage = lazyWithRetry(
  () => import('@/pages/learn/LearnWorkspacePage').then((m) => ({ default: m.LearnWorkspacePage })),
  'LearnWorkspacePage'
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
const MentorProfilePage = lazyWithRetry(
  () => import('@/pages/mentor/MentorProfilePage').then((m) => ({ default: m.MentorProfilePage })),
  'MentorProfilePage'
)

// Campus Manager Portal Pages
const CampusDashboardPage = lazyWithRetry(
  () => import('@/pages/campus/CampusDashboardPage').then((m) => ({ default: m.CampusDashboardPage })),
  'CampusDashboardPage'
)
const CampusMentorsPage = lazyWithRetry(
  () => import('@/pages/campus/CampusMentorsPage').then((m) => ({ default: m.CampusMentorsPage })),
  'CampusMentorsPage'
)
const CampusStudentsPage = lazyWithRetry(
  () => import('@/pages/campus/CampusStudentsPage').then((m) => ({ default: m.CampusStudentsPage })),
  'CampusStudentsPage'
)
const CampusAnalyticsPage = lazyWithRetry(
  () => import('@/pages/campus/CampusAnalyticsPage').then((m) => ({ default: m.CampusAnalyticsPage })),
  'CampusAnalyticsPage'
)
const CampusMentorLeaderboardPage = lazyWithRetry(
  () => import('@/pages/campus/CampusMentorLeaderboardPage').then((m) => ({ default: m.CampusMentorLeaderboardPage })),
  'CampusMentorLeaderboardPage'
)
const CampusStudentLeaderboardPage = lazyWithRetry(
  () => import('@/pages/campus/CampusStudentLeaderboardPage').then((m) => ({ default: m.CampusStudentLeaderboardPage })),
  'CampusStudentLeaderboardPage'
)
const CampusProfilePage = lazyWithRetry(
  () => import('@/pages/campus/CampusProfilePage').then((m) => ({ default: m.CampusProfilePage })),
  'CampusProfilePage'
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
    path: '/auth/callback',
    element: withSuspense(<AuthCallbackPage />),
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
            element: withSuspense(<LearningModeSelectPage />),
          },
          {
            path: 'learn/courses',
            element: withSuspense(<CoursesPage />),
          },
          {
            path: 'learn/coding',
            element: withSuspense(<CodingTopicsPage />),
          },
          {
            path: 'learn/coding/:topicId',
            element: withSuspense(<CodingTopicProblemsPage />),
          },
          {
            path: 'learn/coding/:topicId/:slug',
            element: withSuspense(<CodingQuestionDetailPage />),
          },
          {
            path: 'learn/coding/:topicId/:slug/solve',
            element: withSuspense(<LearnWorkspacePage />),
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
    path: '/campus',
    element: <CampusManagerProtectedRoute />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        element: <CampusManagerLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/campus/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: withSuspense(<CampusDashboardPage />),
          },
          {
            path: 'mentors',
            element: withSuspense(<CampusMentorsPage />),
          },
          {
            path: 'students',
            element: withSuspense(<CampusStudentsPage />),
          },
          {
            path: 'analytics',
            element: withSuspense(<CampusAnalyticsPage />),
          },
          {
            path: 'mentor-leaderboard',
            element: withSuspense(<CampusMentorLeaderboardPage />),
          },
          {
            path: 'student-leaderboard',
            element: withSuspense(<CampusStudentLeaderboardPage />),
          },
          {
            path: 'profile',
            element: withSuspense(<CampusProfilePage />),
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
    path: '/student',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/admin',
    element: <Navigate to="/campus/dashboard" replace />,
  },
  {
    path: '*',
    element: withSuspense(<NotFoundPage />),
    errorElement: <RouteErrorBoundary />,
  },
])
