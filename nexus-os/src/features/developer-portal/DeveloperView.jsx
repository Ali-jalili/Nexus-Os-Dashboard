/** @format */

import { useState } from "react";

import useDeveloperProjects from "../../hooks/useDeveloperProjects";
import useDevelopers from "../../hooks/useDevelopers";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../ui/Spinner";
import ProjectDetailsModal from "../../ui/ProjectDetailsModal";
import {
  FaTasks,
  FaCalendarAlt,
  FaCheckCircle,
  FaCode,
  FaEye,
} from "react-icons/fa";
import styles from "./DeveloperView.module.css";

function DeveloperView() {
  const { user } = useAuth();
  const { data: developers } = useDevelopers();
  const {
    data: developerProjects,
    isLoading,
    error,
  } = useDeveloperProjects(user);
  const [selectedProject, setSelectedProject] = useState(null);

  if (isLoading) return <Spinner />;
  if (error) return <p className={styles.error}>Error: {error.message}</p>;

  const developer = developers?.find((d) => d.id === user?.id);

  const displayName =
    developer?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email ||
    "Developer";

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.greeting}>
            Welcome, <span className={styles.name}>{displayName}</span>
          </h1>
          <p className={styles.subtitle}>Your assigned projects</p>
        </div>

        <div className={styles.roleBadge}>
          <FaCode />
          <span>Developer</span>
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

            <div className={styles.section}>
              <span className={styles.label}>Description</span>
              <p className={styles.description}>
                {project.description || "No description provided."}
              </p>
            </div>

            <div className={styles.progressSection}>
              <div className={styles.progressLabel}>
                <span className={styles.label}>Progress</span>
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

              <button
                className={styles.detailBtn}
                onClick={() => setSelectedProject(project)}
              >
                <FaEye /> View Details
              </button>
            </div>

            <div className={styles.managedBy}>
              <FaCheckCircle className={styles.statusIcon} />
              <span>Managed by Admin</span>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default DeveloperView;
