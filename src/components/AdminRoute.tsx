import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { AuthContext } from '../context/AuthContext'

type AdminRouteProps = {
  children: ReactNode
}

function AdminRoute({ children }: AdminRouteProps) {

  const { currentUser } = useContext(AuthContext)

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (currentUser.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default AdminRoute