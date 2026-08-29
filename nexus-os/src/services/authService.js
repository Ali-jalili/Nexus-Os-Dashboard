/** @format */

import supabase from "./supabase";

async function signupClient({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        role: "client",
      },
    },
  });

  if (error) {
    return { data: null, error };
  }

  if (data?.session) {
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });

    if (sessionError) {
      return { data: null, error: sessionError };
    }
  }

  return { data, error: null };
}

export { signupClient };
