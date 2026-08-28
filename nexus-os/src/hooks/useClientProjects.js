/** @format */

import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

function useClientProjects(user) {
  async function fetchClientProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("client_id", user.id);

    if (error) throw new Error(error.message);

    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchClientProjects,
    queryKey: ["client-projects", user?.id],
    enabled: !!user,
  });

  return { data, error, isLoading };
}

export default useClientProjects;
