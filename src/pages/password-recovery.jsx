import "../components/app/app.css";
import { useState, useEffect } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { recoverPassword } from "../utils/burger-api";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/preloader-slice";

const PasswordRecovery = () => {
  const [emailValue, setEmailValue] = useState("");
  const [requestState, setRequestState] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setEmailValue(e.target.value);
  };

  const hidePreloader = () => {
    dispatch(setLoading(false));
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    recoverPassword(emailValue, setRequestState, hidePreloader);
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
      <form onSubmit={submit}>
        <Input
          type={"email"}
          value={emailValue}
          onChange={onChange}
          placeholder={"Укажите E-mail"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button extraClass="mb-20" htmlType="submit">
          Восстановить
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

export default PasswordRecovery;
