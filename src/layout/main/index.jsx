import React, { useState, Suspense } from "react";
import { Routes, useNavigate, useLocation } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import SiderMenu from "./SiderMenu";
import createRoute from "../../router/createRoute";
import mockApiRoutes from "../../router/mockApiRoutes"; // 权限相关路由

import "./index.css";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false); // 是否折叠
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <SiderMenu></SiderMenu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button
            type="text"
            onClick={() => {
              localStorage.removeItem("auth");
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              navigate({ pathname: "/login", search: "?redirect=" + location.pathname });
            }}
          >
            退出
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Suspense>
            {/* 注册路由 */}
            <Routes>{createRoute(mockApiRoutes)}</Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
