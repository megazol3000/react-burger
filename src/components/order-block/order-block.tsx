import { FC, useMemo } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import styles from "./order-block.module.css";
import { setLoading } from "../../redux/slices/preloader-slice";
import { useNavigate } from "react-router-dom";
import OrderDetails from "../modal/order-details/order-details";
import { removeAllIngredients } from "../../redux/slices/constructor-ingredients-slice";
import { fetchOrder, setModalVisible } from "../../redux/slices/order-slice";
import { IIngredient } from "../../utils/types";
import { useAppDispatch } from "../../utils/hooks/use-app-dispatch";
import { useAppSelector } from "../../utils/hooks/use-app-selector";

const OrderBlock: FC = () => {
  const navigate = useNavigate();

  const allIngredients = useAppSelector(
    (state) => state.allIngredients.ingredients
  );

  const constructorBunId = useAppSelector(
    (state) => state.constructorIngredients.bun
  );

  const constructorIngredientsIds = useAppSelector(
    (state) => state.constructorIngredients.ingredients
  );
  const modalVisible = useAppSelector((state) => state.order.modalVisible);
  const dispatch = useAppDispatch();

  const calcedPrice = useMemo(() => {
    if (allIngredients.length) {
      const objBun = allIngredients.find(
        (item) => item._id === constructorBunId
      );
      let price = 0;
      if (objBun) {
        price += objBun.price * 2;
      }

      constructorIngredientsIds.forEach((currItem: string) => {
        const objItem = allIngredients.find((item) => item._id === currItem);
        if (objItem) {
          price += objItem.price;
        }
      });
      return price;
    }
  }, [constructorIngredientsIds, constructorBunId]);

  const hidePreloader = () => {
    dispatch(setLoading(false));
  };

  const removeIngredients = () => {
    dispatch(removeAllIngredients());
  };

  const openModal = () => {
    dispatch(setLoading(true));
    if (localStorage.getItem("accessToken")) {
      dispatch(
        fetchOrder({
          constructorBunId,
          constructorIngredientsIds,
          hidePreloader,
          removeIngredients,
        })
      );
    } else {
      navigate("/login");
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className={styles.orderBlock}>
        <div className={`${styles.orderBlockSum} mr-10`}>
          <span className="text text_type_digits-medium mr-2">
            {calcedPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={openModal}
          htmlType="button"
        >
          Оформить заказ
        </Button>
      </div>
      {modalVisible && (
        <Modal
          onClose={() => dispatch(setModalVisible(false))}
          title=""
          child={<OrderDetails />}
        />
      )}
    </>
  );
};

export default OrderBlock;
