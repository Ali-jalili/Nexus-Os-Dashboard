/** @format */

import styles from "./StatCard.module.css";

function StatCard({ title, value, icon: Icon, isCurrency = false }) {
  const displayValue =
    isCurrency && typeof value === "number"
      ? "$" + value.toLocaleString("en-US")
      : value;

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        {Icon && <Icon className={styles.icon} />}
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{displayValue}</span>
      </div>
    </div>
  );
}

export default StatCard;
