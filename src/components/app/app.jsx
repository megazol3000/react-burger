import "./app.css";
import AppHeader from "../app-header/app-header";
import { useSelector, useDispatch } from "react-redux";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
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
import { useEffect } from "react";
import { getIngredients } from "../../utils/burger-api";
import {
  setError,
  setIngredients,
} from "../../redux/slices/all-ingredients-slice";

const App = () => {
  const error = useSelector((state) => state.allIngredients.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getIngredients()
      .then((json) => {
        dispatch(setIngredients(json.data));
      })
      .catch(() => {
        dispatch(setError());
      });
  }, []);

  const cardClick = location.state && location.state.cardClick;

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
          <Routes location={cardClick || location}>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<ProtectedRouteElement element={<Login />} />}
            />
            <Route
              path="/register"
              element={<ProtectedRouteElement element={<Registration />} />}
            />
            <Route
              path="/forgot-password"
              element={<ProtectedRouteElement element={<PasswordRecovery />} />}
            />
            <Route
              path="/reset-password"
              element={<ProtectedRouteElement element={<PasswordReset />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRouteElement element={<Profile />} />}
            />
            <Route
              path="/profile/orders"
              element={<ProtectedRouteElement element={<Profile />} />}
            />
            <Route path="/:id" element={<IngredientDetails />} />
          </Routes>
          {cardClick && (
            <Routes>
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
            </Routes>
          )}
          <div id="react-modals"></div>
        </>
      )}
    </div>
  );
};

export default App;
