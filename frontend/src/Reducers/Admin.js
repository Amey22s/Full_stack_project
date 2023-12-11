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
      state.isAdmin = true;
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
      state.admin = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = true;
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
      state.admin = null;
      state.isAuthenticated = false;
      state.isAdmin = true;
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
  
  export const allUsersForAdminReducer = createReducer(initialState, builder => {
    builder.addCase("allUsersForAdminRequest", (state) => {
      state.loading = true;
    })
    builder.addCase("allUsersForAdminSuccess", (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
  
    builder.addCase("allUsersForAdminFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    builder.addCase("clearErrors", (state) => {
      state.error = null;
    })
    builder.addCase("setUserProfile", (state,action) => {
      state.user = action.payload;
    })
  });