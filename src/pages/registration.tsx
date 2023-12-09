import { useEffect, FormEvent, FC } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { setLoading } from "../redux/slices/preloader-slice";
import { fetchRegistration } from "../redux/slices/user-slice";
import { useAppDispatch } from "../utils/hooks/use-app-dispatch";
import { useAppSelector } from "../utils/hooks/use-app-selector";
import { useForm } from "../utils/hooks/use-form";

const Registration: FC = () => {
  const registrationState = useAppSelector(
    (state) => state.user.registrationState
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm({});

  const hidePreloader = () => {
    dispatch(setLoading(false));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(
      fetchRegistration({
        ...values,
        hidePreloader,
      })
    );
  };

  useEffect(() => {
    if (registrationState === "ok") {
      return navigate("/login");
    }
  }, [registrationState]);

  return (
    <div className="bodyContainerCenter pt-10 pb-10">
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <form onSubmit={submit}>
        <Input
          type={"text"}
          value={values.name || ""}
          name="name"
          placeholder={"Имя"}
          extraClass="mb-6"
          onChange={(e) => handleChange(e)}
        />
        <Input
          type={"email"}
          value={values.email || ""}
          name="email"
          placeholder={"E-mail"}
          extraClass="mb-6"
          onChange={(e) => handleChange(e)}
        />
        <PasswordInput
          value={values.password || ""}
          name="password"
          extraClass="mb-6"
          onChange={(e) => handleChange(e)}
        />
        <Button extraClass="mb-20" htmlType="submit">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-small mb-4 text_gray">
        Уже зарегистрированы?
        <Link to="/login" className="text_blue">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Registration;
