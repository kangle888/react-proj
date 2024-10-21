import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./MenuComponten.module.less";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => ({
  key,
  icon,
  children,
  label,
});

// 确保路径与路由配置一致
const items: MenuItem[] = [
  getItem("功能配置", "/about", <PieChartOutlined />), // 更新路径
  getItem("系统总览", "/home", <UserOutlined />), // 更新路径
];

const MenuComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // 点击菜单项时触发导航
  const onMenuClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className={styles.logoVertical} />
      <Menu
        theme="dark"
        defaultSelectedKeys={["/home"]} // 默认选中项
        mode="inline"
        items={items}
        onClick={onMenuClick} // 点击时触发导航
      />
    </Sider>
  );
};

export default MenuComponent;
