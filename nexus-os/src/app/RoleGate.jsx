/** @format */

import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import Spinner from "../ui/Spinner";

function RoleGate({ allowedRoles }) {
  const { role, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  if (!role) return <Navigate to="/login" />;

  if (allowedRoles.includes(role)) return <Outlet />;

  // نقش کاربر مجاز نیست → برگرد به صفحه اصلی
  return <Navigate to="/" />;
}

export default RoleGate;
