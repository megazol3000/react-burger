import { FC } from "react";
import styles from "./order-feed-dashboard.module.css";
import { SimplePreloader } from "../../../utils/preloader/preloader";

const OrderFeedDashboard: FC<any> = ({ data }) => {

  return (
    <div className={styles.OrderFeedContainer}>
      <h1 className="text text_type_main-large mb-5">&nbsp;</h1>
      {
        data.orders ? (
          <div className={styles.OrderFeedBlock}>
            <div className={`mb-15 ${styles.OrdersLists}`}>
              <div className={styles.OrderListCompleted}>
                <div className={`mb-6 ${styles.OrderListTitle}`}>
                  <p className="text text_type_main-medium">Готовы:</p>
                </div>
                <div className={styles.OrderListCompletedBlock}>
                  {
                    data.orders && data.orders.map((item: any) => {
                      if (item.status === 'done') {
                        return <span className="text text_type_digits-default mb-2">{item.number}</span>
                      }
                    })
                  }
                </div>
              </div>
              <div className={styles.OrderListProcessing}>
                <div className={`mb-6 ${styles.OrderListTitle}`}>
                  <p className="text text_type_main-medium">В работе:</p>
                </div>
                <div className={styles.OrderListProcessingBlock}>
                  {
                    data.orders && data.orders.map((item: any) => {
                      if (item.status !== 'done') {
                        return <span className="text text_type_digits-default mb-2">{item.number}</span>
                      }
                    })
                  }             
                </div>
              </div>
            </div>
            <div className={`mb-15 ${styles.OrdersCompletedAllTime}`}>
              <div className={`mb-6 ${styles.OrderListTitle}`}>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className={`text text_type_digits-large ${styles.ordersCounter}`}>{data.total}</p>
              </div>
            </div>
            <div className={styles.OrdersCompletedAllTime}>
              <div className={`mb-6 ${styles.OrderListTitle}`}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className={`text text_type_digits-large ${styles.ordersCounter}`}>{data.totalToday}</p>
              </div>
            </div>
          </div>
        ) : <SimplePreloader />
      }
    </div>
  );
};

export default OrderFeedDashboard;
