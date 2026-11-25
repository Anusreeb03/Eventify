import { useContext } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;