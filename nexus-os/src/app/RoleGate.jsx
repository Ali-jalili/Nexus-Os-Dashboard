/** @format */

import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import Spinner from "../ui/Spinner";

function RoleGate() {
  const { role, isLoading } = useAuth();
  const validRoles = ["admin", "client", "developer"];
  if (isLoading) return <Spinner />;

  if (role && validRoles.includes(role)) return <Outlet />;

  if (!role) return <Navigate to="/login" />;
}

export default RoleGate;
