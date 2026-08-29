/** @format */

import supabase from "./supabase";

export async function createRequest({
  title,
  description,
  budget,
  phone,
  company,
  user,
}) {
  const { data, error } = await supabase.from("requests").insert({
    project_title: title,
    project_description: description,
    budget,
    phone,
    company_name: company,
    contact_email: user?.email,
    client_id: user?.id,
    status: "pending",
  });

  return { data, error };
}

export async function updateRequest(requestId, updates) {
  const { data, error } = await supabase
    .from("requests")
    .update(updates)
    .eq("id", requestId);

  return { data, error };
}

export async function deleteRequest(requestId) {
  const { data, error } = await supabase
    .from("requests")
    .delete()
    .eq("id", requestId);

  return { data, error };
}

export async function approveRequest(req) {
  const { error: projectError } = await supabase.from("projects").insert({
    title: req.project_title,
    description: req.project_description,
    client_id: req.client_id,
    status: "pending",
    budget: req.budget,
  });

  if (projectError) return { error: projectError };

  const { error: updateError } = await supabase
    .from("clients")
    .update({
      company_name: req.company_name,
      phone: req.phone,
    })
    .eq("id", req.client_id);

  if (updateError) return { error: updateError };

  const { error: deleteError } = await supabase
    .from("requests")
    .update({ status: "approved" })
    .eq("id", req.id);

  return { error: deleteError };
}

export async function rejectRequest(reqId, reason) {
  const { error } = await supabase
    .from("requests")
    .update({
      status: "rejected",
      reject_reason: reason,
    })
    .eq("id", reqId);

  return { error };
}

export async function cancelRequest(requestId) {
  const { data, error } = await supabase
    .from("requests")
    .update({ status: "cancelled" })
    .eq("id", requestId);

  return { data, error };
}
