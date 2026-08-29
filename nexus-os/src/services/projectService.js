/** @format */

import supabase from "./supabase";

export async function assignDeveloper(projectId, developerId) {
  const { data, error } = await supabase
    .from("projects")
    .update({ developer_id: developerId })
    .eq("id", projectId);

  return { data, error };
}

export async function updateProjectStatus(projectId, { status, progress }) {
  const { data, error } = await supabase
    .from("projects")
    .update({ status, progress })
    .eq("id", projectId);

  return { data, error };
}

export async function archiveProject(projectId) {
  const { data, error } = await supabase
    .from("projects")
    .update({ status: "archived" })
    .eq("id", projectId);

  return { data, error };
}
