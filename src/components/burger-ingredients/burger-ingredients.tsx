import React, { FC, useMemo, useEffect } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngrediendCard from "../ingredient-card/ingredient-card";
import { useSelector } from "react-redux";
import { IState, IIngredient } from "../../utils/types";

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = React.useState("one");

  const allIngredients: IIngredient[] = useSelector(
    (state: IState) => state.allIngredients.ingredients
  );

  const scrollBlock = document.querySelector("#scrollBlock") as HTMLElement;
  const bunsBlock = document.querySelector("#bunsBlock") as HTMLElement;
  const sausesBlock = document.querySelector("#sausesBlock") as HTMLElement;

  const tabClick = (tab: string) => {
    setCurrent(tab);
    switch (tab) {
      case "one":
        scrollBlock.scrollTop = 0;
        break;
      case "two":
        scrollBlock.scrollTop = bunsBlock.offsetHeight + 54;
        break;
      case "three":
        scrollBlock.scrollTop =
          bunsBlock.offsetHeight + sausesBlock.offsetHeight + 108;
        break;
    }
  };

  if (scrollBlock) {
    scrollBlock.onscroll = () => {
      if (scrollBlock.scrollTop === 0) {
        setCurrent("one");
      }
      if (scrollBlock.scrollTop >= bunsBlock.offsetHeight + 54) {
        setCurrent("two");
      }
      if (
        scrollBlock.scrollTop >=
        bunsBlock.offsetHeight + sausesBlock.offsetHeight + 108
      ) {
        setCurrent("three");
      }
    };
  }

  const ingredientFilter = (type: string) =>
    allIngredients.filter((item: IIngredient) => item.type === type);

  const bunFilter = useMemo<any>(
    () => ingredientFilter("bun"),
    [allIngredients]
  );

  const sauceFilter = useMemo(
    () => ingredientFilter("sauce"),
    [allIngredients]
  );

  const mainFilter = useMemo(() => ingredientFilter("main"), [allIngredients]);

  return (
    <div className={styles.BurgerIngredientsContainer}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={`${styles.BurgerIngredientsTabs} mb-10`}>
        <Tab
          value="one"
          active={current === "one"}
          onClick={() => tabClick("one")}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === "two"}
          onClick={() => tabClick("two")}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === "three"}
          onClick={() => {
            tabClick("three");
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.BurgerIngredientsBlock} id="scrollBlock">
        <h2 className="text text_type_main-medium mb-6">Булки</h2>
        <div
          className={`${styles.BurgerIngredientsTypeWrap} pr-4 pl-4`}
          id="bunsBlock"
        >
          {bunFilter.map((item: IIngredient) => (
            <IngrediendCard data={item} key={item._id} />
          ))}
        </div>
        <h2 className="text text_type_main-medium mb-6 mt-2">Соусы</h2>
        <div
          className={`${styles.BurgerIngredientsTypeWrap} pr-4 pl-4`}
          id="sausesBlock"
        >
          {sauceFilter.map((item) => (
            <IngrediendCard data={item} key={item._id} />
          ))}
        </div>
        <h2 className="text text_type_main-medium mb-6 mt-2">Начинки</h2>
        <div
          className={`${styles.BurgerIngredientsTypeWrap} pr-4 pl-4`}
          id="ingredientsBlock"
        >
          {mainFilter.map((item) => (
            <IngrediendCard data={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
