import styles from "./order-feed-details.module.css";
import checkIcon from "../../../images/graphics.svg";
import { FC } from "react";
import { useAppSelector } from "../../../utils/hooks/use-app-selector";

const OrderFeedDetails: FC = () => {
  const order = useAppSelector((state) => state.orderFeed.currentOrder);

  return (
    <div className={`${styles.orderDetails}`}>
      <span
        className={`${styles.orderId} text text_type_digits-default mb-10`}
      >
        {order.number}
      </span>
      <p className="mb-3 text text_type_main-medium">
        {order.name}
      </p>
      <p className={`${styles.status} mb-15 text text_type_main-small`}>
        {
          order.status == 'done' ? 'Выполнен' : 'В работе'
        }
      </p>
      <p className="mb-6 text text_type_main-large">Состав</p>
    </div>
  );
};

export default OrderFeedDetails;
