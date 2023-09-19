import { useLocation, Navigate } from "react-router-dom";

export const ProtectedRouteElement = ({ element }) => {
  const location = useLocation();

  const authorizedLock = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  const notAuthorizedLock = "/profile";

  console.log(location.pathname);
  console.log(localStorage.getItem("resetPasswordAccess"));

  if (
    localStorage.getItem("accessToken") &&
    authorizedLock.includes(location.pathname)
  ) {
    return <Navigate to="/profile" replace />;
  } else if (
    !localStorage.getItem("accessToken") &&
    location.pathname.includes(notAuthorizedLock)
  ) {
    return <Navigate to="/login" replace />;
  } else if (
    !localStorage.getItem("resetPasswordAccess") &&
    location.pathname === "/reset-password"
  ) {
    return <Navigate to="/forgot-password" replace />;
  }
  return element;
};
