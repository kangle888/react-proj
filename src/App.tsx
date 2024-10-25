import React from "react";
import { Layout } from "antd";
import { Routes, Route, useLocation } from "react-router-dom";
import MenuComponent from "./components/MenuComponent/MenuComponent";
// import BreadcrumbComponent from "./components/BreadcrumbComponent";
import ContentComponent from "./components/ContentComponent";
import HeaderComponent from "./components/HeaderComponent";
import { LoginPage } from "./views/loginPage";

const { Footer } = Layout;

const App: React.FC = () => {
  const location = useLocation();

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
        <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
          <MenuComponent /> {/* 渲染菜单组件 */}
          <Layout>
            <HeaderComponent /> {/* 渲染头部组件 */}
            {/* <BreadcrumbComponent /> 渲染面包屑组件 */}
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
