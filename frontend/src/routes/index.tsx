import { Routes, Route } from "react-router-dom";
import PublicRoutes from "../pages/RoutesPublics";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import Page404 from "../pages/Page404";
import ProtectedRoutes from "../pages/ProtectRoutes";
import DashboardPage from "../pages/DashBoard";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoutes />}>
        <Route index element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedRoutes />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};
