/** @format */

import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

function useProjectStats() {
  async function fetchProjectStats() {
    const { data, error } = await supabase.from("projects").select("status");
    if (error) throw new Error(error.message);

    const statsCounts = {};
    data.forEach((item) => {
      const status = item.status || "unknown";
      statsCounts[status] = (statsCounts[status] || 0) + 1;
    });

    return Object.entries(statsCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["projectStats"],
    queryFn: fetchProjectStats,
  });

  return { data, isLoading, error };
}

export default useProjectStats;
