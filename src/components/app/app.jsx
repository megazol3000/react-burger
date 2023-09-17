import "./app.css";
import AppHeader from "../app-header/app-header";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Registration from "../../pages/registration";
import PasswordRecovery from "../../pages/password-recovery";
import PasswordReset from "../../pages/password-reset";
import Profile from "../../pages/profile";
import { ProtectedRouteElement } from "../protected-route/protected-route";

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
          <Router>
            <AppHeader />
            <Routes>
              <Route path="/" element={<Home />} />
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
          </Router>
          <div id="react-modals"></div>
        </>
      )}
    </div>
  );
};

export default App;
