// 1.引入
import { legacy_createStore as createStore, combineReducers } from "redux";
// 2.定义方法
function mesReducer(state = { mes: "hello" }, action) {
  switch (action.type) {
    case "changeMes":
      state.mes = action.payload;
      return { ...state };
    case "resetMes":
      state.mes = "hello";
      return { ...state };
    default:
      return state;
  }
}

function numReducer(state = { num: 0 }, action) {
  switch (action.type) {
    case "changeNum":
      state.num = action.payload;
      return { ...state };
    case "resetNum":
      state.num = 0;
      return { ...state };
    default:
      return state;
  }
}

// 创建模块化的reducer
const reducer = combineReducers({
  mesReducer,
  numReducer,
});
// 3.创建store
let store = createStore(reducer);

export default store;

// 推荐使用toolkit方式 -> ./toolkitIndex
