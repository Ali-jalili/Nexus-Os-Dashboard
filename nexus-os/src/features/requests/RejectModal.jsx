/** @format */

import { useState } from "react";
import { FaSpinner, FaTimesCircle } from "react-icons/fa";
import styles from "./RejectModal.module.css";

function RejectModal({ request, onClose, onConfirm, isRejecting }) {
  const [reason, setReason] = useState("");

  function handleConfirm() {
    if (!reason.trim()) return;
    onConfirm(request, reason);
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Reject Request</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <p className={styles.text}>
          Please provide a reason for rejecting{" "}
          <strong>{request?.project_title || "this request"}</strong>.
        </p>

        <textarea
          className={styles.textarea}
          rows={4}
          placeholder="e.g. Budget too low, project scope unclear..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.confirmBtn}
            onClick={handleConfirm}
            disabled={isRejecting || !reason.trim()}
          >
            {isRejecting ? (
              <FaSpinner className={styles.spinner} />
            ) : (
              <FaTimesCircle />
            )}
            Confirm Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default RejectModal;
