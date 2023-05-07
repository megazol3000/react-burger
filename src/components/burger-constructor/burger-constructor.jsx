import React from 'react'
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';

export default function BurgerConstructor(props) {
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
          <div className={styles.dragWrapper}>
            <DragIcon />
            <ConstructorElement
              text="Соус традиционный галактический"
              price={15}
              thumbnail={"https://code.s3.yandex.net/react/code/sauce-03.png"}
            />
          </div>
          <div className={styles.dragWrapper}>
            <DragIcon />
            <ConstructorElement
              text="Мясо бессмертных моллюсков Protostomia"
              price={1337}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
          </div>
          <div className={styles.dragWrapper}>
            <DragIcon />
            <ConstructorElement
              text="Плоды Фалленианского дерева"
              price={874}
              thumbnail={"https://code.s3.yandex.net/react/code/sp_1.png"}
            />
          </div>
          <div className={styles.dragWrapper}>
            <DragIcon />
            <ConstructorElement
              text="Хрустящие минеральные кольца"
              price={300}
              thumbnail={"https://code.s3.yandex.net/react/code/mineral_rings.png"}
            />
          </div>
          <div className={styles.dragWrapper}>
            <DragIcon />
            <ConstructorElement
              text="Говяжий метеорит (отбивная)"
              price={3000}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
            />
          </div>
          <div className={styles.dragWrapper}>
            <DragIcon />
            <ConstructorElement
              text="Сыр с астероидной плесенью"
              price={4142}
              thumbnail={"https://code.s3.yandex.net/react/code/cheese.png"}
            />
          </div>
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
      <Modal 
        isOpen={modalVisible} 
        onClose={() => setModalVisible(false)} 
        title=""
        type="order"
      />
    </div>
  )
}

BurgerConstructor.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  text: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  htmlType: PropTypes.string,
  size: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
};