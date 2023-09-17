import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import {
  addIngredient,
  addBun,
} from "../../redux/slices/constructor-ingredients-slice";
import OrderBlock from "../order-block/order-block";
import { useDrop } from "react-dnd";
import { ConstructorDragElement } from "./constructor-drag-element";
import { useMemo } from "react";

const BurgerConstructor = () => {
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

  const bun = useMemo(
    () => allIngredients.find((item) => item._id === constructorBunId),
    [allIngredients, constructorBunId]
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      const objIngredient = allIngredients.find(
        (item) => item._id === ingredient.id
      );
      if (objIngredient && objIngredient.type === "bun") {
        dispatch(addBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient));
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const className = isHover ? styles.onHover : "";

  const scrollIngredients = useMemo(() => {
    if (allIngredients.length) {
      const acc = [];
      constructorIngredientsIds.forEach((id) => {
        acc.push(allIngredients.find((item) => item._id === id));
      });
      return acc;
    }
  }, [constructorIngredientsIds, allIngredients]);

  return (
    <div className={`${styles.BurgerConstructorContainer} pt-15`}>
      <div
        ref={dropTarget}
        className={`${styles.constructorIngredients} ${className}`}
      >
        <div className={`${styles.bunElement} pr-4`}>
          {bun && (
            <ConstructorElement
              type="top"
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
              isLocked
            />
          )}
        </div>
        <div className={`${styles.scrollContainer} pr-2 pl-4`}>
          {scrollIngredients &&
            scrollIngredients.map((item, idx) => (
              <ConstructorDragElement
                objItem={item}
                idx={idx}
                key={idx + "_" + item._id}
              />
            ))}
        </div>
        <div className={`${styles.bunElement} pr-4`}>
          {bun && (
            <ConstructorElement
              type="bottom"
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
              isLocked
            />
          )}
        </div>
      </div>
      <OrderBlock />
    </div>
  );
};

export default BurgerConstructor;
