import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useSelector } from "react-redux";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let userInfo = useSelector((state) => {
    return state.userInfoReducer.userInfo;
  });

  const items = [
    {
      key: "1",
      label: <div onClick={(e) => console.log("个人中心")}>个人中心</div>,
      icon: <UserOutlined />
    },
    {
      key: "2",
      danger: true,
      label: (
        <div
          onClick={() => {
            localStorage.removeItem("auth");
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            navigate({ pathname: "/login", search: "?redirect=" + location.pathname });
          }}
        >
          退出登录
        </div>
      ),
      icon: <LogoutOutlined />
    }
  ];
  return (
    <Dropdown
      menu={{
        items
      }}
      arrow
    >
      <Space>
        {userInfo.name ? userInfo.name : localStorage.getItem("username")}
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};
export default App;
