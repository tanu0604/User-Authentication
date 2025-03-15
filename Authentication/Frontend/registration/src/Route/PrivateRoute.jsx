import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("email"); // Convert to boolean

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
