import { useLocation, Navigate } from "react-router-dom";

export default function ProtectedRoute({ element, anonymous = false }) {
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
}
