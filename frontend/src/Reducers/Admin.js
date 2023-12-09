import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const adminReducer = createReducer(initialState, builder => {
    builder.addCase("AdminLoginRequest", (state) => {
      state.loading = true;
    })
    builder.addCase("AdminLoginSuccess", (state, action) => {
      state.loading = false;
      state.admin = action.payload;
      state.isAuthenticated = true;
    })
    builder.addCase("AdminLoginFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    builder.addCase("AdminRegisterRequest", (state) => {
      state.loading = true;
    })
    builder.addCase("AdminRegisterSuccess", (state, action) => {
      state.loading = false;
      state.admin = action.payload;
      state.isAuthenticated = true;
    })
    builder.addCase("AdminRegisterFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    builder.addCase("clearErrors", (state) => {
      state.error = null;
    })
  });
  