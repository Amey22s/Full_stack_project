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
      state.isAdmin = true;
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
    builder.addCase("LoadAdminRequest", (state) => {
      state.loading = true;
    })
    builder.addCase("LoadAdminSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    builder.addCase("LoadAdminFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
  
    builder.addCase("LogoutAdminRequest", (state) => {
      state.loading = true;
    })
    builder.addCase("LogoutAdminSuccess", (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    })
    builder.addCase("LogoutAdminFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    })
    builder.addCase("clearErrors", (state) => {
      state.error = null;
    })
  });
  