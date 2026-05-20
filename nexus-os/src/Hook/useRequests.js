/** @format */

import { useQuery } from "@tanstack/react-query";

/** @format */
function useRequests() {
  async function fetchRequests() {
    const res = await fetch(
      "https://safavnifxlutntnkyzmv.supabase.co/rest/v1/requests",
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhZmF2bmlmeGx1dG50bmt5em12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzM3MzAsImV4cCI6MjA5NDc0OTczMH0.WanQdbIf6ExColYJRNmW37D-xHOlBU1OVZeVDoelR7U",
        },
      },
    );
    const data = await res.json();
    console.log("fetch data:", data);
    return data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  return { data, isLoading, error };
}

export default useRequests;
