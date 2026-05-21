/** @format */

import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";

function Header() {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  async function handleExit() {
    await handleLogout();
    navigate("/login");
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}> Nexus Agency OS</h1>

      {user ? (
        <div className={styles.actions}>
          <NavLink to="/app/admin" className={styles.link}>
            Dashboard
          </NavLink>
          <button className={styles.logoutBtn} onClick={handleExit}>
            Logout
          </button>
        </div>
      ) : (
        <div className={styles.actions}>
          <NavLink to="/login" className={styles.link}>
            Login
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
