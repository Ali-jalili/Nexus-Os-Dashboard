/** @format */
import { FaEnvelope, FaSpinner } from "react-icons/fa";
import useRequests from "../../Hook/useRequests";
import StatCard from "../../ui/StatCard";
import styles from "./RequestsInbox.module.css";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Spinner from "../../ui/Spinner";

function RequestsInbox() {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const { data: requests, error, isLoading } = useRequests();
  const queryClient = useQueryClient();

  if (isLoading) return <Spinner />;
  if (error) toast.error(error.message);

  async function handleApprove(req) {
    setIsApproving(req.id);
    const { error: projectError } = await supabase.from("projects").insert({
      title: req.project_description,
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

      <h2 className={styles.heading}>All Requests</h2>

      <div className={styles.grid}>
        {requests?.map((req) => (
          <div key={req.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.clientName}>{req.client_name}</h3>
              <span className={`${styles.badge} ${styles.pending}`}>
                {req.status}
              </span>
            </div>

            <p
              className={`${styles.description} ${expandedId === req.id ? styles.expanded : ""}`}
              onClick={() =>
                setExpandedId(expandedId === req.id ? null : req.id)
              }
            >
              {req.project_description}
            </p>
            <p className={styles.budget}>
              Budget: {req.budget || "Not specified"}
            </p>

            <p className={styles.date}>
              {new Date(req.created_at).toLocaleDateString()}
            </p>

            <div className={styles.actions}>
              <button
                className={styles.approveBtn}
                onClick={() => handleApprove(req)}
                disabled={isApproving === req.id || isRejecting === req.id}
              >
                {isApproving === req.id ? (
                  <FaSpinner className={styles.spinner} />
                ) : (
                  "Approve"
                )}
              </button>
              <button
                disabled={isApproving === req.id || isRejecting === req.id}
                className={styles.rejectBtn}
                onClick={() => handleReject(req)}
              >
                {isRejecting === req.id ? (
                  <FaSpinner className={styles.spinner} />
                ) : (
                  "Reject"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestsInbox;
