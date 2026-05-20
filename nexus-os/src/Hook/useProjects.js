/** @format */

// /** @format */

import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

function useProjects() {
  async function fetchProjects() {
    const { data, error } = await supabase.from("projects").select("*");
    if (error) throw new Error(error.message);
    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return { data, isLoading, error };
}

export default useProjects;
