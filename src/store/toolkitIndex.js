// 1.引入 （toolkit只是使我们书写起来比较直观）
import { createSlice, configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfo";
import httpReducer from "./common";
// 4. 异步,定义必须在 slice 前面, 第一个参数可随意起
export let changeNumThunk = createAsyncThunk("numSlice/changeNum", async () => {
  let res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(999);
    }, 1000);
  });
  return res;
});

// 2.1 定义mes切片（模块化）
let mesSlice = createSlice({
  name: "mesSlice", // 切片名，dispatch时需要加的前缀
  initialState: {
    mes: "hello" // 初始状态值
  },
  reducers: {
    // 定义修改状态值方法
    changeMes(state, action) {
      state.mes = action.payload;
    }
  }
});
// 2.2 定义num切片（模块化）
let numSlice = createSlice({
  name: "numSlice",
  initialState: {
    num: 0
  },
  reducers: {
    addNum(state, action) {
      state.num += 1;
    }
  },
  // 异步reducers
  extraReducers: (chunk) => {
    chunk.addCase(changeNumThunk.pending, () => {
      console.log("pending");
    });
    chunk.addCase(changeNumThunk.fulfilled, (state, action) => {
      state.num = action.payload;
      console.log(state.num);
    });
    chunk.addCase(changeNumThunk.rejected, () => {
      console.log("rejected");
    });
  }
});
// 3.配置模块化仓库
const store = configureStore({
  reducer: {
    mesReducer: mesSlice.reducer,
    numReducer: numSlice.reducer,
    userInfoReducer,
    httpReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// console.log(mesSlice.actions); // {changeMes: ƒ}

export let { changeMes } = mesSlice.actions;
export let { addNum } = numSlice.actions;

export default store;
