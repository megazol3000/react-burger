import { useEffect, FormEvent, FC } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { fetchResetPassword } from "../redux/slices/user-slice";
import { setLoading } from "../redux/slices/preloader-slice";
import { useAppDispatch } from "../utils/hooks/use-app-dispatch";
import { useAppSelector } from "../utils/hooks/use-app-selector";
import { useForm } from "../utils/hooks/use-form";

const PasswordReset: FC = () => {
  const requestState = useAppSelector((state) => state.user.passwordResetState);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm({});

  const hidePreloader = () => {
    dispatch(setLoading(false));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(fetchResetPassword({ ...values, hidePreloader }));
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
          value={values.password || ""}
          name="password"
          onChange={(e) => handleChange(e)}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          value={values.token || ""}
          name="token"
          onChange={(e) => handleChange(e)}
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
