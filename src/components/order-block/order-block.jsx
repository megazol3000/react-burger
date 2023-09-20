import React, { useMemo } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import styles from "./order-block.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../../utils/burger-api";
import { setOrderName, setOrderNumber } from "../../redux/slices/order-slice";
import { setLoading } from "../../redux/slices/preloader-slice";
import { useNavigate } from "react-router-dom";
import OrderDetails from "../modal/order-details/order-details";
import { removeAllIngredients } from "../../redux/slices/constructor-ingredients-slice";

const OrderBlock = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const navigate = useNavigate();

  const allIngredients = useSelector(
    (state) => state.allIngredients.ingredients
  );

  const constructorBunId = useSelector(
    (state) => state.constructorIngredients.bun
  );

  const constructorIngredientsIds = useSelector(
    (state) => state.constructorIngredients.ingredients
  );

  const dispatch = useDispatch();

  const calcedPrice = useMemo(() => {
    if (allIngredients.length) {
      const objBun = allIngredients.find(
        (item) => item._id === constructorBunId
      );
      let price = 0;
      if (objBun) {
        price += objBun.price * 2;
      }

      constructorIngredientsIds.forEach((currItem) => {
        const objItem = allIngredients.find((item) => item._id === currItem);
        if (objItem) {
          price += objItem.price;
        }
      });
      return price;
    }
  }, [constructorIngredientsIds, constructorBunId]);

  const setOrderDetails = (data) => {
    dispatch(setOrderName(data.name));
    dispatch(setOrderNumber(data.order.number));
  };

  const hidePreloader = () => {
    dispatch(setLoading(false));
  };

  const removeIngredients = () => {
    dispatch(removeAllIngredients());
  };

  const openModal = () => {
    dispatch(setLoading(true));
    if (localStorage.getItem("accessToken")) {
      getOrder(
        constructorBunId,
        constructorIngredientsIds,
        setOrderDetails,
        setModalVisible,
        hidePreloader,
        removeIngredients
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
          onClose={() => setModalVisible(false)}
          title=""
          type="order"
          child={<OrderDetails />}
        />
      )}
    </>
  );
};

export default OrderBlock;
