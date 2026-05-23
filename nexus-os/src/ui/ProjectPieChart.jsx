/** @format */

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useProjectStats from "../Hook/useProjectStats";
import Spinner from "./Spinner";
import styles from "./ProjectPieChart.module.css";

const COLORS = {
  pending: "#f59e0b",
  in_progress: "#3b82f6",
  completed: "#10b981",
  cancelled: "#ef4444",
};

function ProjectPieChart() {
  const { data, isLoading } = useProjectStats();

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.chart}>
      <h3>Project Status</h3>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={50}
        >
          {data?.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name] || "#6b7280"} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ProjectPieChart;
