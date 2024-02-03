import { Navigate, useLocation } from "react-router-dom";
function AuthRoute(props) {
  const location = useLocation()
  // 1.获取token
  const token = localStorage.getItem("token");
  // 2.判断
  if (token) {
    // 2.1 有token，返回子节点
    return <>{props.children}</>;
  } else {
    // 2.2 没有，重定向登录页面
    return <Navigate to={{"pathname": "/login",search: "?redirect="+location.pathname}}></Navigate>
  }
}

export default AuthRoute;
