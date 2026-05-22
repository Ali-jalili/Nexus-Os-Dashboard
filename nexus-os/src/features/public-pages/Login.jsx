/** @format */

import { useState } from "react";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const loggedInUser = await handleLogin(email, password);
      const role = loggedInUser?.user_metadata?.role;

      if (role === "admin") navigate("/app/admin");
      else if (role === "client") navigate("/client-dashboard");
      else if (role === "developer") navigate("/dev-dashboard");
      else navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Yur Email..."
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Yur password..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
