import image404 from "../images/404_background.png";

const NotFound = () => {
  return (
    <img
      src={image404}
      style={{ width: "100%", height: "calc(100vh - 88px)" }}
    />
  );
};

export default NotFound;
