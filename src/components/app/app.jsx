import "./app.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const error = useSelector((state) => state.allIngredients.error);

  return (
    <div className="App">
      {error ? (
        <div className="errorContainer text text_type_main-large">
          Что-то пошло не так 😨
          <br />
          попробуйте перезагрузить страницу
        </div>
      ) : (
        <>
          <AppHeader />
          <div className="bodyContainer pt-10 pb-10">
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </div>
          <div id="react-modals"></div>
        </>
      )}
    </div>
  );
};

export default App;
