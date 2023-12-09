import { FC } from "react";
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ onClose }: { onClose: () => void }) => {
  return <div onClick={onClose} className={styles.modalOverlay}></div>;
};

export default ModalOverlay;
