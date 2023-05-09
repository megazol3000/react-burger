import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal-header.module.css';
import PropTypes from 'prop-types';

const ModalHeader = ({ title, onClose }) => {
  return (
    <div className={styles.header}>
      <h2 className="text text_type_main-large">{title}</h2>
      <div className={styles.closeIcon} onClick={onClose}>
        <CloseIcon type="primary" />
      </div>
    </div>
  )
};

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalHeader;