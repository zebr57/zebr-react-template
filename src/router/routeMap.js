import { lazy } from "react";
import Home from "../views/home/index";
import Login from "../views/login/index";
// import Menu from "../views/menu/index";
// import Son1 from "../views/menu/son1";
// import Son2 from "../views/menu/son2";
// import UserInfo from "../views/userManage/index";
import NotFound from "../views/notFound";

const routeMap = {
  Home,
  Login,
  NotFound,
  Menu: lazy(() => import("../views/menu/index")),
  Son1: lazy(() => import("../views/menu/son1")),
  Son2: lazy(() => import("../views/menu/son2")),
  UserInfo: lazy(() => import("../views/userManage/index")),
};

export default routeMap;
