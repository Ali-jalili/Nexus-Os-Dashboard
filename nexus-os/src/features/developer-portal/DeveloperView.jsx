/** @format */

import { Link } from "react-router-dom";
import useDeveloperProjects from "../../hooks/useDeveloperProjects";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../ui/Spinner";
import { FaCode, FaCalendarAlt, FaTasks, FaCheckCircle } from "react-icons/fa";
import styles from "./DeveloperView.module.css";

function DeveloperView() {
  const { user } = useAuth();
  const {
    data: developerProjects,
    isLoading,
    error,
  } = useDeveloperProjects(user);

  if (isLoading) return <Spinner />;
  if (error) return <p className={styles.error}>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.greeting}>
            Welcome,{" "}
            <span className={styles.name}>{user.user_metadata?.full_name}</span>
          </h1>
          <p className={styles.subtitle}>Your assigned projects</p>
        </div>
      </div>

      {/* Empty State */}
      {(!developerProjects || developerProjects.length === 0) && (
        <div className={styles.empty}>
          <FaTasks className={styles.emptyIcon} />
          <h3>No projects assigned yet</h3>
          <p>When a project is assigned to you, it will show up here.</p>
        </div>
      )}

      {/* Projects Grid */}
      <div className={styles.grid}>
        {developerProjects?.map((project) => (
          <div key={project.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <span
                className={`${styles.badge} ${styles[project.status] || styles.pending}`}
              >
                {project.status}
              </span>
            </div>

            <p className={styles.description}>
              {project.description || "No description provided."}
            </p>

            <div className={styles.progressSection}>
              <div className={styles.progressLabel}>
                <span>Progress</span>
                <span>{project.progress ?? 0}%</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${project.progress ?? 0}%` }}
                />
              </div>
            </div>

            <div className={styles.footer}>
              <div className={styles.metaItem}>
                <FaCalendarAlt className={styles.metaIcon} />
                <span>{new Date(project.created_at).toLocaleDateString()}</span>
              </div>
              <div className={styles.statusHint}>
                <FaCheckCircle className={styles.statusIcon} />
                <span>Managed by Admin</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeveloperView;
