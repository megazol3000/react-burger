import "../components/app/app.css";
import { useState, useEffect } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { recoverPassword } from "../utils/burger-api";

const PasswordRecovery = () => {
  const [emailValue, setEmailValue] = useState("");
  const [requestState, setRequestState] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleClick = () => {
    recoverPassword(emailValue, setRequestState);
  };

  localStorage.removeItem("resetPasswordAccess");
  useEffect(() => {
    if (requestState === "ok") {
      localStorage.setItem("resetPasswordAccess", true);
      return navigate("/reset-password");
    }
  }, [requestState]);

  return (
    <div className="bodyContainerCenter pt-10 pb-10">
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <Input
        type={"email"}
        value={emailValue}
        onChange={onChange}
        placeholder={"Укажите E-mail"}
        size={"default"}
        extraClass="mb-6"
      />
      <Button extraClass="mb-20" onClick={handleClick} htmlType="button">
        Восстановить
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

export default PasswordRecovery;
