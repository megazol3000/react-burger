import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  addIngredient,
  addBun,
} from "../../redux/slices/constructor-ingredients-slice";
import OrderBlock from "../order-block/order-block";
import { useDrop } from "react-dnd";
import ConstructorDragElement from "./constructor-drag-element";
import { FC, useMemo } from "react";
import { IIngredient } from "../../utils/types";
import { useAppDispatch } from "../../utils/hooks/use-app-dispatch";
import { useAppSelector } from "../../utils/hooks/use-app-selector";

const BurgerConstructor: FC = () => {
  const allIngredients = useAppSelector(
    (state) => state.allIngredients.ingredients
  );

  const constructorBunId = useAppSelector(
    (state) => state.constructorIngredients.bun
  );

  const constructorIngredientsIds = useAppSelector(
    (state) => state.constructorIngredients.ingredients
  );

  const dispatch = useAppDispatch();

  const bun = useMemo(
    () => allIngredients.find((item) => item._id === constructorBunId),
    [allIngredients, constructorBunId]
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: { id: string }) {
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

  const scrollIngredients = useMemo<any>(() => {
    if (allIngredients.length) {
      const acc: Array<IIngredient | undefined> = [];
      constructorIngredientsIds.forEach((id: string) => {
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
              text={bun.name + " (Верх)"}
              price={bun.price}
              thumbnail={bun.image}
              isLocked
            />
          )}
        </div>
        <div className={`${styles.scrollContainer} pr-2 pl-4`}>
          {scrollIngredients &&
            scrollIngredients.map((objItem: IIngredient, idx: number) => (
              <ConstructorDragElement
                objItem={objItem}
                idx={idx}
                key={idx + "_" + objItem._id}
              />
            ))}
        </div>
        <div className={`${styles.bunElement} pr-4`}>
          {bun && (
            <ConstructorElement
              type="bottom"
              text={bun.name + " (Низ)"}
              price={bun.price}
              thumbnail={bun.image}
              isLocked
            />
          )}
        </div>
        {!bun && scrollIngredients && scrollIngredients.length === 0 && (
          <div className={styles.emptyConstructor}>
            <strong className="text text_type_main-default">
              Перетащите ингредиенты и булку в эту область
            </strong>
          </div>
        )}
      </div>
      <OrderBlock />
    </div>
  );
};

export default BurgerConstructor;
