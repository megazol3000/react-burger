import { FC, ReactElement } from "react";
import { useLocation, Navigate } from "react-router-dom";

interface IProtectedRouteProps {
  element: ReactElement;
  anonymous: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({
  element,
  anonymous = false,
}) => {
  const isLoggedIn = localStorage.getItem("accessToken") ? true : false;
  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;
