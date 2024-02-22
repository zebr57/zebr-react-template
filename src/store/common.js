import { createSlice } from "@reduxjs/toolkit";

const httpSlice = createSlice({
  name: "httpSlice",
  initialState: {
    cancelTokens: []
  },
  reducers: {
    changeCancelToken(state, action) {
      state.cancelTokens = action.payload;
    }
  }
});

const httpReducer = httpSlice.reducer;
export const { changeCancelToken } = httpSlice.actions;
export default httpReducer;
