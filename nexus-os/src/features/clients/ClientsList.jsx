/** @format */

import { FaUser, FaBuilding, FaEnvelope, FaPhone } from "react-icons/fa";
import toast from "react-hot-toast";

import useClients from "../../hooks/useClients";
import Spinner from "../../ui/Spinner";

import styles from "./ClientsList.module.css";

function ClientsList() {
  const { data, isLoading, error } = useClients();

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message);
    return <p className={styles.error}>Failed to load clients.</p>;
  }

  const isEmpty = data?.length === 0;

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>All Clients</h2>

      {isEmpty && (
        <div className={styles.empty}>
          <FaUser className={styles.emptyIcon} />
          <p>No clients yet</p>
        </div>
      )}

      <div className={styles.grid}>
        {data?.map((client) => (
          <div key={client.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>
                <FaUser />
              </div>
              <h3 className={styles.clientName}>{client.full_name}</h3>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.infoRow}>
                <FaBuilding className={styles.infoIcon} />
                <span>{client.company_name || "—"}</span>
              </div>
              <div className={styles.infoRow}>
                <FaEnvelope className={styles.infoIcon} />
                <span>{client.contact_email}</span>
              </div>
              <div className={styles.infoRow}>
                <FaPhone className={styles.infoIcon} />
                <span>{client.phone || "—"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientsList;
