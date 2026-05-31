/** @format */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setShake(false);
    try {
      const loggedInUser = await handleLogin(email, password);
      const role = loggedInUser?.user_metadata?.role;
      if (role === "admin") navigate("/app/admin");
      else if (role === "client") navigate("/client-dashboard");
      else if (role === "developer") navigate("/dev-dashboard");
      else navigate("/");
    } catch (error) {
      toast.error("Invalid email or password");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form
        className={`${styles.form} ${shake ? styles.shake : ""}`}
        onSubmit={handleSubmit}
      >
        <h1 className={styles.heading}>Welcome back</h1>
        <p className={styles.subtitle}>Log in to your account</p>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputWrapper}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <div className={styles.inputWrapper}>
            <FaLock className={styles.inputIcon} />
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <button className={styles.submitBtn} type="submit" disabled={isLoading}>
          {isLoading ? <FaSpinner className={styles.spinner} /> : "Log In"}
        </button>

        <div className={styles.forgotWrapper}>
          <span className={styles.forgotLink}>Forgot Password?</span>
        </div>

        <div className={styles.separator}>
          <span>Or continue with</span>
        </div>

        <div className={styles.socialBtns}>
          <button type="button" className={styles.socialBtn} disabled>
            <FaGoogle /> Google
          </button>
          <button type="button" className={styles.socialBtn} disabled>
            <FaGithub /> GitHub
          </button>
        </div>

        <p className={styles.footerText}>
          Don't have an account?{" "}
          <Link to="/" className={styles.link}>
            Get Started
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
