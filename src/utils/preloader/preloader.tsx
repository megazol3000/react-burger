import preloaderImage from "../../images/preloader.png";
import styles from "./preloader.module.css";

export const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <img src={preloaderImage} className={styles.rotating} alt="preloader" />
    </div>
  );
};

export const SimplePreloader = () => {
  return (
    <div className={styles.simplePreloader}>
      <img src={preloaderImage} className={styles.rotating} alt="preloader" />
    </div>
  );
};
