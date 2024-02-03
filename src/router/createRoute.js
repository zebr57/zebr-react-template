import { Route } from "react-router-dom";
import routeMap from "./routeMap";
import { getIsAuth } from "../utils/getIsAuth";

export function createRoute(routesList) {
  return routesList.map((item) => {
    if (item.meta && item.meta.auth && !getIsAuth(item.meta.auth)) return null;
    if (item.children && item.children.length > 0) {
      return (
        <Route key={item.path} path={item.path} Component={routeMap[item.component]}>
          {createRoute(item.children)}
        </Route>
      );
    } else {
      return <Route key={item.path} path={item.path} Component={routeMap[item.component]}></Route>;
    }
  });
}
export default createRoute;
