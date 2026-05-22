/** @format */

import styles from "./Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          &copy; {currentYear} Nexus. Crafted with precision.
        </p>
        <span className={styles.version}>v1.0</span>
      </div>
    </footer>
  );
}

export default Footer;
