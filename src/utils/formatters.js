/**
 * Format a number as currency (USD).
 * @param {number} amount
 * @returns {string} e.g. "$12,345.00"
 */
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)

/**
 * Format a number with thousands separators.
 * @param {number} num
 * @returns {string} e.g. "12,345"
 */
export const formatNumber = (num) =>
  new Intl.NumberFormat('en-US').format(num)

/**
 * Format a date to a readable string.
 * @param {string|Date} date
 * @returns {string} e.g. "Mar 2, 2026"
 */
export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date))

/**
 * Format minutes to "Xh Ym" string.
 * @param {number} minutes
 */
export const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

/**
 * Truncate a string to maxLength, adding ellipsis.
 * @param {string} str
 * @param {number} maxLength
 */
export const truncate = (str, maxLength = 50) =>
  str.length > maxLength ? `${str.slice(0, maxLength)}…` : str

/**
 * Returns initials from a full name (max 2 letters).
 * @param {string} name
 */
export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return ''
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
