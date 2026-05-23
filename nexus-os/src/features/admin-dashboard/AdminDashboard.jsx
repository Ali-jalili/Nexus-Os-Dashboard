/** @format */

import useProjects from "../../Hook/useProjects";
import useRequests from "../../Hook/useRequests";
import useClients from "../../Hook/useClients";
import StatCard from "../../ui/StatCard";
import Spinner from "../../ui/Spinner";
import {
  FaProjectDiagram,
  FaEnvelope,
  FaUsers,
  FaDollarSign,
  FaUser,
  FaCode,
  FaCoins,
} from "react-icons/fa";
import styles from "./AdminDashboard.module.css";
import useDevelopers from "../../Hook/useDevelopers";
import useTotalRevenue from "../../Hook/useTotalRevenue";
import ProjectPieChart from "../../ui/ProjectPieChart";

function AdminDashboard() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: requests, isLoading: requestsLoading } = useRequests();
  const { data: clients, isLoading: clientsLoading } = useClients();
  const { data: developers } = useDevelopers();
  const { data: totalRevenue } = useTotalRevenue();

  if (projectsLoading || requestsLoading || clientsLoading) return <Spinner />;

  const getClientName = (clientId) => {
    const client = clients?.find((c) => c.id === clientId);
    return client?.full_name || "N/A";
  };

  const getDeveloperName = (developerId) => {
    const dev = developers?.find((d) => d.id === developerId);
    return dev?.full_name || "Unassigned";
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Admin Dashboard</h1>
          <p className={styles.subtitle}>Overview of your agency</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          title="Total Projects"
          value={projects?.length ?? 0}
          icon={FaProjectDiagram}
        />
        <StatCard
          title="Pending Requests"
          value={requests?.length ?? 0}
          icon={FaEnvelope}
        />
        <StatCard
          title="Total Clients"
          value={clients?.length ?? 0}
          icon={FaUsers}
        />
        <StatCard
          title="Total Revenue"
          value={totalRevenue}
          icon={FaDollarSign}
        />
      </div>

      <ProjectPieChart />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Projects</h2>
        <div className={styles.projectGrid}>
          {projects?.slice(0, 6).map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.cardHeader}>
                <div className={styles.titleWrapper}>
                  <h3
                    className={`${styles.cardTitle} ${project.title.length > 40 ? styles.hasTooltip : ""}`}
                    tabIndex={project.title.length > 40 ? 0 : -1}
                  >
                    {project.title}
                  </h3>
                  {project.title.length > 40 && (
                    <div className={styles.tooltip}>{project.title}</div>
                  )}
                </div>
                <span className={`${styles.badge} ${styles[project.status]}`}>
                  {project.status}
                </span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardRow}>
                  <FaUser className={styles.cardIcon} />
                  <span className={styles.cardLabel}>Client</span>
                  <span className={styles.cardValue}>
                    {getClientName(project.client_id)}
                  </span>
                </div>
                <div className={styles.cardRow}>
                  <FaCode className={styles.cardIcon} />
                  <span className={styles.cardLabel}>Developer</span>
                  <span className={styles.cardValue}>
                    {getDeveloperName(project.developer_id)}
                  </span>
                </div>
                <div className={styles.cardRow}>
                  <FaCoins className={styles.cardIcon} />
                  <span className={styles.cardLabel}>Budget</span>
                  <span className={styles.cardValue}>
                    ${project.budget ?? "-"}
                  </span>
                </div>
              </div>

              <div className={styles.cardFooter}>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
