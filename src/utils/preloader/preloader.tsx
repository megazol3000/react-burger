import preloaderImage from "../../images/preloader.png";
import styles from "./preloader.module.css";

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <img src={preloaderImage} className={styles.rotating} alt="preloader" />
    </div>
  );
};

export default Preloader;
