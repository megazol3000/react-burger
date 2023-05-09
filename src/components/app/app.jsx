import React from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import getIngredients from '../../utils/burger-api';

const App = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [error, setError] = React.useState('');
  
  React.useEffect(() => {
    getIngredients()
    .then((json) => {
      setIngredients(json.data);
    })
    .catch(error => {
      setError({ errorMessage: error });
    });
  }, []);

  return (
    <div className="App">
      {error ? (<div className='errorContainer text text_type_main-large'>Что-то пошло не так 😨<br/>попробуйте перезагрузить страницу</div>) : (
        <>
        <AppHeader />
          <div className="bodyContainer pt-10 pb-10">
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </div>
          <div id='react-modals'></div>
        </>
      )}
    </div>
  );
}

export default App;
