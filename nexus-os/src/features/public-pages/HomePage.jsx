/** @format */

import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Your Agency, <span className={styles.highlight}>Streamlined</span>
        </h1>
        <p className={styles.subtitle}>
          Nexus OS replaces scattered spreadsheets and endless messages with one
          powerful command center for your digital agency.
        </p>
        <Link to="/get-started" className={styles.cta}>
          Get Started
        </Link>
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

export default HomePage;
