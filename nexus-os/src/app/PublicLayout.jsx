/** @format */

import { Outlet } from "react-router-dom";
import Header from "../ui/Header";

function PublicLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default PublicLayout;
