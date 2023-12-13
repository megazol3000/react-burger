import { FC } from "react";
import styles from "./order-feed.module.css";
import OrderFeedCard from "./order-feed-card/order-feed-card";

const OrderFeed: FC = () => {
  return (
    <div className={styles.OrderFeedContainer}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>

      <div className={styles.OrderFeedBlock}>
        <OrderFeedCard />
      </div>
    </div>
  );
};

export default OrderFeed;
