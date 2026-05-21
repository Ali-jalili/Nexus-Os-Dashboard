/** @format */

import { Link } from "react-router-dom";
import { FaRocket, FaCode } from "react-icons/fa";
import styles from "./GetStartedPage.module.css";

function GetStartedPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          What brings you to <span className={styles.highlight}>Nexus</span>?
        </h1>
        <p className={styles.subtitle}>
          Choose your path. We'll guide you from there.
        </p>

        <div className={styles.cards}>
          <Link to="/signup/client" className={styles.card}>
            <div className={styles.iconWrapper}>
              <FaRocket className={styles.icon} />
            </div>
            <h2 className={styles.cardTitle}>I want to hire talent</h2>
            <p className={styles.cardDesc}>
              Submit project requests and manage your projects with ease.
            </p>
            <span className={styles.cardAction}>Join as a Client →</span>
          </Link>

          <Link to="/signup/developer" className={styles.card}>
            <div className={styles.iconWrapper}>
              <FaCode className={styles.icon} />
            </div>
            <h2 className={styles.cardTitle}>I want to find work</h2>
            <p className={styles.cardDesc}>
              Submit your resume and get hired for exciting projects.
            </p>
            <span className={styles.cardAction}>Apply as a Developer →</span>
          </Link>
        </div>

        <p className={styles.loginPrompt}>
          Already have an account?{" "}
          <Link to="/login" className={styles.loginLink}>
            Log in
          </Link>
        </p>
      </div>

      <div className={styles.gradient} />
    </div>
  );
}

export default GetStartedPage;
