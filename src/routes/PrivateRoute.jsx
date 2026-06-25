import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FullPageLoader from '@/components/ui/FullPageLoader'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isInitializing } = useSelector((state) => state.auth)
  const location = useLocation()

  if (isInitializing) {
    return <FullPageLoader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute
