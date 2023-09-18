import "./app.css";
import AppHeader from "../app-header/app-header";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Registration from "../../pages/registration";
import PasswordRecovery from "../../pages/password-recovery";
import PasswordReset from "../../pages/password-reset";
import Profile from "../../pages/profile";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { setModalVisible } from "../../redux/slices/current-ingredient-slice";

const App = () => {
  const error = useSelector((state) => state.allIngredients.error);
  const allIngredients = useSelector(
    (state) => state.allIngredients.ingredients
  );
  const modalVisible = useSelector(
    (state) => state.currentIngredient.modalVisible
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <Routes>
            <Route path="/" element={<Home />}>
              {modalVisible && (
                <Route
                  path="/:id"
                  element={
                    <Modal
                      onClose={() => {
                        navigate("/");
                        dispatch(setModalVisible(false));
                      }}
                      title="Детали ингредиента"
                      type="ingredient"
                    />
                  }
                />
              )}
            </Route>
            {!modalVisible &&
              allIngredients.map((item) => (
                <Route path={`/${item._id}`} element={<IngredientDetails />} />
              ))}
            <Route
              path="/login"
              element={<ProtectedRouteElement element={<Login />} />}
            />
            <Route path="/register" element={<Registration />} />
            <Route path="/forgot-password" element={<PasswordRecovery />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/orders" element={<Profile />} />
          </Routes>
          <div id="react-modals"></div>
        </>
      )}
    </div>
  );
};

export default App;
