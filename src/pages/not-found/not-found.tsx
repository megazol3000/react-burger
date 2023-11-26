import { FC } from "react";
import image404 from "../../images/404_background.png";
import styles from "./not-found.module.css";

const NotFound:FC = () => {
  return <img src={image404} className={styles.NotFound} alt="404" />;
};

export default NotFound;
