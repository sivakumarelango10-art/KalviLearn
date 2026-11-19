export interface CampusLocationInput {
  city?: string | null
  state?: string | null
}

/**
 * Formats a campus's city and state into a display string.
 * Eliminates trailing commas when state is missing/null/whitespace.
 *
 * Examples:
 * - { city: 'Remote', state: null } -> 'Remote'
 * - { city: 'Bengaluru', state: 'Karnataka' } -> 'Bengaluru, Karnataka'
 * - { city: null, state: 'Karnataka' } -> 'Karnataka'
 * - { city: '', state: '' } -> 'Not configured'
 */
export function formatCampusLocation(
  campus?: CampusLocationInput | null,
  fallback: string = 'Not configured'
): string {
  if (!campus) return fallback

  const city = typeof campus.city === 'string' ? campus.city.trim() : ''
  const state = typeof campus.state === 'string' ? campus.state.trim() : ''

  const parts = [city, state].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : fallback
}
