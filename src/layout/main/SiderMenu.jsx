import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import mockApiRoutes from "../../router/mockApiRoutes"; // 权限相关路由
import { getIsAuth } from "../../utils/getIsAuth";

const items = mockApiRoutes;
/**
 * @description: 过滤不需要显示、没有权限的菜单
 * @param {*} node 路由节点对象
 * @return {array} []
 */
function filterNodes(node) {
  if (node.meta && node.meta.hidden) {
    return false;
  }
  if (node.meta && node.meta.auth && !getIsAuth(node.meta.auth)) {
    return false;
  }
  if (node.children) {
    node.children = node.children.filter((item) => filterNodes(item));
  }
  return true;
}

function SiderMenu() {
  const filterItems = items.filter((item) => filterNodes(item));
  const navTo = useNavigate();
  const location = useLocation()
  const goPage = ({ key }) => {
    navTo(key);
  };
  return <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]} items={filterItems} onClick={goPage} />;
}

export default SiderMenu;
