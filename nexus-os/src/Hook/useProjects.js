/** @format */

import { useQuery } from "@tanstack/react-query";

function useProjects() {
  async function fetchProjects() {
    const res = await fetch(
      "https://safavnifxlutntnkyzmv.supabase.co/rest/v1/projects",
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
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return { data, isLoading, error };
}

export default useProjects;

// import supabase from "../services/supabase.js";

// async function fetchProjects() {
//   console.log("fetchProjects called");
//   const { data, error } = await supabase.from("projects").select("*");
//   if (error) throw new Error(error.message);
//   return data;
// }

// async function fetchProjects() {
//   const session = await supabase.auth.getSession();
//   console.log("session exists:", !!session.data.session);

//   const { data, error } = await supabase.from("projects").select("*");
//   console.log("data:", data);
//   console.log("error:", error);

//   if (error) throw new Error(error.message);
//   return data;
// }

// async function fetchProjects() {
//   const { data, error } = await supabase.from("projects").select("*");
//   console.log("data:", data, "error:", error);
//   if (error) throw new Error(error.message);
//   return data;
// }

// const { data, isLoading, error } = useQuery({
//   queryKey: ["test"],
//   queryFn: async () => {
//     console.log("queryFn ran");
//     const res = await fetch(
//       "https://safavnifxlutntnkyzmv.supabase.co/rest/v1/projects",
//       {
//         headers: {
//           apikey:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhZmF2bmlmeGx1dG50bmt5em12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzM3MzAsImV4cCI6MjA5NDc0OTczMH0.WanQdbIf6ExColYJRNmW37D-xHOlBU1OVZeVDoelR7U",
//         },
//       },
//     );
//     return res.json();
//   },
// });
