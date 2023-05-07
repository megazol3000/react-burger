import React from "react";
import ReactDOM from "react-dom";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from './modal.module.css';
import IngredientDetails from "./ingredient-details/ingredient-details";
import OrderDetails from "./order-details/order-details";
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, type, data }) => {
    console.log(data);
    const modalRoot = document.getElementById("react-modals");
    const topPosStyle = {
        top: `calc(50vh - ${type === 'ingredient' ? 270 : 360}px)`
    };

    React.useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            onClose();
          }
        };
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    }, []);

    if (!isOpen) {
        return null;
    } else {
        return ReactDOM.createPortal(
            (
                <>
                    <div style={topPosStyle} className={`${styles.Modal} p-10 pb-15`}>
                        <ModalHeader title={title} onClose={onClose} />
                        {type === 'ingredient' ? (
                            <IngredientDetails data={data} />
                        ) : (
                            <OrderDetails />
                        )}
                    </div>
                    <ModalOverlay onClose={onClose}/>
                </>
            ), 
            modalRoot
        );
    }
} 

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    data: PropTypes.shape({
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string,
        __v: PropTypes.number,
        _id: PropTypes.string
    }),
};

export default Modal;