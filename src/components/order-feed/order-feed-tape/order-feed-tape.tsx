import { FC } from "react";
import styles from "./order-feed-tape.module.css";
import OrderFeedCard from "../order-feed-card/order-feed-card";
import { IOrderFeedProps } from "../../../utils/types";
import { SimplePreloader } from "../../../utils/preloader/preloader";

const OrderFeedTape: FC<any> = ({ data }) => {
  return (
    <div className={styles.OrderFeedContainer}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>

      <div className={styles.OrderFeedBlock}>
        {
          data.orders ? data.orders.map((item: any) => <OrderFeedCard order={item} />) : <SimplePreloader />
        }       
      </div>
    </div>
  );
};

export default OrderFeedTape;
