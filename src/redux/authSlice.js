import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";
import { userEdit } from "./authActions";

// Initialize userToken from local storage (may remove)
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
    },
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userInfo = payload.userInfos;
        state.userToken = payload.body.token;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(userEdit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userEdit.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userInfo.firstName = payload.firstName;
        state.userInfo.lastName = payload.lastName;
      })
      .addCase(userEdit.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout, removeError } = authSlice.actions;

export default authSlice.reducer;
