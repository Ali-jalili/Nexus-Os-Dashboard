/** @format */

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  FaEnvelope,
  FaSpinner,
  FaChevronDown,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import useRequests from "../../hooks/useRequests";
import StatCard from "../../ui/StatCard";
import Spinner from "../../ui/Spinner";
import styles from "./RequestsInbox.module.css";

function RequestsInbox() {
  const queryClient = useQueryClient();
  const { data: requests, error, isLoading } = useRequests();
  const [isApproving, setIsApproving] = useState(null);
  const [isRejecting, setIsRejecting] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error(error.message);
    return <p className={styles.error}>Failed to load requests.</p>;
  }

  async function handleApprove(req) {
    setIsApproving(req.id);

    console.log("Inserting:", {
      title: req.project_title,
      description: req.project_description,
    });

    const { error: projectError } = await supabase.from("projects").insert({
      title: req.project_title,
      description: req.project_description,
      client_id: req.client_id,
      status: "pending",
      budget: req.budget,
    });

    if (projectError) {
      setIsApproving(null);
      return toast.error(projectError.message);
    }

    const { error: updateError } = await supabase
      .from("clients")
      .update({
        company_name: req.company_name,
        phone: req.phone,
      })
      .eq("id", req.client_id);

    if (updateError) {
      setIsApproving(null);
      return toast.error(updateError.message);
    }

    const { error: deleteError } = await supabase
      .from("requests")
      .delete()
      .eq("id", req.id);

    if (deleteError) {
      setIsApproving(null);
      return toast.error(deleteError.message);
    }

    setIsApproving(null);
    toast.success("Request approved!");
    queryClient.invalidateQueries({ queryKey: ["requests"] });
    queryClient.invalidateQueries({ queryKey: ["clients"] });

    console.log({
      project_title: req.project_title,
      project_description: req.project_description,
    });
  }

  async function handleReject(req) {
    setIsRejecting(req.id);

    const { error: deleteError } = await supabase
      .from("requests")
      .delete()
      .eq("id", req.id);

    if (deleteError) {
      setIsRejecting(null);
      return toast.error(deleteError.message);
    }

    toast.success("Request rejected!");
    setIsRejecting(null);
    queryClient.invalidateQueries({ queryKey: ["requests"] });
  }

  return (
    <div className={styles.inbox}>
      <StatCard
        title="Pending Requests"
        value={requests?.length ?? 0}
        icon={FaEnvelope}
      />

      {requests?.length === 0 && (
        <div className={styles.empty}>
          <FaEnvelope className={styles.emptyIcon} />
          <p>No pending requests</p>
        </div>
      )}

      <div className={styles.sectionHeader}>
        <h2 className={styles.heading}>All Requests</h2>
      </div>

      <div className={styles.grid}>
        {requests?.map((req) => {
          const isBusy = isApproving === req.id || isRejecting === req.id;
          const isExpanded = expandedId === req.id;

          return (
            <div key={req.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  {req.project_title || "Untitled Project"}
                </h3>
                <span className={`${styles.badge} ${styles.pending}`}>
                  {req.status}
                </span>
              </div>

              <button
                type="button"
                className={styles.expandBtn}
                onClick={() => setExpandedId(isExpanded ? null : req.id)}
              >
                <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                <FaChevronDown
                  className={`${styles.chevron} ${isExpanded ? styles.rotated : ""}`}
                />
              </button>

              {isExpanded && (
                <div className={styles.expandedContent}>
                  <strong>Dscription:</strong>
                  <p className={styles.description}>
                    {req.project_description}
                  </p>
                  <p className={styles.budget}>
                    <strong>Budget:</strong> {req.budget || "Not specified"}
                  </p>
                  {req.company_name && (
                    <p className={styles.company}>
                      <strong>Company:</strong> {req.company_name}
                    </p>
                  )}
                  <p className={styles.date}>
                    <strong>Submitted:</strong>{" "}
                    {new Date(req.created_at).toLocaleDateString()}
                  </p>
                </div>
              )}

              <div className={styles.actions}>
                <button
                  className={styles.approveBtn}
                  onClick={() => handleApprove(req)}
                  disabled={isBusy}
                >
                  {isApproving === req.id ? (
                    <FaSpinner className={styles.spinner} />
                  ) : (
                    <FaCheckCircle />
                  )}
                  Approve
                </button>
                <button
                  className={styles.rejectBtn}
                  onClick={() => handleReject(req)}
                  disabled={isBusy}
                >
                  {isRejecting === req.id ? (
                    <FaSpinner className={styles.spinner} />
                  ) : (
                    <FaTimesCircle />
                  )}
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RequestsInbox;
