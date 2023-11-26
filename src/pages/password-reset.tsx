import "../components/app/app.css";
import { useState, useEffect, ChangeEvent, SyntheticEvent, FC } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { fetchResetPassword } from "../redux/slices/user-slice";
import { useSelector } from "react-redux";
import { setLoading } from "../redux/slices/preloader-slice";
import { IState } from "../utils/types";
import { useAppDispatch } from "../utils/hooks/use-app-dispatch";

const PasswordReset:FC = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const requestState = useSelector(
    (state: IState) => state.user.passwordResetState
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const tokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const hidePreloader = () => {
    dispatch(setLoading(false));
  };

  const submit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(fetchResetPassword({ password, token, hidePreloader }));
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
