/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSpinner,
  FaProjectDiagram,
  FaDollarSign,
  FaPhone,
  FaBuilding,
} from "react-icons/fa";

import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import styles from "./ProjectRequestForm.module.css";
import { createRequest } from "../../services/requestService";

function ProjectRequestForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Please fill in Project Title and Description.");
      return;
    }

    setIsLoading(true);

    const { error } = await createRequest({
      title,
      description,
      budget,
      phone,
      company,
      user,
    });

    if (error) {
      setIsLoading(false);
      toast.error(error.message);
      return;
    }

    setIsLoading(false);
    toast.success("Request submitted successfully!");
    navigate("/client-dashboard");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Submit New Project Request</h1>

      <div className={styles.field}>
        <label htmlFor="title">
          <FaProjectDiagram /> Project Title *
        </label>
        <input
          id="title"
          type="text"
          placeholder="e.g. Website Redesign"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Project Description *</label>
        <textarea
          id="description"
          rows={5}
          placeholder="Describe what you need..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="budget">
          <FaDollarSign /> Budget
        </label>
        <input
          id="budget"
          type="text"
          placeholder="e.g. $5,000"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="phone">
          <FaPhone /> Phone
        </label>
        <input
          id="phone"
          type="text"
          placeholder="Your contact number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="company">
          <FaBuilding /> Company (optional)
        </label>
        <input
          id="company"
          type="text"
          placeholder="Your company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <button className={styles.submitBtn} type="submit" disabled={isLoading}>
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
