/** @format */
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useClientProjects from "../../Hook/useClientProjects";
import useClientRequests from "../../Hook/useClientRequests";
import Spinner from "../../ui/Spinner";
import { FaPlus, FaClock, FaCheckCircle, FaRocket } from "react-icons/fa";
import styles from "./ClientView.module.css";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

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
    const { data, error } = await supabase
      .from("requests")
      .update({ status: "cancelled" })
      .eq("id", requestId);

    if (error) {
      console.error("Cancel error:", error);
      return toast.error("Failed to cancel request: " + error.message);
    }
    if (data) toast.success("Request cancelled successfully");

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
        <Link to="/request-project" className={styles.addBtn}>
          <FaPlus /> New Project
        </Link>
      </div>

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
                  <h3>
                    {req.project_description?.slice(0, 50) ||
                      "Untitled Request"}
                  </h3>
                  <span className={`${styles.badge} ${styles.pending}`}>
                    Under Review
                  </span>
                </div>
                <p className={styles.date}>
                  Submitted: {new Date(req.created_at).toLocaleDateString()}
                </p>
                <button
                  className={styles.detailBtn}
                  onClick={() => setSelectedRequest(req)}
                >
                  View Details
                </button>
                <button
                  onClick={() => handleCancelRequest(req.id)}
                  className={styles.cancelBtn}
                >
                  Cancel Request
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

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
                  <h3>{project.title}</h3>
                  <span className={`${styles.badge} ${styles[project.status]}`}>
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

      {selectedRequest && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedRequest(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Request Details</h3>
            <p>
              <strong>Description:</strong>
            </p>
            <p>{selectedRequest.project_description}</p>
            <p>
              <strong>Budget:</strong>{" "}
              {selectedRequest.budget || "Not specified"}
            </p>
            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(selectedRequest.created_at).toLocaleDateString()}
            </p>
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedRequest(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientView;
