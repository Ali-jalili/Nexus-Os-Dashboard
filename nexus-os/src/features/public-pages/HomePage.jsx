/** @format */

import { Link } from "react-router-dom";
import { FaRocket, FaBriefcase } from "react-icons/fa";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Nexus Agency <span className={styles.highlight}>OS</span>
        </h1>
        <p className={styles.subtitle}>
          The all-in-one command center for your digital agency. Replace
          scattered Excel sheets, Telegram messages, and chaos with one powerful
          dashboard.
        </p>

        <div className={styles.actions}>
          <Link to="/request-project" className={styles.card}>
            <FaRocket className={styles.icon} />
            <span className={styles.cardTitle}>Start a Project</span>
            <span className={styles.cardDesc}>
              Submit a new project request as a client
            </span>
          </Link>

          <Link to="/apply-job" className={styles.card}>
            <FaBriefcase className={styles.icon} />
            <span className={styles.cardTitle}>Join the Team</span>
            <span className={styles.cardDesc}>
              Apply as a developer or designer
            </span>
          </Link>
        </div>
      </div>

      <div className={styles.gradient} />
    </div>
  );
}

export default HomePage;
