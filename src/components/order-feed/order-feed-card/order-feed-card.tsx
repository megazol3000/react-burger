import { FC } from "react";
import styles from "./order-feed-card.module.css";

const OrderFeedCard: FC = () => {
  return (
    <div className={`p-6 mr-1 ${styles.OrderFeedCard}`}>
      <div className={`mb-6 ${styles.OrderFeedCardHeader}`}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20
        </p>
      </div>
      <p className="text text_type_main-medium">
        Death Star Starship Main бургер
      </p>
    </div>
  );
};

export default OrderFeedCard;
