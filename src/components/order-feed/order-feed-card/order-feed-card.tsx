import { FC } from "react";
import styles from "./order-feed-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IOrderOld } from "../../../utils/types";
import { useAppSelector } from "../../../utils/hooks/use-app-selector";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../utils/hooks/use-app-dispatch";
import { setCurrentOrder } from "../../../redux/slices/order-feed-slice";

const OrderFeedCard: FC<any> = ({order}) => {
  const id = order._id;
  const date = new Date(order.updatedAt);
  const formattedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
  const allIngredients = useAppSelector((state) => state.allIngredients.ingredients);
  let price = 0;
  let location = useLocation();
  
  const dispatch = useAppDispatch();
  order.ingredients.forEach((item: string) => {
    const current = allIngredients.find((ingredient) => ingredient._id === item)
    if (current) {
      price += current.price;
    }
  })

  const openModal = () => {
    dispatch(setCurrentOrder(order));
  };
  
  return (
    <Link
      className={styles.link}
      key={id}
      to={{
        pathname: `${id}`,
      }}
      state={{ cardClick: location }}
    >
    <div className={`p-6 mr-1 mb-4 ${styles.OrderFeedCard}`} onClick={openModal}>
      <div className={`mb-6 ${styles.OrderFeedCardHeader}`}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {formattedDate}
        </p>
      </div>
      <p className="mb-6 text text_type_main-medium">
        {order.name}
      </p>
      <div className={styles.OrderFeedCardFooter}>
        <div className={styles.OrderFeedCardIngredients}>
          {
            order.ingredients.map((item: string, idx: number) => {
              const current = allIngredients.find((ingredient) => ingredient._id === item);
              const imgStyle = {
                transform: 'none',
                zIndex: 1,
              };
              imgStyle.transform = idx ? `translateX(-${12 * idx}px)` : 'none';
              imgStyle.zIndex = order.ingredients.length - idx;

              if (idx <= 5) {
                return (
                  <div className={styles.OrderFeedCardIngredient} style={imgStyle}>
                    <img 
                      src={current && current.image} 
                      alt={current && current.name} 
                      style={{opacity: (idx == 5 && order.ingredients.length > 6) ? 0.2 : 1}} 
                    />
                    {
                      (idx == 5 && order.ingredients.length > 6) && (
                        <div>
                          <p className="text text_type_main-default">
                            +{order.ingredients.length - 5}
                          </p>
                        </div>
                      )
                    }
                  </div>
                )
              } else if (idx > 5) {
                return
              }
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
    </Link>
  );
};

export default OrderFeedCard;
