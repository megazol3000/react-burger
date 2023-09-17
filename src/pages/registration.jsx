import "../components/app/app.css";
import { useState, useEffect } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { registartion } from "../utils/burger-api";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestState, setRequestState] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    registartion(name, email, password, setRequestState);
  };

  useEffect(() => {
    if (requestState === "ok") {
      return navigate("/login");
    }
  }, [requestState]);

  return (
    <div className="bodyContainerCenter pt-10 pb-10">
      <p className="text text_type_main-medium mb-6">Регистрация</p>
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
      <Button extraClass="mb-20" onClick={handleClick}>
        Зарегистрироваться
      </Button>
      <p
        className="text text_type_main-small mb-4"
        style={{ color: "#8585AD" }}
      >
        Уже зарегистрированы?
        <Link to="/login" style={{ color: "#4C4CFF" }}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Registration;
