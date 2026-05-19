/** @format */
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";

function ProtectedRoute() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  if (user) return <Outlet />;
}

export default ProtectedRoute;
