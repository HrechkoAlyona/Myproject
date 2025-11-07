// src/components/SuccessModal/SuccessModal.jsx:
import styles from "./SuccessModal.module.css";

export default function SuccessModal({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>×</button>
        <p>Your discount is activated!</p>
      </div>
    </div>
  )
}
