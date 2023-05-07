import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function OrderDetails() {
  return (
    <div className={`${styles.orderDetails}`}>
        <span className={`${styles.orderId} text text_type_digits-large mb-8 mt-10`}>034536</span>
        <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
        <div className={styles.checkIcon}>
            <CheckMarkIcon type="primary" />
        </div>
        <span style={{color: '#F2F2F3'}} className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</span>
        <span style={{color: '#8585AD'}} className="text text_type_main-default mb-15">Дождитесь готовности на орбитальной станции</span>
    </div>
  )
}

OrderDetails.propTypes = {
  type: PropTypes.string
};
