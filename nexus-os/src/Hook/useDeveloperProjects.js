/** @format */
import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

function useDeveloperProjects(user) {
  async function fetchDeveloperProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("developer_id", user.id);

    if (error) throw new Error(error.message);

    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchDeveloperProjects,
    queryKey: ["developer-projects", user?.id],
    enabled: !!user,
  });

  return { data, error, isLoading };
}

export default useDeveloperProjects;
