import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

function PublicRoute() {
  const { isAuthenticated } = useAuth();

  // logged-in users cannot access login/register
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export default PublicRoute;
