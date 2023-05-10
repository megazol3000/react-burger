import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header>
        <nav>
            <ul className={styles.container}>
                <li className={styles.containerSide}>
                    <a className={`${styles.navItem} ${styles.navItem_active} text text_type_main-default mr-2 pt-4 pb-4 pr-5 pl-5`} href="/">
                        <BurgerIcon /> <span className="ml-2">Конструктор</span>
                    </a>
                    <a className={`${styles.navItem} text text_type_main-default pt-4 pb-4 pr-5 pl-5`} href="/">
                        <ListIcon /> <span className="ml-2">Лента заказов</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <Logo />
                    </a>
                </li>
                <li className={`${styles.containerSide} ${styles.containerSideRight}`}>
                    <a className={`${styles.navItem} pt-4 pb-4 pr-5 pl-5`} href="/">
                        <ProfileIcon /> <span className="text text_type_main-default ml-2">Личный кабинет</span>
                    </a>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default AppHeader;
