/** @format */
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div> nvohg</div>;
  }
  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
}

export default ProtectedRoute;
