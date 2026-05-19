/** @format */

import { createContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import supabase from "../services/supabase.";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function handleLogin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    setUser(data.user);
    setRole(data.user.user_metadata?.role ?? "client");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  }

  useEffect(() => {
    async function checkSession() {
      await supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setUser(session.user);
          setRole(session.user.user_metadata?.role ?? "client");
        }
      });
      setIsLoading(false);
    }
    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
