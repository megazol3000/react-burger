import "../components/app/app.css";
import { useState, useEffect } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../utils/burger-api";
import { fetchWithRefresh } from "../utils/burger-api";

const Profile = () => {
  const [logoutState, setLogoutState] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    logout(setLogoutState);
  };

  useEffect(() => {
    if (logoutState === "ok") {
      return navigate("/login");
    }
  }, [logoutState]);

  const serResponse = (data) => {
    setName(data.user.name);
    setEmail(data.user.email);
  };

  useEffect(() => {
    fetchWithRefresh(
      "/auth/user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem("accessToken"),
        },
      },
      serResponse
    );
  }, []);

  const saveClick = () => {
    fetchWithRefresh(
      "/auth/user",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      },
      serResponse
    );
  };

  return (
    <div className="bodyContainerTop">
      <div className="profile-nav mr-15">
        <Link
          to="/profile"
          className="text text_type_main-medium mb-6"
          style={{
            color: location.pathname === "/profile" ? "#F2F2F3" : "#8585AD",
          }}
        >
          Профиль
        </Link>
        <Link
          to="/profile/orders"
          className="text text_type_main-medium mb-6"
          style={{
            color:
              location.pathname === "/profile/orders" ? "#F2F2F3" : "#8585AD",
          }}
        >
          История заказов
        </Link>
        <Link
          className="text text_type_main-medium mb-20"
          style={{ color: "#8585AD" }}
          onClick={logOut}
        >
          Выход
        </Link>
        <p className="text text_type_main-small" style={{ color: "#8585AD" }}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      {location.pathname === "/profile" ? (
        <div>
          <Input
            type={"text"}
            value={name}
            placeholder={"Имя"}
            extraClass="mb-6"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type={"text"}
            value={email}
            placeholder={"Логин"}
            extraClass="mb-6"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={saveClick} htmlType="button">
            Сохранить
          </Button>
        </div>
      ) : (
        <div>
          <p className="text text_type_main-large">
            История заказов в разработке
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
