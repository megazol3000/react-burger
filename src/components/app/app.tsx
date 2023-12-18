import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Registration from "../../pages/registration";
import PasswordRecovery from "../../pages/password-recovery";
import PasswordReset from "../../pages/password-reset";
import Profile from "../../pages/profile";
import Feed from "../../pages/feed";
import ProtectedRoute from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { setModalVisible } from "../../redux/slices/current-ingredient-slice";
import { FC, useEffect } from "react";
import { fetchAllIngredients } from "../../redux/slices/all-ingredients-slice";
import Preloader from "../../utils/preloader/preloader";
import { useAppDispatch } from "../../utils/hooks/use-app-dispatch";
import { useAppSelector } from "../../utils/hooks/use-app-selector";
import { setOrderFeedPageOpened } from "../../redux/slices/order-feed-slice";

const App: FC = () => {
  const error = useAppSelector((state) => state.allIngredients.error);
  const loading = useAppSelector((state) => state.preloader.loading);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  dispatch(setOrderFeedPageOpened(location.pathname == '/feed'));
  
  useEffect(() => {
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  const cardClick = location.state && location.state.cardClick;

  return (
    <div className={styles.App}>
      {error ? (
        <div className={`${styles.errorContainer} text text_type_main-large`}>
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
            <Route
              path="/feed"
              element={<Feed />}
            />
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
                    child={<IngredientDetails />}
                  />
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
