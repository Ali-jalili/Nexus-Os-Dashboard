/** @format */
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import Spinner from "../ui/Spinner";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <Spinner />;
  }
  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
}

export default ProtectedRoute;
