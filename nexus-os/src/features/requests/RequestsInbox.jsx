/** @format */
import { FaEnvelope } from "react-icons/fa";

import useRequests from "../../Hook/useRequests";
import StatCard from "../../ui/StatCard";
import styles from "./RequestsInbox.module.css";

function RequestsInbox() {
  const { data: requests } = useRequests();

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RequestsInbox;
