// components/ContentComponent.tsx
import React from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import routes from "../../router"; // 路由配置

const { Content } = Layout;

const ContentComponent: React.FC = () => {
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: "#fff", // 可以改为从 theme 中获取颜色
      }}
    >
      {/* 配置路由 */}
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Content>
  );
};

export default ContentComponent;
