import "./app.css";
import AppHeader from "../app-header/app-header";
import { useSelector, useDispatch } from "react-redux";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Registration from "../../pages/registration";
import PasswordRecovery from "../../pages/password-recovery";
import PasswordReset from "../../pages/password-reset";
import Profile from "../../pages/profile";
import ProtectedRoute from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { setModalVisible } from "../../redux/slices/current-ingredient-slice";
import { useEffect } from "react";
import { getIngredients } from "../../utils/burger-api";
import {
  setError,
  setIngredients,
} from "../../redux/slices/all-ingredients-slice";
import Preloader from "../../utils/preloader/preloader";

const App = () => {
  const error = useSelector((state) => state.allIngredients.error);
  const loading = useSelector((state) => state.preloader.loading);

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
          {loading && <Preloader />}
          <AppHeader />
          <Routes location={cardClick || location}>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<ProtectedRoute element={<Login />} anonymous={true} />}
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute element={<Registration />} anonymous={true} />
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRoute
                  element={<PasswordRecovery />}
                  anonymous={true}
                />
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRoute element={<PasswordReset />} anonymous={true} />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute element={<Profile />} anonymous={false} />
              }
            />
            <Route
              path="/profile/orders"
              element={
                <ProtectedRoute element={<Profile />} anonymous={false} />
              }
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
                    child={<IngredientDetails />}
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
