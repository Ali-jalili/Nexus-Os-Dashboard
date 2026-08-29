/** @format */

import supabase from "./supabase";

export async function deleteCandidate(candidateId) {
  const { data, error } = await supabase
    .from("candidates")
    .delete()
    .eq("id", candidateId);

  return { data, error };
}
