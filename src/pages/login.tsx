import { useEffect, FormEvent, FC } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchLogin,
  setPasswordRecoveryState,
} from "../redux/slices/user-slice";
import { setLoading } from "../redux/slices/preloader-slice";
import { useAppDispatch } from "../utils/hooks/use-app-dispatch";
import { useAppSelector } from "../utils/hooks/use-app-selector";
import { useForm } from "../utils/hooks/use-form";

const Login: FC = () => {
  const loginRequestState = useAppSelector(
    (state) => state.user.loginRequestState
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm({});

  dispatch(setPasswordRecoveryState());

  const hidePreloader = () => {
    dispatch(setLoading(false));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(fetchLogin({ ...values, hidePreloader }));
  };

  useEffect(() => {
    if (loginRequestState === "ok") {
      return navigate("/");
    }
  }, [loginRequestState]);

  return (
    <div className="bodyContainerCenter pt-10 pb-10">
      <p className="text text_type_main-medium mb-6">Вход</p>
      <form onSubmit={submit}>
        <Input
          type={"email"}
          name="email"
          value={values.email || ""}
          placeholder={"E-mail"}
          extraClass="mb-6"
          onChange={(e) => handleChange(e)}
        />
        <PasswordInput
          name="password"
          value={values.password || ""}
          extraClass="mb-6"
          onChange={(e) => handleChange(e)}
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
