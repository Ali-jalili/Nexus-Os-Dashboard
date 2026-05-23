/** @format */

// /** @format */
// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaHome,
//   FaProjectDiagram,
//   FaInbox,
//   FaUsers,
//   FaUserTie,
//   FaSignOutAlt,
//   FaThLarge,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import useAuth from "../Hook/useAuth";
// import styles from "./Sidebar.module.css";

// function Sidebar() {
//   const { handleLogout } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <>
//       {/* دکمه همبرگری (فقط موبایل) */}
//       <button className={styles.menuBtn} onClick={() => setIsOpen(!isOpen)}>
//         <FaBars />
//       </button>

//       <aside
//         className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""} ${isOpen ? styles.open : ""}`}
//       >
//         <div className={styles.brand}>
//           <FaThLarge className={styles.brandIcon} />
//           {!isCollapsed && <span className={styles.brandText}>Nexus</span>}
//           <button
//             className={styles.collapseBtn}
//             onClick={() => setIsCollapsed(!isCollapsed)}
//           >
//             <FaTimes />
//           </button>
//         </div>

//         <nav className={styles.nav}>
//           <NavLink
//             to="/app/admin"
//             className={({ isActive }) =>
//               isActive ? `${styles.link} ${styles.active}` : styles.link
//             }
//             onClick={() => setIsOpen(false)}
//           >
//             <FaHome className={styles.icon} />{" "}
//             {!isCollapsed && <span>Dashboard</span>}
//           </NavLink>
//           <NavLink
//             to="/app/projects"
//             className={({ isActive }) =>
//               isActive ? `${styles.link} ${styles.active}` : styles.link
//             }
//             onClick={() => setIsOpen(false)}
//           >
//             <FaProjectDiagram className={styles.icon} />{" "}
//             {!isCollapsed && <span>Projects</span>}
//           </NavLink>
//           <NavLink
//             to="/app/requests"
//             className={({ isActive }) =>
//               isActive ? `${styles.link} ${styles.active}` : styles.link
//             }
//             onClick={() => setIsOpen(false)}
//           >
//             <FaInbox className={styles.icon} />{" "}
//             {!isCollapsed && <span>Requests</span>}
//           </NavLink>
//           <NavLink
//             to="/app/clients"
//             className={({ isActive }) =>
//               isActive ? `${styles.link} ${styles.active}` : styles.link
//             }
//             onClick={() => setIsOpen(false)}
//           >
//             <FaUsers className={styles.icon} />{" "}
//             {!isCollapsed && <span>Clients</span>}
//           </NavLink>
//           <NavLink
//             to="/app/candidates"
//             className={({ isActive }) =>
//               isActive ? `${styles.link} ${styles.active}` : styles.link
//             }
//             onClick={() => setIsOpen(false)}
//           >
//             <FaUserTie className={styles.icon} />{" "}
//             {!isCollapsed && <span>Candidates</span>}
//           </NavLink>
//         </nav>

//         <button className={styles.logout} onClick={handleLogout}>
//           <FaSignOutAlt /> {!isCollapsed && <span>Logout</span>}
//         </button>
//       </aside>
//     </>
//   );
// }

// export default Sidebar;

/** @format */
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaProjectDiagram,
  FaInbox,
  FaUsers,
  FaUserTie,
  FaThLarge,
  FaChevronLeft,
} from "react-icons/fa";

import styles from "./Sidebar.module.css";

function Sidebar({ isOpen, isMobile, onClose, onToggle }) {
  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : ""} ${!isOpen && !isMobile ? styles.collapsed : ""}`}
    >
      <div className={styles.brand}>
        <FaThLarge className={styles.brandIcon} />
        {isOpen && <span className={styles.brandText}>Nexus</span>}
        {/* دکمه جمع کردن فقط تو دسکتاپ */}
        {!isMobile && (
          <button className={styles.collapseBtn} onClick={onToggle}>
            <FaChevronLeft className={isOpen ? "" : styles.rotated} />
          </button>
        )}
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/app/admin"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={isMobile ? onClose : undefined}
        >
          <FaHome className={styles.icon} />
          {isOpen && <span>Dashboard</span>}
        </NavLink>
        <NavLink
          to="/app/projects"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={isMobile ? onClose : undefined}
        >
          <FaProjectDiagram className={styles.icon} />
          {isOpen && <span>Projects</span>}
        </NavLink>
        <NavLink
          to="/app/requests"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={isMobile ? onClose : undefined}
        >
          <FaInbox className={styles.icon} />
          {isOpen && <span>Requests</span>}
        </NavLink>
        <NavLink
          to="/app/clients"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={isMobile ? onClose : undefined}
        >
          <FaUsers className={styles.icon} />
          {isOpen && <span>Clients</span>}
        </NavLink>
        <NavLink
          to="/app/candidates"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={isMobile ? onClose : undefined}
        >
          <FaUserTie className={styles.icon} />
          {isOpen && <span>Candidates</span>}
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
