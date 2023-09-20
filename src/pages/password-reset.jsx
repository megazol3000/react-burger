import "../components/app/app.css";
import { useState, useEffect } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../utils/burger-api";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/preloader-slice";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [requestState, setRequestState] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const tokenChange = (e) => {
    setToken(e.target.value);
  };

  const hidePreloader = () => {
    dispatch(setLoading(false));
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    resetPassword(password, token, setRequestState, hidePreloader);
  };

  useEffect(() => {
    if (requestState === "ok") {
      localStorage.removeItem("resetPasswordAccess");
      return navigate("/login");
    }
  }, [requestState]);

  return (
    <div className="bodyContainerCenter pt-10 pb-10">
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <form onSubmit={submit}>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          value={password}
          onChange={passwordChange}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          value={token}
          onChange={tokenChange}
          extraClass="mb-6"
        />
        <Button extraClass="mb-20" htmlType="submit">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-small mb-4 text_gray">
        Вспомнили пароль?
        <Link to="/login" className="text_blue">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default PasswordReset;
