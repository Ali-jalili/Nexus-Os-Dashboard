/** @format */

import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

function useDevelopers() {
  async function fetchDevelopers() {
    const { data, error } = await supabase.from("developers").select("*");

    if (error) throw new Error(error.message);
    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchDevelopers,
    queryKey: ["developers"],
  });

  return { data, isLoading, error };
}

export default useDevelopers;
