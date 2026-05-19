/** @format */

import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";

function Header() {
  const { handleLogout } = useAuth();
  const navigta = useNavigate();

  async function handleExit() {
    await handleLogout();
    navigta("/login");
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}> Nexus Agency OS</h1>
      <button className={styles.logoutBtn} onClick={handleExit}>
        Logut
      </button>
    </header>
  );
}

export default Header;
