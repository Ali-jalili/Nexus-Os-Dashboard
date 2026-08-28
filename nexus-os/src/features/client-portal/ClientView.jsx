/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  FaPlus,
  FaClock,
  FaCheckCircle,
  FaRocket,
  FaTimes,
} from "react-icons/fa";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useClientProjects from "../../hooks/useClientProjects";
import useClientRequests from "../../hooks/useClientRequests";
import Spinner from "../../ui/Spinner";
import styles from "./ClientView.module.css";

function ClientView() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: clientProjects, error, isLoading } = useClientProjects(user);
  const { data: clientRequests, isLoading: isRequestsLoading } =
    useClientRequests(user);
  const [selectedRequest, setSelectedRequest] = useState(null);

  if (isLoading || isRequestsLoading) return <Spinner />;
  if (error) return <p className={styles.error}>Error: {error.message}</p>;

  const hasRequests = clientRequests?.length > 0;
  const hasProjects = clientProjects?.length > 0;
  const isEmpty = !hasRequests && !hasProjects;

  async function handleCancelRequest(requestId) {
    const { error } = await supabase
      .from("requests")
      .update({ status: "cancelled" })
      .eq("id", requestId);

    if (error) {
      console.error("Cancel error:", error);
      return toast.error("Failed to cancel request: " + error.message);
    }

    toast.success("Request cancelled successfully");
    queryClient.invalidateQueries({ queryKey: ["client-requests", user?.id] });
  }

  async function handleArchiveProject(projectId) {
    const { error } = await supabase
      .from("projects")
      .update({ status: "archived" })
      .eq("id", projectId);

    if (error) return toast.error("Failed to archive: " + error.message);

    toast.success("Project archived");
    queryClient.invalidateQueries({ queryKey: ["client-projects", user?.id] });
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.greeting}>
            Welcome back,{" "}
            <span className={styles.name}>{user.user_metadata?.full_name}</span>
          </h1>
          <p className={styles.subtitle}>
            Manage your projects and track progress
          </p>
        </div>

        {!isEmpty && (
          <Link to="/request-project" className={styles.addBtn}>
            <FaPlus /> New Project
          </Link>
        )}
      </div>

      {/* Empty State */}
      {isEmpty && (
        <div className={styles.emptyState}>
          <FaRocket className={styles.emptyIcon} />
          <h2>No projects yet</h2>
          <p>Start by submitting your first project request.</p>
          <Link to="/request-project" className={styles.cta}>
            <FaPlus /> Submit New Project
          </Link>
        </div>
      )}

      {/* Pending Requests */}
      {hasRequests && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaClock className={styles.sectionIcon} />
            <h2>Pending Requests</h2>
          </div>

          <div className={styles.reviewBanner}>
            <FaClock className={styles.reviewIcon} />
            <p>
              Your request is being reviewed by our team. This usually takes
              24-48 hours.
            </p>
          </div>

          <div className={styles.cardGrid}>
            {clientRequests?.map((req) => (
              <div key={req.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    {req.project_title || "Untitled Request"}
                  </h3>
                  <span className={`${styles.badge} ${styles.pending}`}>
                    Under Review
                  </span>
                </div>

                <p className={styles.date}>
                  Submitted: {new Date(req.created_at).toLocaleDateString()}
                </p>

                <div className={styles.cardActions}>
                  <button
                    className={styles.detailBtn}
                    onClick={() => setSelectedRequest(req)}
                  >
                    View Details
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => handleCancelRequest(req.id)}
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Active Projects */}
      {hasProjects && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaCheckCircle className={styles.sectionIcon} />
            <h2>Active Projects</h2>
          </div>

          <div className={styles.cardGrid}>
            {clientProjects?.map((project) => (
              <div key={project.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
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

                <p className={styles.date}>
                  Started: {new Date(project.created_at).toLocaleDateString()}
                </p>

                {project.status === "completed" && (
                  <button
                    className={styles.archiveBtn}
                    onClick={() => handleArchiveProject(project.id)}
                  >
                    Archive
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Modal */}
      {selectedRequest && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedRequest(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Request Details</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setSelectedRequest(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalTitle}>
                <span className={styles.modalLabel}>Project</span>
                <h4>{selectedRequest.project_title}</h4>
              </div>

              <div className={styles.modalSection}>
                <span className={styles.modalLabel}>Description</span>
                <p className={styles.modalText}>
                  {selectedRequest.project_description}
                </p>
              </div>

              <div className={styles.modalRow}>
                <div className={styles.modalItem}>
                  <span className={styles.modalLabel}>Budget</span>
                  <p>{selectedRequest.budget || "Not specified"}</p>
                </div>
                <div className={styles.modalItem}>
                  <span className={styles.modalLabel}>Submitted</span>
                  <p>
                    {new Date(selectedRequest.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientView;
