import React from "react";
import ReactDOM from "react-dom";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ onClose, title, child }) => {
  const modalRoot = document.getElementById("modals");
  const topPosStyle = {
    top: `calc(50vh - ${title ? 270 : 360}px)`,
  };
  const ECK_KEYCODE = 27;

  React.useEffect(() => {
    const close = (e) => {
      if (e.keyCode === ECK_KEYCODE) {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Modal;
