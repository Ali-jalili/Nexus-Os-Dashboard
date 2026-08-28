/** @format */

import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

function useClients() {
  async function fetchClients() {
    const { data, error } = await supabase.from("clients").select("*");
    if (error) throw new Error(error.message);
    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  return { data, isLoading, error };
}

export default useClients;
