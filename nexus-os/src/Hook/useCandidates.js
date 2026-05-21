/** @format */

import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

function useCandidates() {
  async function fetchCandidates() {
    const { data, error } = await supabase.from("candidates ").select("*");

    if (error) throw new Error(error.message);
    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchCandidates,
    queryKey: ["candidates"],
  });

  return { data, isLoading, error };
}

export default useCandidates;
