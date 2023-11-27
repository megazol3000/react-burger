import styles from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { setCurrentIngredient } from "../../../redux/slices/current-ingredient-slice";
import { FC, useEffect } from "react";
import NotFound from "../../../pages/not-found/not-found";
import { IIngredient } from "../../../utils/types";
import { useAppDispatch } from "../../../utils/hooks/use-app-dispatch";
import { useAppSelector } from "../../../utils/hooks/use-app-selector";

const IngredientDetails: FC = () => {
  const { id } = useParams<"id">();
  const dispatch = useAppDispatch();

  const allIngredients = useAppSelector(
    (state) => state.allIngredients.ingredients
  );

  let current: IIngredient | undefined;
  if (allIngredients.length) {
    current = allIngredients.find((item) => item._id === id);
  }

  useEffect(() => {
    if (current) dispatch(setCurrentIngredient(current));
  }, [current]);

  const currentIngredient = useAppSelector((state) => state.currentIngredient);

  return current ? (
    <div className={styles.details}>
      <img
        className={`${styles.image} mb-4`}
        src={currentIngredient.image_large}
        alt={currentIngredient.name}
      />
      <span className="text text_type_main-medium mb-8">
        {currentIngredient.name}
      </span>
      <div className={styles.energyValue}>
        <div className={styles.energyValueItem}>
          <span className="text text_type_main-default">Калории,ккал</span>
          <span className="text text_type_digits-default">
            {currentIngredient.calories}
          </span>
        </div>
        <div className={styles.energyValueItem}>
          <span className="text text_type_main-default">Белки, г</span>
          <span className="text text_type_digits-default">
            {currentIngredient.proteins}
          </span>
        </div>
        <div className={styles.energyValueItem}>
          <span className="text text_type_main-default">Жиры, г</span>
          <span className="text text_type_digits-default">
            {currentIngredient.fat}
          </span>
        </div>
        <div className={styles.energyValueItem}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <span className="text text_type_digits-default">
            {currentIngredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default IngredientDetails;
