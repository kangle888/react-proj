import React from "react";
import { Routes, Route, useLocation, } from "react-router-dom";
import { Layout, Breadcrumb, theme } from "antd";
import MenuComponent from "./components/MenuComponent/MenuComponent"; // 你已有的菜单组件
import { breadcrumbNameMap } from "./utils/breadcrumbNameMap";
import routes from './router/index';


const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // 生成面包屑路径
   // 生成面包屑路径
   const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      title: <span>{breadcrumbNameMap[url] || url}</span>, // 使用映射或默认路径
    };
  });
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <MenuComponent /> {/* 渲染菜单组件 */}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Breadcrumb
          style={{ margin: "24px 16px 0 16px" }}
          items={breadcrumbItems}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* 配置路由 */}
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
