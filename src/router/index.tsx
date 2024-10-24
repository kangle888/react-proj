import { Navigate } from "react-router-dom";
import { HomePage } from "../views/main/homePage";
import { AboutPage } from "../views/main/aboutPage";
import { LoginPage } from "../views/loginPage";
import PrivateRoute from "./PrivateRoute";

const routes = [
  {
    path: "/",
    element: <Navigate to="/login" />, // 将根路径重定向到登录页面
  },
  {
    path: "/login",
    element: <LoginPage />, // 登录页面路由
  },
  {
    path: "/home",
    element: <PrivateRoute element={<HomePage />} />, // 保护路由
  },
  {
    path: "/about",
    element: <PrivateRoute element={<AboutPage />} />, // 保护路由
  },
];

export default routes;
