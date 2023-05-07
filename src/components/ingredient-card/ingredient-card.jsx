import React from 'react'
import styles from './ingredient-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';

export default function IngrediendCard(props) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <div className={`${styles.IngrediendCard} mb-8`} onClick={openModal}>
          <img src={props.data.image}/>
          <Counter count={1} size="default" extraClass="m-1" />
          <div className={`${styles.priceBlock} text text_type_digits-default`}>
            <span className='mr-1'>{props.data.price}</span>
            <CurrencyIcon type="primary" />
          </div>
          <div className={`${styles.nameBlock} text text_type_main-default`}>
            {props.data.name}
          </div>
      </div>
      <Modal 
        isOpen={modalVisible} 
        onClose={() => setModalVisible(false)} 
        title="Детали ингредиента"
        type="ingredient"
        data={props.data}
      />
    </>
  )
}

IngrediendCard.propTypes = {
  count: PropTypes.number,
  size: PropTypes.string,
  extraClass: PropTypes.string,
  type: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
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
  })
};
