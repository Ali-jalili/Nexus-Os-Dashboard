/** @format */
import { FaEnvelope } from "react-icons/fa";

import useRequests from "../../Hook/useRequests";
import StatCard from "../../ui/StatCard";
import styles from "./RequestsInbox.module.css";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function RequestsInbox() {
  const { data: requests } = useRequests();

  const queryClient = useQueryClient();

  async function handleApprove(req) {
    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .insert({
        full_name: req.client_name,
        company_name: req.company_name,
        contact_email: req.contact_email,
        phone: req.phone,
      })
      .select("id")
      .single();

    if (clientError) return toast.error(clientError.message);

    const clientId = clientData.id;

    const { error: projectError } = await supabase.from("projects").insert({
      title: req.project_description,
      client_id: clientId,
      status: "pending",
      budget: req.budget,
    });

    if (projectError) return toast.error(projectError.message);

    const { error: deleteError } = await supabase
      .from("requests")
      .delete()
      .eq("id", req.id);

    if (deleteError) return toast.error(deleteError.message);

    toast.success("Request approved!");

    queryClient.invalidateQueries({ queryKey: ["requests"] });
  }

  async function handleReject(req) {
    const { error: deleteError } = await supabase
      .from("requests")
      .delete()
      .eq("id", req.id);

    if (deleteError) return toast.error(deleteError.message);

    toast.success("Request Reject!");
    queryClient.invalidateQueries({ queryKey: ["requests"] });
  }

  return (
    <>
      <div>
        <StatCard
          title="Pending Requests"
          value={requests?.length ?? 0}
          icon={FaEnvelope}
        />
      </div>

      <div>
        <h2>All Requests</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Client</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {requests?.map((req) => (
              <tr key={req.id}>
                <td>{req.client_name}</td>
                <td>{req.project_description}</td>
                <td>{req.status}</td>
                <td>{new Date(req.created_at).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleApprove(req)}>Approve</button>
                  <button onClick={() => handleReject(req)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RequestsInbox;
