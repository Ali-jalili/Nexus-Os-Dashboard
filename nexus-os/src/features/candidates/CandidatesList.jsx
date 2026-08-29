/** @format */

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  FaUserTie,
  FaEnvelope,
  FaLink,
  FaCalendarAlt,
  FaSpinner,
} from "react-icons/fa";
import toast from "react-hot-toast";

import useCandidates from "../../hooks/useCandidates";
import { deleteCandidate } from "../../services/candidateService";

import styles from "./CandidatesList.module.css";

function CandidatesList() {
  const { data: candidates } = useCandidates();
  const queryClient = useQueryClient();
  const [isRejecting, setIsRejecting] = useState(null);

  async function handleReject(candidate) {
    setIsRejecting(candidate.id);

    const { error } = await deleteCandidate(candidate.id);

    if (error) {
      setIsRejecting(null);
      return toast.error(error.message);
    }

    toast.success("Candidate rejected and removed.");
    setIsRejecting(null);
    queryClient.invalidateQueries({ queryKey: ["candidates"] });
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Candidates</h1>

      {candidates?.length === 0 && (
        <div className={styles.empty}>
          <FaUserTie className={styles.emptyIcon} />
          <p>No candidates yet.</p>
        </div>
      )}

      <div className={styles.grid}>
        {candidates?.map((candidate) => (
          <div key={candidate.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>
                <FaUserTie />
              </div>
              <div>
                <h3 className={styles.candidateName}>{candidate.full_name}</h3>
                <span className={styles.specialty}>
                  {candidate.specialty || "No specialty"}
                </span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.infoRow}>
                <FaEnvelope className={styles.infoIcon} />
                <span>{candidate.email}</span>
              </div>
              {candidate.resume_url && (
                <div className={styles.infoRow}>
                  <FaLink className={styles.infoIcon} />
                  <a
                    href={candidate.resume_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.resumeLink}
                  >
                    View Resume
                  </a>
                </div>
              )}
              <div className={styles.infoRow}>
                <FaCalendarAlt className={styles.infoIcon} />
                <span>
                  {new Date(candidate.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button
                className={styles.rejectBtn}
                onClick={() => handleReject(candidate)}
                disabled={isRejecting === candidate.id}
              >
                {isRejecting === candidate.id ? (
                  <FaSpinner className={styles.spinner} />
                ) : (
                  "Reject"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidatesList;
