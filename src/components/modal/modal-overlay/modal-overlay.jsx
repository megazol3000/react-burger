import styles from './modal-overlay.module.css';

export default function ModalOverlay({onClose}) { 
  return (
    <div onClick={onClose} className={styles.modalOverlay}></div>
  )
}
