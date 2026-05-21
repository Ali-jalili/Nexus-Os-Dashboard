/** @format */

import { useState } from "react";
import styles from "./ProjectsBoard.module.css";

import useProjects from "../../Hook/useProjects";

function ProjectsBoard() {
  const { data } = useProjects();
  console.log(data);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);
  }

  let filteredProjects = data || [];

  if (search) {
    filteredProjects = filteredProjects.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (statusFilter !== "all") {
    filteredProjects = filteredProjects.filter(
      (item) => item.status === statusFilter,
    );
  }

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.created_at) - new Date(a.created_at);
    if (sortBy === "oldest")
      return new Date(a.created_at) - new Date(b.created_at);
    if (sortBy === "budget_high") return b.budget - a.budget;
    if (sortBy === "budget_low") return a.budget - b.budget;
    return 0;
  });

  function getStatusClass(status) {
    if (status === "pending") return styles.pending;
    if (status === "in_progress") return styles.inProgress;
    if (status === "completed") return styles.completed;
    return styles.inProgress;
  }

  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <h1>Projects Board</h1>
        <button className={styles.addBtn} disabled>
          + Add Project
        </button>
      </div>

      <div className={styles.toolbar}>
        <input
          onChange={(e) => handleSearch(e)}
          value={search}
          type="text"
          placeholder="Search projects..."
          className={styles.searchInput}
        />
        <select
          className={styles.select}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          className={styles.select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="budget_high">Budget: High to Low</option>
          <option value="budget_low">Budget: Low to High</option>
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Project Title</th>
              <th>Client</th>
              <th>Status</th>
              <th>Budget</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects?.map((item) => (
              <tr key={item.id}>
                <td> {item.title} </td>
                <td>{item.client_id}</td>

                <td>
                  <span
                    className={`${styles.badge} ${getStatusClass(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>$ {item.budget} </td>
                <td>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${item.progress ?? 0}%` }}
                    />
                  </div>
                </td>

                <td>
                  <button className={styles.actionBtn}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsBoard;
