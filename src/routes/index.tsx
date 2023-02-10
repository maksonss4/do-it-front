import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";

export const ContainerRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route element={<ProtectedRoutes />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>

    <Route path="*" element={<Navigate replace to={"/"} />} />
  </Routes>
);
