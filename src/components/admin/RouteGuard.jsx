import { Navigate } from 'react-router-dom'

export const RouteGuard = ({ children }) => {
  const token = localStorage.getItem('auth_token')
  
  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  return children
}
