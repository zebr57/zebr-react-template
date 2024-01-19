import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import createRoute from "./router/createRoute";
import mainRoutes from "./router/mainRoutes"; // 一些主要路由
import mockApiRoutes from "./router/mockApiRoutes"; // 权限相关路由

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>{createRoute(mainRoutes.concat(mockApiRoutes))}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
