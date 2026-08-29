/** @format */

import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

function ClientLayout() {
  return (
    <div>
      <Header showSidebarToggle={false} />
      <Outlet />
    </div>
  );
}

export default ClientLayout;
