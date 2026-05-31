/** @format */
import useDeveloperProjects from "../../Hook/useDeveloperProjects";
import useAuth from "../../Hook/useAuth";
import Spinner from "../../ui/Spinner";
import { FaCode } from "react-icons/fa";
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
      <div className={styles.header}>
        <div>
          <h1 className={styles.greeting}>
            Welcome,{" "}
            <span className={styles.name}>{user.user_metadata?.full_name}</span>
          </h1>
          <p className={styles.subtitle}>Your assigned projects</p>
        </div>
      </div>

      {(!developerProjects || developerProjects.length === 0) && (
        <div className={styles.empty}>
          <FaCode className={styles.emptyIcon} />
          <p>No projects assigned yet.</p>
        </div>
      )}

      <div className={styles.grid}>
        {developerProjects?.map((project) => (
          <div key={project.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <div className={styles.meta}>
              <span className={styles.metaLabel}>Status</span>
              <span
                className={`${styles.badge} ${styles[project.status] || styles.pending}`}
              >
                {project.status}
              </span>
            </div>
            <div className={styles.progressWrapper}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${project.progress ?? 0}%` }}
                />
              </div>
              <span className={styles.progressText}>
                {project.progress ?? 0}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeveloperView;
