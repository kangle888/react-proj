import { Navigate } from "react-router-dom";
import { localCache } from "@/utils/cache"; // 假设你用这个方法获取 token
import { LOGIN_TOKEN } from "@/global/constants"; // 常量定义

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const token = localCache.getCache(LOGIN_TOKEN); // 从缓存中获取 token
  console.log("token", token);

  // 如果没有 token，则重定向到登录页面
  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
