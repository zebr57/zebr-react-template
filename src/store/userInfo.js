// 1. 引入
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 4. 异步,定义必须在 slice 前面, 第一个参数可随意起，但不能跟其他地方的createAsyncThunk相同
export let changeUserInfoThunk = createAsyncThunk("userInfoSlice/changeUserInfoAsync", async () => {
  let res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "王花花",
        age: 18,
        gender: 1,
        config: {
          theme: "base",
          isNotification: true
        },
        token: "admin123",
        auth: "userInfo,menu:son1,menu:son2"
      });
    }, 1000);
  });
  return res;
});

// 2.1 定义mes切片（模块化）
let userInfoSlice = createSlice({
  name: "userInfoSlice", // 切片名，dispatch时需要加的前缀
  initialState: {
    userInfo: {
      name: "",
      age: 0,
      gender: 1,
      config: {
        theme: "base",
        isNotification: true
      },
      token: "",
      auth: ""
    }
  },
  reducers: {
    // 定义修改状态值方法
    changeUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    changeUserToken(state, action) {
      state.userInfo.token = action.payload;
    }
  },
  // 异步reducers
  extraReducers: (chunk) => {
    chunk.addCase(changeUserInfoThunk.pending, () => {
      // console.log("pending"); 一般不干嘛
    });
    chunk.addCase(changeUserInfoThunk.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    chunk.addCase(changeUserInfoThunk.rejected, () => {
      // console.log("rejected"); // 一般也不干嘛
    });
  }
});
// 3.创建
const userInfoReducer = userInfoSlice.reducer;

export const changeUserThunk = userInfoSlice.changeUserInfoThunk;

export default userInfoReducer;
