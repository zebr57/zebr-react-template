import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import createRoute from "./router/createRoute";
import mainRoutes from "./router/mainRoutes"; // 一些主要路由
// import mockApiRoutes from "./router/mockApiRoutes"; // 权限相关路由
import MainLayout from "./layout/main";
import AuthRoute from "./router/authRoute";

// const MainLayout = lazy(() => import("./layout/main"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {createRoute(mainRoutes)}
          <Route
            path="/*"
            element={
              <AuthRoute>
                <MainLayout></MainLayout>
              </AuthRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
