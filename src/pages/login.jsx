import "../components/app/app.css";
import { useState, useEffect } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../utils/burger-api";
import { setLogined } from "../redux/slices/user-slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestState, setRequestState] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    login(email, password, setRequestState);
  };

  useEffect(() => {
    if (requestState === "ok") {
      dispatch(setLogined(true));
      return navigate("/");
    }
  }, [requestState]);

  return (
    <div className="bodyContainerCenter pt-10 pb-10">
      <p className="text text_type_main-medium mb-6">Вход</p>
      <Input
        type={"email"}
        value={email}
        placeholder={"E-mail"}
        extraClass="mb-6"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        value={password}
        extraClass="mb-6"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button extraClass="mb-20" onClick={handleClick}>
        Войти
      </Button>
      <p
        className="text text_type_main-small mb-4"
        style={{ color: "#8585AD" }}
      >
        Вы новый пользователь?{" "}
        <Link to="/register" style={{ color: "#4C4CFF" }}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-small" style={{ color: "#8585AD" }}>
        Забыли пароль?{" "}
        <Link to="/forgot-password" style={{ color: "#4C4CFF" }}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default Login;
