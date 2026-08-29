/** @format */

import { Outlet } from "react-router-dom";
import Header from "../../ui/Header";

function DevLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default DevLayout;
