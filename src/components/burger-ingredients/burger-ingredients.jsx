import React from 'react'
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngrediendCard from '../ingredient-card/ingredient-card';
import PropTypes from 'prop-types';
import getIngredientPropTypes from '../../utils/ingredient-prop-types';

 const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('one');

    return (
        <div className={styles.BurgerIngredientsContainer}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div style={{ display: 'flex' }} className="mb-10">
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.BurgerIngredientsBlock}>
                <h2 className="text text_type_main-medium mb-6">Булки</h2>
                <div className={`${styles.BurgerIngredientsTypeWrap} pr-4 pl-4`}>
                    {
                        props.ingredients.map((item) => item.type === 'bun' && <IngrediendCard data={item} key={item._id} /> )
                    }
                </div>
                <h2 className="text text_type_main-medium mb-6 mt-2">Соусы</h2>
                <div className={`${styles.BurgerIngredientsTypeWrap} pr-4 pl-4`}>
                    {
                        props.ingredients.map((item) => item.type === 'sauce' && <IngrediendCard data={item} key={item._id} /> )
                    }
                </div>
                <h2 className="text text_type_main-medium mb-6 mt-2">Начинки</h2>
                <div className={`${styles.BurgerIngredientsTypeWrap} pr-4 pl-4`}>
                    {
                        props.ingredients.map((item) => item.type === 'main' && <IngrediendCard data={item} key={item._id} /> )
                    }
                </div>
            </div>
        </div>
    )
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape(getIngredientPropTypes()).isRequired
    ).isRequired
};

export default BurgerIngredients;
