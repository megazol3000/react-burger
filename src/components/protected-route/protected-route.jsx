import { Route } from "react-router-dom";

export const ProtectedRouteElement = ({ element }) => {
  if (localStorage.getItem("accessToken")) {
    return null;
  }
  return element;
};
