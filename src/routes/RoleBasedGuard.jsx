import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ROLE_HOME } from '@/utils/constants'

const RoleBasedGuard = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth)

  if (!user) return <Navigate to="/login" replace />
  
  const userRole = (user.role || 'STUDENT').toUpperCase()
  const allowed = allowedRoles.map(r => r.toUpperCase())

  if (!allowed.includes(userRole)) {
    return <Navigate to={ROLE_HOME[userRole] || '/'} replace />
  }

  return children
}

export default RoleBasedGuard
