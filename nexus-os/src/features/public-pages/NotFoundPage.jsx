/** @format */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaCompass } from "react-icons/fa";
import ParticleBackground from "../../ui/ParticleBackground";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <ParticleBackground />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={styles.codeWrapper}
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className={styles.code}>404</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className={styles.title}>Lost in the Nexus?</h2>
          <p className={styles.text}>
            This page has drifted into another dimension or never existed. Let's
            get you back to safety.
          </p>

          <div className={styles.actions}>
            <Link to="/" className={styles.homeBtn}>
              <FaHome /> Back to Home
            </Link>
            <Link to="/login" className={styles.loginBtn}>
              <FaCompass /> Go to Login
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
