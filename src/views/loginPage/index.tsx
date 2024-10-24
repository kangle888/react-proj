import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { accountLoginRequest } from "@/service/login/login";
import { LOGIN_TOKEN } from "@/global/constants";
import { localCache } from "@/utils/cache";

export const LoginPage = () => {
  const navigate = useNavigate();
  const loginBtn = async () => {
    const res = await accountLoginRequest({
      loginName: "admin",
      password: "wuxinghongqi",
    });
    console.log(res);
    if (res.code === 200) {
      localCache.setCache(LOGIN_TOKEN, res.data);
      // console.log("登录成功");
      // 登录成功后，可以跳转到首页
      navigate("/home");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {/* 这里可以放置登录表单 */}
      <Button type="primary" onClick={loginBtn}>
        登录
      </Button>
    </div>
  );
};
