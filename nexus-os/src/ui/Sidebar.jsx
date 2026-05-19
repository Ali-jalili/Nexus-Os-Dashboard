/** @format */

import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
        to="/app/admin"
      >
        Dashboard{" "}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
        ب
        to="/app/projects"
      >
        Projects{" "}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
        to="/app/requests"
      >
        Requests{" "}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
        to="/app/clients"
      >
        Clients{" "}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
        to="/app/candidates"
      >
        Candidates{" "}
      </NavLink>
    </aside>
  );
}

export default Sidebar;
