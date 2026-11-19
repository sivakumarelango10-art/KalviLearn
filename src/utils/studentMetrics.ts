export interface StudentTelemetryOverview {
  activeStudents?: number | null
  totalStudents?: number | null
}

export interface StudentDashboardMetricSelection {
  activeStudents: number | undefined
  studentRoleAccounts: number
  description: string
  footerLabel: string
  explanation: string
}

/**
 * Pure utility function to select and format student metrics for the Super Admin dashboard.
 * Explicitly separates:
 * - Active Students: active records from the `students` table.
 * - Student-role Accounts: accounts assigned the STUDENT role from the `users` table.
 *
 * Avoids any subset, ratio, or inactivity assumptions between the two distinct populations.
 */
export function selectStudentDashboardMetrics(
  overview?: StudentTelemetryOverview | null,
  roleDistribution?: Record<string, number | null | undefined> | null
): StudentDashboardMetricSelection {
  const activeStudents =
    overview?.activeStudents !== undefined && overview?.activeStudents !== null
      ? overview.activeStudents
      : undefined

  const studentRoleAccounts =
    typeof roleDistribution?.STUDENT === 'number' ? roleDistribution.STUDENT : 0

  return {
    activeStudents,
    studentRoleAccounts,
    description: 'Active records in students table',
    footerLabel: `${studentRoleAccounts.toLocaleString()} student-role accounts`,
    explanation:
      'Active students = active records in the students table. Student-role accounts = user accounts assigned the STUDENT role.',
  }
}
