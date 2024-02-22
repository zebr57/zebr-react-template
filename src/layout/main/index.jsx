import React, { useState, Suspense } from "react";
import { Routes } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme, Flex } from "antd";
import SiderMenu from "./SiderMenu";
import createRoute from "../../router/createRoute";
import mockApiRoutes from "../../router/mockApiRoutes"; // 权限相关路由
import UserInfo from "./UserInfo";

import "./index.css";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false); // 是否折叠
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <SiderMenu></SiderMenu>
      </Sider>
      <Layout>
        <Header
          style={{
            height: 48,
            lineHeight: "normal",
            padding: 0,
            background: colorBgContainer,
            paddingRight: "16px",
          }}
        >
          <Flex
            style={{
              width: "100%",
              height: "100%",
            }}
            justify="space-between"
            align="center"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 48,
                height: 48,
              }}
            />
            {/* 用户信息下拉框 */}
            <UserInfo style={{ height: 48 }}></UserInfo>
          </Flex>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            height: "calc(100vh - 96px)",
            overflow: "hidden",
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
