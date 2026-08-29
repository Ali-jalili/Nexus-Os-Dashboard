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
