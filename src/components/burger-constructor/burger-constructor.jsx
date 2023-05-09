import React from 'react'
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import getIngredientPropTypes from '../../utils/ingredient-prop-types';

const BurgerConstructor = (props) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  
  return (
    <div className={`${styles.BurgerConstructorContainer} pt-15`}>
      <div className={`${styles.constructorIngredients}`}>
        <div className='pr-4'>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
        </div>
        <div className={`${styles.scrollContainer} pr-4 pl-4`}>
          {
            props.ingredients.map((item) => {
              if (item.type === 'main' || item.type === 'sauce') {
                return (
                  <div key={item._id} className={styles.dragWrapper}>
                    <DragIcon />
                    <ConstructorElement
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </div>
                )
              }
            })
          }
        </div>
        <div className='pr-4'>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
        </div>
      </div>
      <div className={styles.orderBlock}>
        <div className={`${styles.orderBlockSum} mr-10`}>
          <span className="text text_type_digits-medium mr-2">10068</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
      </div>
      {
        modalVisible && (
          <Modal 
            onClose={() => setModalVisible(false)} 
            title=""
            type="order"
          />
        )
      }
    </div>
  )
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape(getIngredientPropTypes()).isRequired
  ).isRequired
};

export default BurgerConstructor;