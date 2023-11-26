import "../components/app/app.css";
import { useState, useEffect, SyntheticEvent, FC } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setLoading } from "../redux/slices/preloader-slice";
import { fetchRegistration } from "../redux/slices/user-slice";
import { useAppDispatch } from "../utils/hooks/use-app-dispatch";
import { IState } from "../utils/types";

const Registration:FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registrationState = useSelector(
    (state: IState) => state.user.registrationState
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const hidePreloader = () => {
    dispatch(setLoading(false));
  };

  const submit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(
      fetchRegistration({
        name,
        email,
        password,
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
          value={name}
          placeholder={"Имя"}
          extraClass="mb-6"
          onChange={(e) => setName(e.target.value)}
        />
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
