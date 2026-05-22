/** @format */
import { motion } from "framer-motion";
import useCountUp from "../Hook/useCountUp";
import styles from "./CountUp.module.css";
function CountUp({ end, label, icon: Icon, startCounting }) {
  const count = useCountUp(end, 2000, startCounting);
  return (
    <motion.div
      className={styles.statItem}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Icon className={styles.statIcon} />
      <span className={styles.statNumber}>{count}+</span>
      <span className={styles.statLabel}>{label}</span>
    </motion.div>
  );
}

export default CountUp;
