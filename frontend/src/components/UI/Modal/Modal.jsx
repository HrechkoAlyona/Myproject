// src/components/UI/Modal/Modal.jsx
import styles from "./Modal.module.css"

export default function Modal({ onClose, children }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>
        <button className={styles.x} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  )
}
