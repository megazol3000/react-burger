import React, { useMemo } from "react";
import styles from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import PropTypes from "prop-types";
import getIngredientPropTypes from "../../utils/ingredient-prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentIngredient,
  setModalVisible,
} from "../../redux/slices/current-ingredient-slice";
import { useDrag } from "react-dnd/dist/hooks";
import { Link, useLocation } from "react-router-dom";

const IngrediendCard = (props) => {
  const modalVisible = useSelector(
    (state) => state.currentIngredient.modalVisible
  );

  const constructorBunId = useSelector(
    (state) => state.constructorIngredients.bun
  );
  const constructorIngredientsIds = useSelector(
    (state) => state.constructorIngredients.ingredients
  );

  const dispatch = useDispatch();
  let location = useLocation();

  let count = useMemo(() => {
    let acc = 0;
    constructorIngredientsIds.forEach((item) => {
      acc += props.data._id === item ? 1 : 0;
    });
    return acc;
  }, [constructorIngredientsIds]);

  count = props.data._id === constructorBunId ? 1 : count;

  const openModal = () => {
    dispatch(setCurrentIngredient(props.data));
    dispatch(setModalVisible(true));
  };

  const id = props.data._id;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id },
  });

  return (
    <Link
      style={{
        display: "contents",
        color: "inherit",
      }}
      to={{
        pathname: `/${id}`,
      }}
    >
      <div
        ref={dragRef}
        className={`${styles.IngrediendCard} mb-8`}
        onClick={openModal}
      >
        {!!count && <Counter count={count} size="default" extraClass="m-1" />}
        <img src={props.data.image} alt={props.data.name} />
        <div className={`${styles.priceBlock} text text_type_digits-default`}>
          <span className="mr-1">{props.data.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <div className={`${styles.nameBlock} text text_type_main-default`}>
          {props.data.name}
        </div>
      </div>
      {/* {modalVisible && (
        <Modal
          onClose={() => dispatch(setModalVisible(false))}
          title="Детали ингредиента"
          type="ingredient"
        />
      )} */}
    </Link>
  );
};

IngrediendCard.propTypes = {
  data: PropTypes.shape(getIngredientPropTypes()),
};

export default IngrediendCard;
