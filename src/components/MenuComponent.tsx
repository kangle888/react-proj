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

const items: MenuItem[] = [
  getItem("功能配置", "/option1", <PieChartOutlined />),
  getItem("系统总览", "sub1", <UserOutlined />, [
    getItem("病毒查杀", "/user/tom"),
    getItem("入侵防护", "/user/bill"),
  ]),
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
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onClick={onMenuClick} // 点击时触发导航
      />
    </Sider>
  );
};

export default MenuComponent;
