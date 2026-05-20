/** @format */

// /** @format */

// import { useEffect } from "react";
import useProjects from "../../Hook/useProjects";
import { FaProjectDiagram } from "react-icons/fa";
import styles from "./AdminDashboard.module.css";
import StatCard from "../../ui/StatCard";
import useRequests from "../../Hook/useRequests";

// import supabase from "../../services/supabase";

// function AdminDashboard() {
//   const { data, isLoading, error } = useProjects();
//   console.log({ data, isLoading, error });

//   useEffect(() => {
//     async function check() {
//       const { data, error } = await supabase.rpc("test_authorization_header");
//       console.log(
//         `The user role is ${data.role} and the user UUID is ${data.sub}. `,
//         error,
//       );
//     }
//     check();
//   }, []);
//   return (
//     <div>
//       <h1>AdminDashboard</h1>
//     </div>
//   );
// }

// export default AdminDashboard;

function AdminDashboard() {
  const { data: projects, isLoading, error } = useProjects();
  const { data: requests } = useRequests();

  if (isLoading) return <p className={styles.loading}>Loading dashboard...</p>;
  if (error) return <p className={styles.error}>Error: {error.message}</p>;

  const totalProjects = projects?.length ?? 0;

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>Admin Dashboard</h1>

      <div className={styles.statsGrid}>
        <StatCard
          title="Total Projects"
          value={totalProjects}
          icon={FaProjectDiagram}
        />

        <StatCard
          title="Pending Requests"
          value={requests?.length ?? 0}
          icon={FaProjectDiagram}
        />
      </div>

      {/* بعد از StatCardها */}
      <div className={styles.tableWrapper}>
        <h2>Recent Projects</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Budget</th>
            </tr>
          </thead>
          <tbody>
            {projects?.slice(0, 5).map((project) => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>{project.status}</td>
                <td>{project.budget ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
