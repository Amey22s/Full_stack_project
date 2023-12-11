import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  trader: null,
  isAuthenticated: false,
  error: null,
};

export const traderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("TraderLoginRequest", (state) => {
      state.loading = true;
    })
    .addCase("TraderLoginSuccess", (state, action) => {
      state.loading = false;
      state.trader = action.payload;
      state.isAuthenticated = true;
      state.isTrader = true;
    })
    .addCase("TraderLoginFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("TraderLogoutSuccess", (state) => {
      state.trader = null;
      state.isAuthenticated = false;
    })
    // Adding cases for trader registration
    .addCase("TraderRegisterRequest", (state) => {
      state.loading = true;
    })
    .addCase("TraderRegisterSuccess", (state, action) => {
      state.loading = false;
      state.trader = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("TraderRegisterFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("TraderUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("TraderUserSuccess", (state, action) => {
      state.loading = false;
      state.trader = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("TraderUserFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

// Add more reducers or actions as needed for additional trader functionalities
