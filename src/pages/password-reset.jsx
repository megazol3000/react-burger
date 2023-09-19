import "../components/app/app.css";
import { useState, useEffect } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../utils/burger-api";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [requestState, setRequestState] = useState("");

  const navigate = useNavigate();

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const tokenChange = (e) => {
    setToken(e.target.value);
  };

  const handleClick = () => {
    resetPassword(password, token, setRequestState);
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
      <Button extraClass="mb-20" onClick={handleClick} htmlType="button">
        Сохранить
      </Button>
      <p
        className="text text_type_main-small mb-4"
        style={{ color: "#8585AD" }}
      >
        Вспомнили пароль?
        <Link to="/login" style={{ color: "#4C4CFF" }}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default PasswordReset;
