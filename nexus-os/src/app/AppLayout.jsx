/** @format */
import styles from "./AppLayout.module.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import Header from "../ui/Header";
// import Footer from "../ui/Footer";

function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <main className={styles.content}>
          <Outlet />
        </main>

        {/* <footer>
          <Footer />
        </footer> */}
      </div>
    </div>
  );
}

export default AppLayout;
