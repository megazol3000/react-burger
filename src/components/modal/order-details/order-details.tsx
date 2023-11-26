import styles from "./order-details.module.css";
import checkIcon from "../../../images/graphics.svg";
import { useSelector } from "react-redux";
import { IState } from "../../../utils/types";
import { FC } from "react";

const OrderDetails:FC = () => {
  const orderNumber = useSelector((state: IState) => state.order.order.number);

  return (
    <div className={`${styles.orderDetails}`}>
      <span
        className={`${styles.orderId} text text_type_digits-large mb-8 mt-10`}
      >
        {orderNumber}
      </span>
      <span className="text text_type_main-medium mb-15">
        идентификатор заказа
      </span>
      <img src={checkIcon} alt="check-icon" />
      <span className="text text_type_main-default mt-15 mb-2 text_light">
        Ваш заказ начали готовить
      </span>
      <span className="text text_type_main-default mb-15 text_gray">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};

export default OrderDetails;
