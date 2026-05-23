/** @format */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCode,
  FaLink,
  FaSpinner,
} from "react-icons/fa";
import styles from "./SignupDeveloperPage.module.css";

function SignupDeveloperPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, role: "developer" } },
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    if (data.user) {
      const { error: insertError } = await supabase.from("candidates").insert({
        full_name: name,
        email: email,
        specialty: specialty,
        resume_url: resumeUrl,
      });

      if (insertError) {
        toast.error(insertError.message);
        setIsLoading(false);
        return;
      }

      toast.success("Application submitted! We'll contact you soon.");
      await handleLogout();
      navigate("/");
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>Apply as a Developer</h1>
        <p className={styles.subtitle}>Submit your resume and join our team</p>

        <div className={styles.field}>
          <label htmlFor="name">Full Name</label>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.inputIcon} />
            <input
              id="name"
              type="text"
              placeholder="Ali Rezaei"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputWrapper}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              id="email"
              type="email"
              placeholder="ali@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="specialty">Specialty</label>
          <div className={styles.inputWrapper}>
            <FaCode className={styles.inputIcon} />
            <input
              id="specialty"
              type="text"
              placeholder="e.g. Frontend Developer"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="resumeUrl">Resume URL</label>
          <div className={styles.inputWrapper}>
            <FaLink className={styles.inputIcon} />
            <input
              id="resumeUrl"
              type="url"
              placeholder="https://your-resume.com"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
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
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <button className={styles.submitBtn} type="submit" disabled={isLoading}>
          {isLoading ? (
            <FaSpinner className={styles.spinner} />
          ) : (
            "Submit Application"
          )}
        </button>

        <p className={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.link}>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupDeveloperPage;
