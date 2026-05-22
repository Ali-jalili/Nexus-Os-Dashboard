/** @format */

import { useState } from "react";
import styles from "./ProjectRequestForm.module.css";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";
import { useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";

function ProjectRequestForm() {
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [budget, setBudget] = useState(null);
  const [description, setDescription] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { user } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase.from("requests").insert({
      client_name: clientName,
      company_name: companyName,
      budget: budget,
      contact_email: email,
      phone: phone,
      client_id: user.id,
      project_description: description,
      status: "pending",
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Request submitted successfully!");
      navigate("/client-dashboard");
      setClientName("");
      setCompanyName("");
      setBudget("");
      setEmail("");
      setPhone("");
      setDescription("");
    }
  }
  console.log(user);
  console.log("user.id:", user.id, "user.email:", user.email);

  return (
    <form className={styles.form}>
      <h1>Submit New Project Request</h1>

      <div className={styles.field}>
        <label htmlFor="clientName">Full Name</label>
        <input
          value={clientName}
          onChange={(e) => {
            setClientName(e.target.value);
          }}
          type="text"
          id="clientName"
          placeholder="Enter your full name"
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
        />
      </div>

      <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>
        Submit Request
      </button>
    </form>
  );
}

export default ProjectRequestForm;
