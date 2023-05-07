import React from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import PropTypes from 'prop-types';

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const ingredientsApi = 'https://norma.nomoreparties.space/api/ingredients';
  
  React.useEffect(() => {
    fetch(ingredientsApi)
    .then((response) => response.json())
    .then((json) => {
      setIngredients(json.data);
    })
    .catch(error => {
      console.log('error');
    })
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div className="bodyContainer pt-10 pb-10">
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </div>
      <div id='react-modals'></div>
    </div>
  );
}

App.propTypes = {
  ingredients: PropTypes.PropTypes.arrayOf(PropTypes.shape({
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string
  }))
};

export default App;
