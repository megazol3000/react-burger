import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const currentIngredient = useSelector((state) => state.currentIngredient);
  return (
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
  );
};

export default IngredientDetails;
