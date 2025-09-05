import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import  type { RootState } from "../Redux/Store";

const ProtectedRoutes = (/*{ allowedRoles }*/) => {
  const { token, user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated || !token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Si tu veux ajouter des rôles plus tard :
  // if (allowedRoles && !allowedRoles.includes(user.role)) {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoutes;
