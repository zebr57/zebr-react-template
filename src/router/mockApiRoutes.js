const mockRoutes = [
  {
    label: "用户信息",
    key: "/userInfo",
    path: "/userInfo",
    component: "UserInfo",
    meta: {
      auth: "userInfo"
    }
  },
  {
    label: "多级菜单",
    key: "/menu",
    path: "/menu",
    component: "Menu",
    children: [
      { label: "子菜单1", key: "/menu/son1", path: "son1", component: "Son1" }, // /menu/son1
      { label: "子菜单2", key: "/menu/son2", path: "son2", component: "Son2" }
    ]
  },
  {
    label: "图表",
    key: "/charts",
    path: "/charts",
    component: "Charts",
    children: [
      { label: "基础图表", key: "/charts/baseChart", path: "baseChart", component: "BaseChart" }
      // { label: "子菜单2", key: "/charts/son2", path: "son2", component: "Son2" }
    ]
  },
  {
    label: "404",
    key: "/*",
    path: "/*",
    component: "NotFound",
    meta: {
      hidden: true
    }
  }
];

export default mockRoutes;
