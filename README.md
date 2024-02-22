# React project template

# 功能

- 动态路由、权限路由
- redux 全局状态管理
- axios 网络请求
- 引用 antd 第三方 UI 组件库
- 权限菜单、路由守卫
- 集成 eslint + prettier
- 集成 husky (git commitLint)

# 目录

```js
src
├── components // 全局组件
│   ├── business  // 业务
│   └── common  // 公共
├── http  // 网络
│   ├── request.js // 请求类实例
│   └── test.js // 请求方法例子
├── router  // 路由
│   ├── createRoute.js  // 创建路由方法
│   ├── mainRoutes.js // 路由表
│   ├── mockApiRoutes.js  // 模拟接口请求回来的路由表
│   └── routeMap.js // 路由字段映射
├── store // 仓库
│   ├── common.js  // 公共模块
│   ├── index.js  // 普通仓库
│   ├── toolkitIndex.js // 升级版（主要用这个）
│   └── userInfo.js // 用户模块
├── views // 页面
│   ├── home
│   ├── login
│   ├── menu
│   └── userManage
├── App.css
├── App.js
├── App.test.js
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
└── setupTests.js
```

## Available Scripts

In the project directory, you can run:

### `npm start`

### `npm run build`

### `npm run eject`
