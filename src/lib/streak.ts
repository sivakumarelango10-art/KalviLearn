/**
 * Authoritative Central Streak & Activity Calculation Engine
 * Timezone: Asia/Kolkata (India Standard Time - UTC+05:30)
 *
 * This module is the single source of truth for:
 * 1. Converting timestamps into consistent IST calendar dates (YYYY-MM-DD).
 * 2. Deduplicating multiple activities on the same calendar day.
 * 3. Calculating consecutive daily learning streaks.
 * 4. Handling today's activity, yesterday's activity, and streak resets.
 * 5. Managing month boundaries, leap years, and year transitions.
 */

const istDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

/**
 * Converts any timestamp (ISO string, Date object, or epoch ms) to an IST calendar date string (YYYY-MM-DD).
 * Safely handles timestamps without explicit timezone indicators (treating DB timestamps as UTC).
 */
export function getIstDateString(timestamp: string | Date | number | null | undefined): string | null {
  if (!timestamp) return null
  try {
    let date: Date
    if (timestamp instanceof Date) {
      date = timestamp
    } else if (typeof timestamp === 'number') {
      date = new Date(timestamp)
    } else {
      let str = String(timestamp).trim()
      // If the ISO string has no timezone offset (no Z and no +/-), treat as UTC from database
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str) && !/[Z+-]/.test(str.slice(19))) {
        str += 'Z'
      }
      date = new Date(str)
    }
    if (isNaN(date.getTime())) return null
    return istDateFormatter.format(date)
  } catch {
    return null
  }
}

/**
 * Shifts an IST calendar date string (YYYY-MM-DD) by dayDelta days.
 * Preserves month/year boundaries and leap years accurately using UTC date math.
 */
export function shiftDate(dateStr: string, dayDelta: number): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d + dayDelta))
  const year = dt.getUTCFullYear()
  const month = String(dt.getUTCMonth() + 1).padStart(2, '0')
  const day = String(dt.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export interface AuthoritativeStreakResult {
  streak: number
  activeToday: boolean
  lastActiveDate: string | null
  activeDaysCount: number
}

/**
 * Calculates the consecutive daily learning streak for a student based on activity timestamps.
 *
 * Rules:
 * - Streak increments for each consecutive calendar day with at least one qualifying activity.
 * - Multiple activities on the same calendar day count as 1 active day.
 * - An active streak is maintained if the student was active TODAY or YESTERDAY in IST.
 * - If the student was neither active today nor yesterday, the streak is 0.
 * - Future timestamps beyond today in IST are rejected.
 */
export function calculateAuthoritativeStreak(
  dates: (string | Date | number | null | undefined)[],
  refDate: Date = new Date()
): AuthoritativeStreakResult {
  if (!dates || dates.length === 0) {
    return { streak: 0, activeToday: false, lastActiveDate: null, activeDaysCount: 0 }
  }

  const todayStr = getIstDateString(refDate)
  if (!todayStr) {
    return { streak: 0, activeToday: false, lastActiveDate: null, activeDaysCount: 0 }
  }

  const yesterdayStr = shiftDate(todayStr, -1)

  const daySet = new Set<string>()
  for (const d of dates) {
    const formatted = getIstDateString(d)
    // Ignore invalid or future dates
    if (formatted && formatted <= todayStr) {
      daySet.add(formatted)
    }
  }

  if (daySet.size === 0) {
    return { streak: 0, activeToday: false, lastActiveDate: null, activeDaysCount: 0 }
  }

  const sortedDays = Array.from(daySet).sort().reverse()
  const lastActiveDate = sortedDays[0]
  const activeToday = daySet.has(todayStr)
  const activeYesterday = daySet.has(yesterdayStr)

  // If student was neither active today nor yesterday, the streak is broken (0)
  if (!activeToday && !activeYesterday) {
    return { streak: 0, activeToday: false, lastActiveDate, activeDaysCount: daySet.size }
  }

  // Count consecutive days backwards from the most recent active day in the streak window
  let currentCheck = activeToday ? todayStr : yesterdayStr
  let streak = 0

  while (daySet.has(currentCheck)) {
    streak++
    currentCheck = shiftDate(currentCheck, -1)
  }

  return { streak, activeToday, lastActiveDate, activeDaysCount: daySet.size }
}
