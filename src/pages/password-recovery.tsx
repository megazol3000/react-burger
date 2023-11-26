import "../components/app/app.css";
import { useState, useEffect, SyntheticEvent, ChangeEvent, FC } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchPasswordRecovery,
  setPasswordResetState,
} from "../redux/slices/user-slice";
import { useSelector } from "react-redux";
import { setLoading } from "../redux/slices/preloader-slice";
import { IState } from "../utils/types";
import { useAppDispatch } from "../utils/hooks/use-app-dispatch";

const PasswordRecovery:FC = () => {
  const [email, setEmail] = useState("");
  const requestState = useSelector(
    (state: IState) => state.user.passwordRecoveryState
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  dispatch(setPasswordResetState());

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const hidePreloader = () => {
    dispatch(setLoading(false));
  };

  const submit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(fetchPasswordRecovery({ email, hidePreloader }));
  };

  localStorage.removeItem("resetPasswordAccess");
  useEffect(() => {
    if (requestState === "ok") {
      localStorage.setItem("resetPasswordAccess", "true");
      return navigate("/reset-password");
    }
  }, [requestState]);

  return (
    <div className="bodyContainerCenter pt-10 pb-10">
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <form onSubmit={submit}>
        <Input
          type={"email"}
          value={email}
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
