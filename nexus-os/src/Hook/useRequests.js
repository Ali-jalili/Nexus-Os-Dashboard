/** @format */

// /** @format */

import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase.js";

function useRequests() {
  async function fetchRequests() {
    const { data, error } = await supabase.from("requests").select("*");
    if (error) throw new Error(error.message);
    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  return { data, isLoading, error };
}

export default useRequests;
