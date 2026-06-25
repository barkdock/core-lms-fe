import { useState, useEffect } from 'react'
import { statsApi } from '@/api/statsApi'
import { useSelector } from 'react-redux'
import { ROLES } from '@/utils/constants'

// ─── Mock Data (replace with real API when backend is ready) ─────────────────

const MOCK_ADMIN_STATS = {
  cards: [
    { label: 'Total Revenue', value: '$124,560', change: '+12%', trend: 'up', color: 'indigo' },
    { label: 'Active Users', value: '8,342', change: '+8%', trend: 'up', color: 'emerald' },
    { label: 'Pending Approvals', value: '24', change: '-3', trend: 'down', color: 'amber' },
    { label: 'Total Courses', value: '340', change: '+15', trend: 'up', color: 'violet' },
  ],
  chartData: [
    { month: 'Aug', users: 3200 },
    { month: 'Sep', users: 4100 },
    { month: 'Oct', users: 3800 },
    { month: 'Nov', users: 5200 },
    { month: 'Dec', users: 6100 },
    { month: 'Jan', users: 7300 },
    { month: 'Feb', users: 8342 },
  ],
}

const MOCK_TEACHER_STATS = {
  cards: [
    { label: 'Total Students', value: '1,284', change: '+64', trend: 'up', color: 'indigo' },
    { label: 'Average Rating', value: '4.8', change: '+0.2', trend: 'up', color: 'amber' },
    { label: 'Total Courses', value: '12', change: '+2', trend: 'up', color: 'emerald' },
    { label: 'Monthly Revenue', value: '$3,420', change: '+18%', trend: 'up', color: 'violet' },
  ],
  chartData: [
    { course: 'React Basics', revenue: 1200 },
    { course: 'Node.js Pro', revenue: 890 },
    { course: 'UI/UX Design', revenue: 1450 },
    { course: 'Python ML', revenue: 720 },
    { course: 'TypeScript', revenue: 980 },
  ],
}

const MOCK_STUDENT_STATS = {
  cards: [
    { label: 'In Progress', value: '5', change: null, trend: null, color: 'indigo' },
    { label: 'Completed', value: '12', change: '+1 this month', trend: 'up', color: 'emerald' },
    { label: 'Learning Hours', value: '148h', change: '+6h this week', trend: 'up', color: 'violet' },
    { label: 'Certificates', value: '8', change: null, trend: null, color: 'amber' },
  ],
  courses: [
    { name: 'React Advanced Patterns', progress: 72, color: '#6366f1' },
    { name: 'Node.js & REST APIs', progress: 45, color: '#10b981' },
    { name: 'UI/UX Fundamentals', progress: 88, color: '#f59e0b' },
    { name: 'TypeScript Mastery', progress: 30, color: '#8b5cf6' },
    { name: 'Python for Data Science', progress: 15, color: '#ec4899' },
  ],
}

const MOCK_BY_ROLE = {
  [ROLES.ADMIN]: MOCK_ADMIN_STATS,
  [ROLES.TEACHER]: MOCK_TEACHER_STATS,
  [ROLES.STUDENT]: MOCK_STUDENT_STATS,
}

/**
 * useStats — fetches role-specific dashboard statistics.
 * Falls back to mock data when the API is unavailable.
 */
export const useStats = () => {
  const { user } = useSelector((state) => state.auth)
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.role) return

    const fetchStats = async () => {
      setIsLoading(true)
      setError(null)
      try {
        let data
        if (user.role === ROLES.ADMIN) data = await statsApi.getAdminStats()
        else if (user.role === ROLES.TEACHER) data = await statsApi.getTeacherStats()
        else data = await statsApi.getStudentStats()
        setStats(data)
      } catch {
        // Use mock data when API is not available
        setStats(MOCK_BY_ROLE[user.role] || MOCK_TEACHER_STATS)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [user?.role])

  return { stats, isLoading, error }
}
