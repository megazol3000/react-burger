import { useEffect, FormEvent, FC } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchLogout } from "../redux/slices/user-slice";
import { fetchWithRefresh } from "../utils/burger-api";
import { setLoading } from "../redux/slices/preloader-slice";
import { useAppDispatch } from "../utils/hooks/use-app-dispatch";
import { useAppSelector } from "../utils/hooks/use-app-selector";
import { useForm } from "../utils/hooks/use-form";

const Profile: FC = () => {
  const logoutState = useAppSelector((state) => {
    return state.user.logoutState;
  });

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { values, handleChange, setValues } = useForm({});

  const hidePreloader = () => {
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (logoutState === "ok") {
      return navigate("/login");
    }
  }, [logoutState]);

  const setResponse = (data: {
    success: boolean;
    user: { email: string; name: string };
  }) => {
    setValues(data.user.name);
    setValues(data.user.email);
  };

  useEffect(() => {
    fetchWithRefresh(
      "/auth/user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem("accessToken"),
        },
      },
      setResponse,
      hidePreloader
    );
  }, []);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    fetchWithRefresh(
      "/auth/user",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(values),
      },
      setResponse,
      hidePreloader
    );
  };

  return (
    <div className="bodyContainerTop">
      <div className="profile-nav mr-15">
        <Link
          to="/profile"
          className="text text_type_main-medium mb-6"
          style={{
            color: location.pathname === "/profile" ? "#F2F2F3" : "#8585AD",
          }}
        >
          Профиль
        </Link>
        <Link
          to="/profile/orders"
          className="text text_type_main-medium mb-6"
          style={{
            color:
              location.pathname === "/profile/orders" ? "#F2F2F3" : "#8585AD",
          }}
        >
          История заказов
        </Link>
        <Link
          to="/profile"
          className="text text_type_main-medium mb-20 text_gray"
          onClick={() => {
            dispatch(setLoading(true));
            dispatch(fetchLogout({ hidePreloader }));
          }}
        >
          Выход
        </Link>
        <p className="text text_type_main-small text_gray">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      {location.pathname === "/profile" ? (
        <form onSubmit={submit}>
          <Input
            type="text"
            name="name"
            value={values.name || ""}
            placeholder={"Имя"}
            extraClass="mb-6"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="text"
            name="email"
            value={values.email || ""}
            placeholder={"Логин"}
            extraClass="mb-6"
            onChange={(e) => handleChange(e)}
          />
          <PasswordInput
            name="password"
            value={values.password || ""}
            extraClass="mb-6"
            onChange={(e) => handleChange(e)}
          />
          <Button htmlType="submit">Сохранить</Button>
        </form>
      ) : (
        <div>
          <p className="text text_type_main-large">
            История заказов в разработке
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
