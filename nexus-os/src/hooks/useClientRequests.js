/** @format */

import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

function useClientRequests(user) {
  async function fetchClientRequests() {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }
  const { data, isLoading, error } = useQuery({
    queryFn: fetchClientRequests,
    queryKey: ["client-requests", user?.id],
    enabled: !!user,
  });

  return { data, isLoading, error };
}

export default useClientRequests;
