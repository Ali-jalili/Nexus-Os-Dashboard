/** @format */

import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

function DevLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default DevLayout;
