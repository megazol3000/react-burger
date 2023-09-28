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
import { setLoading } from "../redux/slices/preloader-slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestState, setRequestState] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hidePreloader = () => {
    dispatch(setLoading(false));
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    login(email, password, setRequestState, hidePreloader);
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
      <form onSubmit={submit}>
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
        <Button extraClass="mb-20" htmlType="submit">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-small mb-4 text_gray">
        Вы новый пользователь?{" "}
        <Link to="/register" className="text_blue">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-small text_gray">
        Забыли пароль?{" "}
        <Link to="/forgot-password" className="text_blue">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default Login;
