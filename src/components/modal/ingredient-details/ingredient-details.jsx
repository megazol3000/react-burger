import styles from './ingredient-details.module.css';
import getIngredientPropTypes from '../../../utils/ingredient-prop-types';

const IngredientDetails = ({ data }) => {
  return (
    <div className={styles.details}>
        <img className={`${styles.image} mb-4`} src={data.image_large} alt={data.name} />
        <span className="text text_type_main-medium mb-8">{data.name}</span>
        <div className={styles.energyValue}>
            <div className={styles.energyValueItem}>
                <span className="text text_type_main-default">Калории,ккал</span>
                <span className="text text_type_digits-default">{data.calories}</span>
            </div>
            <div className={styles.energyValueItem}>
                <span className="text text_type_main-default">Белки, г</span>
                <span className="text text_type_digits-default">{data.proteins}</span>
            </div>
            <div className={styles.energyValueItem}>
                <span className="text text_type_main-default">Жиры, г</span>
                <span className="text text_type_digits-default">{data.fat}</span>
            </div>
            <div className={styles.energyValueItem}>
                <span className="text text_type_main-default">Углеводы, г</span>
                <span className="text text_type_digits-default">{data.carbohydrates}</span>
            </div>
        </div>
    </div>
  )
};

IngredientDetails.propTypes = getIngredientPropTypes();

export default IngredientDetails;
