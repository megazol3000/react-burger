import React, { Component, FC } from "react";
import ReactDOM from "react-dom";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";

interface IModalProps {
  onClose: () => void;
  title: string;
  child: React.ReactElement;
}

const Modal: FC<IModalProps> = ({ onClose, title, child }) => {
  const modalRoot = document.getElementById("modals") as Element;
  const topPosStyle = {
    top: `calc(50vh - ${title ? 270 : 360}px)`,
  };
  const ECK_KEYCODE = 27;

  React.useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.keyCode === ECK_KEYCODE) {
        onClose();
      }
    };
    window.addEventListener("keydown", (e) => close(e));
    return () => window.removeEventListener("keydown", (e) => close(e));
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div style={topPosStyle} className={`${styles.Modal} p-10 pb-15`}>
        <ModalHeader title={title} onClose={onClose} />
        {child}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
