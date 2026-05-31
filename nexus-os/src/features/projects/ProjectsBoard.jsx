/** @format */
import { useMemo } from "react";

import { useState } from "react";
import styles from "./ProjectsBoard.module.css";
import useProjects from "../../Hook/useProjects";
import useDevelopers from "../../Hook/useDevelopers";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import useClients from "../../Hook/useClients";
import Spinner from "../../ui/Spinner";

function ProjectsBoard() {
  const queryClient = useQueryClient();
  const { data: clientsData } = useClients();

  const { data: projectData, error, isLoading } = useProjects();
  const { data: developersData } = useDevelopers();
  const [editingProject, setEditingProject] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const sortedProjects = useMemo(() => {
    let result = projectData || [];

    if (search) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((item) => item.status === statusFilter);
    }

    return [...result].sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === "oldest")
        return new Date(a.created_at) - new Date(b.created_at);
      if (sortBy === "budget_high") return b.budget - a.budget;
      if (sortBy === "budget_low") return a.budget - b.budget;
      return 0;
    });
  }, [projectData, search, statusFilter, sortBy]);

  function getStatusClass(status) {
    if (status === "pending") return styles.pending;
    if (status === "in_progress") return styles.inProgress;
    if (status === "completed") return styles.completed;
    return styles.inProgress;
  }

  async function handleAssign(developerId, projectId) {
    const { error } = await supabase
      .from("projects")
      .update({ developer_id: developerId })
      .eq("id", projectId);

    if (error) return toast.error(error.message);
    toast.success("Developer assigned successfully!");

    queryClient.invalidateQueries({ queryKey: ["projects"] });
  }

  async function handleUpdate() {
    const { error } = await supabase
      .from("projects")
      .update({
        status: editingProject.status,
        progress: editingProject.progress,
      })
      .eq("id", editingProject.id);

    if (error) return toast.error(error.message);
    toast.success("Project updated!");
    setEditingProject(null);
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  }

  const getDeveloperName = (developerId) => {
    const dev = developersData?.find((d) => d.id === developerId);
    return dev?.full_name || "Not Assigned";
  };

  const getClientName = (clientId) => {
    const client = clientsData?.find((c) => c.id === clientId);
    return client?.full_name || "N/A";
  };

  if (isLoading) return <Spinner />;
  if (error) toast.error(error.message);

  return (
    <div className={styles.board}>
      {/* هدر */}
      <div className={styles.header}>
        <h1>Projects Board</h1>
        <button className={styles.addBtn} disabled>
          + Add Project
        </button>
      </div>

      {/* نوار ابزار */}
      <div className={styles.toolbar}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      {/* کارت‌های پروژه */}
      <div className={styles.grid}>
        {sortedProjects?.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle} title={item.title}>
                {item.title}
              </h3>
              <span
                className={`${styles.badge} ${getStatusClass(item.status)}`}
              >
                {item.status}
              </span>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.meta}>
                <span className={styles.metaLabel}>Client</span>
                <span className={styles.metaValue}>
                  {getClientName(item.client_id)}
                </span>
              </div>
              <div className={styles.meta}>
                <span className={styles.metaLabel}>Budget</span>
                <span className={styles.metaValue}>${item.budget ?? "-"}</span>
              </div>
              <div className={styles.meta}>
                <span className={styles.metaLabel}>Developer</span>
                <span className={styles.metaValue}>
                  {getDeveloperName(item.developer_id)}{" "}
                </span>
              </div>

              <select
                className={styles.devSelect}
                value={item.developer_id || ""}
                onChange={(e) => handleAssign(e.target.value, item.id)}
              >
                <option value="">Not Assigned</option>
                {developersData?.map((dev) => (
                  <option key={dev.id} value={dev.id}>
                    {dev.full_name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.progressWrapper}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${item.progress ?? 0}%` }}
                  />
                </div>
                <span className={styles.progressText}>
                  {item.progress ?? 0}%
                </span>
              </div>
              <button
                className={styles.actionBtn}
                onClick={() => setEditingProject(item)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal ویرایش پروژه */}
      {editingProject && (
        <div
          className={styles.modalOverlay}
          onClick={() => setEditingProject(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Edit Project</h3>
            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                value={editingProject.status}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    status: e.target.value,
                  })
                }
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Progress (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={editingProject.progress}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    progress: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setEditingProject(null)}
              >
                Cancel
              </button>
              <button className={styles.saveBtn} onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsBoard;
