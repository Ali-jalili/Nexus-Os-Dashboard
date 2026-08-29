/** @format */

import { FaTimes } from "react-icons/fa";
import styles from "./ProjectDetailsModal.module.css";

function ProjectDetailsModal({ project, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{project?.title || "Project Details"}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <span className={styles.label}>Description</span>
            <p>{project?.description || "No description provided."}</p>
          </div>

          <div className={styles.row}>
            <div className={styles.item}>
              <span className={styles.label}>Budget</span>
              <p>${project?.budget || "Not specified"}</p>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Status</span>
              <p>{project?.status || "N/A"}</p>
            </div>
          </div>

          {project?.created_at && (
            <div className={styles.section}>
              <span className={styles.label}>Started</span>
              <p>{new Date(project.created_at).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsModal;
