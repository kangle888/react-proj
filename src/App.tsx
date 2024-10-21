import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Layout, Breadcrumb, theme } from "antd";
import MenuComponent from "./components/MenuComponent"; // 你已有的菜单组件
import { breadcrumbNameMap } from "./utils/breadcrumbNameMap";
import { HomePage } from "./views/homePage";
import { AboutPage } from "./views/aboutPage";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // 生成面包屑路径
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      title: <span>{breadcrumbNameMap[url]}</span>,
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
            <Route path="/option1" element={<HomePage />} />
            <Route path="/option2" element={<div>Option 2 Content</div>} />
            <Route path="/user/tom" element={<AboutPage />} />
            <Route path="/user" element={<Navigate to="/user/tom" />} />
            <Route path="/user/bill" element={<AboutPage />} />
            <Route path="/user/alex" element={<div>Alex's Profile</div>} />
            <Route path="/team/team1" element={<div>Team 1 Content</div>} />
            <Route path="/team/team2" element={<div>Team 2 Content</div>} />
            <Route path="/files" element={<div>Files Content</div>} />
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
