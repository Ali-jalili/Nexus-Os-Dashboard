/** @format */

import { useState } from "react";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import styles from "./SignupClientPage.module.css";
import { FaSpinner } from "react-icons/fa";

function SignupClientPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password) {
      setIsLoading(false);
      return toast.error("Please fill in all fields.");
    }
    if (password.length < 6) {
      setIsLoading(false);
      return toast.error("Password must be at least 6 characters.");
    }

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

    if (error) {
      setIsLoading(false);
      toast.error(error.message);
      return;
    }
    if (data.user && data.session) {
      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
      setIsLoading(false);
      toast.success("Account created successfully!");
      navigate("/client-dashboard");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.heading}>Create Your Account</h1>

      <div className={styles.field}>
        <label htmlFor="clientName">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="clientName"
          placeholder="John Doe"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="clientEmail">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="clientEmail"
          placeholder="john@example.com"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="clientPassword">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="clientPassword"
          placeholder="Min. 6 characters"
        />
      </div>

      <button className={styles.submitBtn} type="submit" disabled={isLoading}>
        {isLoading ? (
          <FaSpinner className={styles.spinner} />
        ) : (
          "Submit Application"
        )}
      </button>

      <p className={styles.footerText}>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </form>
  );
}

export default SignupClientPage;
