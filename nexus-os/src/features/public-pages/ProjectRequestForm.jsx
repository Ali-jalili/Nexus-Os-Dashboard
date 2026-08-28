/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import styles from "./ProjectRequestForm.module.css";

function ProjectRequestForm() {
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!clientName || !email || !description) {
      toast.error(
        "Please fill in required fields: Name, Email, and Description.",
      );
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.from("requests").insert({
      client_name: clientName,
      company_name: companyName,
      budget,
      contact_email: email,
      phone,
      client_id: user.id,
      project_description: description,
      status: "pending",
    });

    if (error) {
      setIsLoading(false);
      toast.error(error.message);
      return;
    }

    setIsLoading(false);
    toast.success("Request submitted successfully!");
    navigate("/client-dashboard");

    setClientName("");
    setCompanyName("");
    setBudget("");
    setDescription("");
    setEmail("");
    setPhone("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Submit New Project Request</h1>

      <div className={styles.field}>
        <label htmlFor="clientName">Full Name</label>
        <input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          type="text"
          id="clientName"
          placeholder="Enter your full name"
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="companyName">Company Name</label>
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          type="text"
          id="companyName"
          placeholder="Enter company name (optional)"
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="budget">Estimated Budget</label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          type="text"
          id="budget"
          placeholder="e.g. $5,000"
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Project Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          placeholder="email your project in detail..."
          type="email"
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="phone">Project Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          id="phone"
          placeholder="phone your project in detail..."
          type="number"
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Project Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          rows={5}
          placeholder="Describe your project in detail..."
          disabled={isLoading}
        />
      </div>

      <button disabled={isLoading} type="submit" className={styles.submitBtn}>
        {isLoading ? (
          <FaSpinner className={styles.spinner} />
        ) : (
          "Submit Request"
        )}
      </button>
    </form>
  );
}

export default ProjectRequestForm;
