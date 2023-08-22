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

  const bun = allIngredients.find((item) => item._id === constructorBunId);

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
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
        <div className={`${styles.scrollContainer} pr-2 pl-4`}>
          {constructorIngredientsIds.map((currItem, idx) => {
            const objItem = allIngredients.find(
              (item) => item._id === currItem
            );
            if (objItem && objItem.type != "bun") {
              return (
                <ConstructorDragElement
                  objItem={objItem}
                  idx={idx}
                  key={idx + "_" + currItem}
                />
              );
            }
          })}
        </div>
        <div className={`${styles.bunElement} pr-4`}>
          {bun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
      </div>
      <OrderBlock />
    </div>
  );
};

export default BurgerConstructor;
