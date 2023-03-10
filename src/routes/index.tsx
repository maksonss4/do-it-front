import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";

export const ContainerRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoutes />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    <Route path="*" element={<Navigate replace to={"/dashboard"} />} />
  </Routes>
);
