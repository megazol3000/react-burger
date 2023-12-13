import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import styles from "./app-header.module.css";
import { FC } from "react";

const AppHeader: FC = () => {
  const location = useLocation();
  const profilePath = localStorage.getItem("accessToken")
    ? "/profile"
    : "/login";

  return (
    <header>
      <nav>
        <ul className={styles.container}>
          <li className={styles.containerSide}>
            <Link
              className={`${styles.navItem} ${
                location.pathname === "/" && styles.navItem_active
              } text text_type_main-default mr-2 pt-4 pb-4 pr-5 pl-5`}
              to="/"
            >
              <BurgerIcon type="secondary" />{" "}
              <span className="ml-2">Конструктор</span>
            </Link>
            <Link
              className={`${styles.navItem} ${
                location.pathname === "/feed" && styles.navItem_active
              } text text_type_main-default pt-4 pb-4 pr-5 pl-5`}
              to="/feed"
            >
              <ListIcon type="secondary" />{" "}
              <span className="ml-2">Лента заказов</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Logo />
            </Link>
          </li>
          <li
            className={`${styles.containerSide} ${styles.containerSideRight}`}
          >
            <Link
              to={profilePath}
              className={`${styles.navItem} ${
                (location.pathname === "/login" ||
                  location.pathname === "/profile" ||
                  location.pathname === "/profile/orders" ||
                  location.pathname === "/register" ||
                  location.pathname === "/forgot-password" ||
                  location.pathname === "/reset-password") &&
                styles.navItem_active
              } pt-4 pb-4 pr-5 pl-5`}
            >
              <ProfileIcon type="secondary" />{" "}
              <span className="text text_type_main-default ml-2">
                Личный кабинет
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
