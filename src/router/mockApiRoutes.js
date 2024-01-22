const mockRoutes = [
  {
    title: "用户信息",
    path: "/userInfo",
    component: "UserInfo",
  },
  {
    title: "菜单",
    path: "/menu",
    component: "Menu",
    children: [
      { title: "子菜单1", path: "son1", component: "Son1" }, // /menu/son1
      { title: "子菜单2", path: "son2", component: "Son2" },
    ],
  },
];

export default mockRoutes;
