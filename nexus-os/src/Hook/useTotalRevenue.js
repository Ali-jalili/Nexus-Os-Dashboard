/** @format */

import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

function useTotalRevenue() {
  async function fetchTotalRevenue() {
    const { data } = await supabase.from("projects").select("budget");

    const totalRevenue =
      data?.reduce((sum, acc) => sum + (acc.budget || 0), 0) ?? 0;
    return totalRevenue;
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchTotalRevenue,
    queryKey: ["totalRevenue"],
  });

  return { data, isLoading, error };
}

export default useTotalRevenue;
