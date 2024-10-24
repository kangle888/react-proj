import React from "react";
import { Layout, theme } from "antd";
import { Routes, Route, useLocation } from "react-router-dom";
import MenuComponent from "./components/MenuComponent/MenuComponent";
import BreadcrumbComponent from "./components/BreadcrumbComponent";
import ContentComponent from "./components/ContentComponent";
import { LoginPage } from "./views/loginPage";

const { Header, Footer } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 判断是否是登录页
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {isLoginPage ? (
        // 如果是登录页，直接渲染登录页面
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      ) : (
        // 否则渲染带 Layout 的内容
        <Layout style={{ minHeight: "100vh" }}>
          <MenuComponent /> {/* 渲染菜单组件 */}
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }} />
            <BreadcrumbComponent /> {/* 渲染面包屑组件 */}
            <ContentComponent /> {/* 渲染内容组件 */}
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default App;
