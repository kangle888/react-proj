// components/BreadcrumbComponent.tsx
import React from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { breadcrumbNameMap } from "../../utils/breadcrumbNameMap"; // 路径映射

const BreadcrumbComponent: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      title: <span>{breadcrumbNameMap[url] || url}</span>,
    };
  });

  return (
    <Breadcrumb
      style={{ margin: "24px 16px 0 16px" }}
      items={breadcrumbItems}
    />
  );
};

export default BreadcrumbComponent;
