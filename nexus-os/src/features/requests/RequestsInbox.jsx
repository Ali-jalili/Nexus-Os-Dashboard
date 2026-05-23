/** @format */
import { FaEnvelope } from "react-icons/fa";
import useRequests from "../../Hook/useRequests";
import StatCard from "../../ui/StatCard";
import styles from "./RequestsInbox.module.css";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function RequestsInbox() {
  const [expandedId, setExpandedId] = useState(null);
  const { data: requests } = useRequests();
  const queryClient = useQueryClient();

  async function handleApprove(req) {
    const { error: projectError } = await supabase.from("projects").insert({
      title: req.project_description,
      client_id: req.client_id,
      status: "pending",
      budget: req.budget,
    });

    if (projectError) return toast.error(projectError.message);

    const { error: updateError } = await supabase
      .from("clients")
      .update({
        company_name: req.company_name,
        phone: req.phone,
      })
      .eq("id", req.client_id);

    if (updateError) return toast.error(updateError.message);

    const { error: deleteError } = await supabase
      .from("requests")
      .delete()
      .eq("id", req.id);

    if (deleteError) return toast.error(deleteError.message);

    toast.success("Request approved!");
    queryClient.invalidateQueries({ queryKey: ["requests"] });
    queryClient.invalidateQueries({ queryKey: ["clients"] });
  }

  async function handleReject(req) {
    const { error: deleteError } = await supabase
      .from("requests")
      .delete()
      .eq("id", req.id);

    if (deleteError) return toast.error(deleteError.message);

    toast.success("Request rejected!");
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
              >
                Approve
              </button>
              <button
                className={styles.rejectBtn}
                onClick={() => handleReject(req)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestsInbox;
