/** @format */
import styles from "./ClientsList.module.css";
import Spinner from "../../ui/Spinner";
import useClients from "../../Hook/useClients";
import toast from "react-hot-toast";

function ClientsList() {
  const { data, isLoading, error } = useClients();

  if (isLoading) return <Spinner />;

  if (error) toast.error(error.message);

  return (
    <div className={styles.clientsPage}>
      <h2>All Clients</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Full Name</th>
            <th className={styles.th}>Company</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((clie) => (
            <tr key={clie.id}>
              <td>{clie.full_name}</td>
              <td>{clie.company_name}</td>
              <td>{clie.contact_email}</td>
              <td>{clie.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientsList;
