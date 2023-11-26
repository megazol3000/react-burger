import React, { FC, useMemo } from "react";
import styles from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentIngredient,
  setModalVisible,
} from "../../redux/slices/current-ingredient-slice";
import { useDrag } from "react-dnd/dist/hooks";
import { Link, useLocation } from "react-router-dom";
import { IIngredient, IState } from "../../utils/types";

interface IIngredientCardProps {
  data: IIngredient;
  key: string;
}

const IngrediendCard: FC<IIngredientCardProps> = (props) => {
  const constructorBunId = useSelector(
    (state: IState) => state.constructorIngredients.bun
  );
  const constructorIngredientsIds = useSelector(
    (state: IState) => state.constructorIngredients.ingredients
  );

  const dispatch = useDispatch();
  let location = useLocation();

  let count = useMemo(() => {
    let acc = 0;
    constructorIngredientsIds.forEach((item: string) => {
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
      className={styles.link}
      key={id}
      to={{
        pathname: `/${id}`,
      }}
      state={{ cardClick: location }}
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
    </Link>
  );
};

export default IngrediendCard;
