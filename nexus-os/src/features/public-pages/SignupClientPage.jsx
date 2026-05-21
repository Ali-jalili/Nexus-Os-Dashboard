/** @format */

import { useState } from "react";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";

function SignupClientPage() {
  const { handleLogin } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
          role: "client",
        },
      },
    });

    if (error) return toast.error(error.message);

    if (data.user) {
      await handleLogin(email, password);
      toast.success("Account created successfully!");
      navigate("/client-dashboard");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="clientName">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="clientName"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label htmlFor="clientEmail">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="clientEmail"
          placeholder="Enter your full email"
        />
      </div>

      <div>
        <label htmlFor="clientPassword">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="clientPassword"
          placeholder="Enter your full Password"
        />
      </div>

      <button type="submit">Create Account</button>
    </form>
  );
}

export default SignupClientPage;
