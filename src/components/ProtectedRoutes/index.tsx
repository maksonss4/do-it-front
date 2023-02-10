import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const ProtectedRoutes = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/" replace />;
};
