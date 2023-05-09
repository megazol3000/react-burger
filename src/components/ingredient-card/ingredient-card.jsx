import React from 'react'
import styles from './ingredient-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import getIngredientPropTypes from '../../utils/ingredient-prop-types';

const IngrediendCard = (props) => {

  const [modalVisible, setModalVisible] = React.useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <div className={`${styles.IngrediendCard} mb-8`} onClick={openModal}>
          <img src={props.data.image} alt={props.data.name} />
          <Counter count={1} size="default" extraClass="m-1" />
          <div className={`${styles.priceBlock} text text_type_digits-default`}>
            <span className='mr-1'>{props.data.price}</span>
            <CurrencyIcon type="primary" />
          </div>
          <div className={`${styles.nameBlock} text text_type_main-default`}>
            {props.data.name}
          </div>
      </div>
      {
        modalVisible && (
          <Modal 
            onClose={() => setModalVisible(false)} 
            title="Детали ингредиента"
            type="ingredient"
            data={props.data}
          />
        )
      }
    </>
  )
};

IngrediendCard.propTypes = {
  data: PropTypes.shape(getIngredientPropTypes())
};

export default IngrediendCard;
