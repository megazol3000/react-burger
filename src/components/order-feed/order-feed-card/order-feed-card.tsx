import { FC } from "react";
import styles from "./order-feed-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IOrderOld } from "../../../utils/types";
import { useAppSelector } from "../../../utils/hooks/use-app-selector";

const OrderFeedCard: FC<any> = ({order}) => {
  const allIngredients = useAppSelector((state) => state.allIngredients.ingredients);
  let price = 0;
  order.ingredients.forEach((item: string) => {
    const current = allIngredients.find((ingredient) => ingredient._id === item)
    if (current) {
      price += current.price;
    }
  })
  console.log(order);
  console.log(allIngredients);
  return (
    <div className={`p-6 mr-1 mb-4 ${styles.OrderFeedCard}`}>
      <div className={`mb-6 ${styles.OrderFeedCardHeader}`}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {
            order.updatedAt
          }
        </p>
      </div>
      <p className="mb-6 text text_type_main-medium">
        {order.name}
      </p>
      <div className={styles.OrderFeedCardFooter}>
        <div className={styles.OrderFeedCardIngredients}>
          {
            order.ingredients.map((item: string) => {
              const current = allIngredients.find((ingredient) => ingredient._id === item)
              return (
                <div className={styles.OrderFeedCardIngredient}>
                  <img src={current && current.image} alt={current && current.name} />
                </div>
              )
            })
          }
          
        </div>
        <div className={styles.OrderFeedCardPrice}>
          <span className="text text_type_digits-default mr-2">
            {price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderFeedCard;
