/** @format */
import {
  FaUserTie,
  FaEnvelope,
  FaCode,
  FaLink,
  FaCalendarAlt,
} from "react-icons/fa";
import useCandidates from "../../Hook/useCandidates";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./CandidatesList.module.css";

function CandidatesList() {
  const { data: candidates } = useCandidates();
  const queryClient = useQueryClient();

  async function handleReject(candidate) {
    const { error: deleteError } = await supabase
      .from("candidates")
      .delete()
      .eq("id", candidate.id);

    if (deleteError) return toast.error(deleteError.message);

    toast.success("Candidate rejected and removed.");
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
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidatesList;
