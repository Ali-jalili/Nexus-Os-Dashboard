/** @format */

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaSpinner,
  FaProjectDiagram,
  FaDollarSign,
  FaPhone,
  FaBuilding,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import supabase from "../../services/supabase";
import { createRequest, updateRequest } from "../../services/requestService";
import useAuth from "../../hooks/useAuth";

import styles from "./ProjectRequestForm.module.css";

function ProjectRequestForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);

  useEffect(() => {
    if (!editId) return;

    async function loadRequest() {
      setIsLoadingRequest(true);

      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .eq("id", editId)
        .single();

      if (!error && data) {
        setTitle(data.project_title || "");
        setDescription(data.project_description || "");
        setBudget(data.budget || "");
        setPhone(data.phone || "");
        setCompany(data.company_name || "");
      }

      setIsLoadingRequest(false);
    }

    loadRequest();
  }, [editId]);

  function handlePhoneChange(e) {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setPhone(value);
  }

  function handleBudgetChange(e) {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) setBudget(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !description || !budget || !phone || !company) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!/^\d+$/.test(phone)) {
      toast.error("Phone must contain only numbers.");
      return;
    }

    if (isNaN(Number(budget))) {
      toast.error("Budget must be a number.");
      return;
    }

    setIsLoading(true);

    const payload = {
      project_title: title,
      project_description: description,
      budget,
      phone,
      company_name: company,
      status: "pending",
    };

    let error;

    if (editId) {
      const result = await updateRequest(editId, payload);
      error = result.error;
    } else {
      const result = await createRequest({
        title,
        description,
        budget,
        phone,
        company,
        user,
      });
      error = result.error;
    }

    if (error) {
      setIsLoading(false);
      toast.error(error.message);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["client-requests", user?.id] });

    setIsLoading(false);
    toast.success(
      editId
        ? "Request updated successfully!"
        : "Request submitted successfully!",
    );
    navigate("/client-dashboard");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>{editId ? "Edit Project Request" : "Submit New Project Request"}</h1>

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
          disabled={isLoading || isLoadingRequest}
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
          disabled={isLoading || isLoadingRequest}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="budget">
          <FaDollarSign /> Budget *
        </label>
        <input
          id="budget"
          type="text"
          inputMode="decimal"
          placeholder="e.g. 5000"
          value={budget}
          onChange={handleBudgetChange}
          disabled={isLoading || isLoadingRequest}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="phone">
          <FaPhone /> Phone *
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="09123456789"
          value={phone}
          onChange={handlePhoneChange}
          disabled={isLoading || isLoadingRequest}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="company">
          <FaBuilding /> Company *
        </label>
        <input
          id="company"
          type="text"
          placeholder="Your company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          disabled={isLoading || isLoadingRequest}
        />
      </div>

      <button
        className={styles.submitBtn}
        type="submit"
        disabled={isLoading || isLoadingRequest}
      >
        {isLoading || isLoadingRequest ? (
          <FaSpinner className={styles.spinner} />
        ) : editId ? (
          "Update Request"
        ) : (
          "Submit Request"
        )}
      </button>
    </form>
  );
}

export default ProjectRequestForm;
