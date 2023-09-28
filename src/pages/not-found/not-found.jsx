import image404 from "../../images/404_background.png";
import styles from "./not-found.module.css";

const NotFound = () => {
  return <img src={image404} className={styles.NotFound} />;
};

export default NotFound;
