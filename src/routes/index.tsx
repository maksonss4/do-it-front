import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";

export const ContainerRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="*" element={<Navigate replace to={"/"} />} />
  </Routes>
);
