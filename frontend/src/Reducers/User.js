import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
// const LoginRequest = createAction()
// const LoginSuccess = createAction()
// const LoginFailure = createAction()
// const RegisterRequest = createAction()
// const RegisterSuccess = createAction()
// const RegisterFailure = createAction()
// const LoadUserRequest = createAction()
// const LoadUserSuccess = createAction()
// const LoadUserFailure = createAction()
// const LogoutUserRequest = createAction()
// const LogoutUserSuccess = createAction()
// const LogoutUserFailure = createAction()
// const clearErrors = createAction()
// const postOfFollowingRequest = createAction()
// const postOfFollowingSuccess = createAction()
// const postOfFollowingFailure = createAction()
// const allUsersRequest = createAction()
// const allUsersSuccess = createAction()
// const allUsersFailure = createAction()
// const userProfileRequest = createAction()
// const userProfileSuccess = createAction()
// const userProfileFailure = createAction()


export const userReducer = createReducer(initialState, builder => {
  builder.addCase("LoginRequest",(state) => { state.loading = true; })
  builder.addCase("LoginSuccess", (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  })
  builder.addCase("LoginFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  })
  builder.addCase("RegisterRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("RegisterSuccess", (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  })
  builder.addCase("RegisterFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  })
  builder.addCase("LoadUserRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("LoadUserSuccess", (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  })
  builder.addCase("LoadUserFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  })

  builder.addCase("LogoutUserRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("LogoutUserSuccess", (state) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  })
  builder.addCase("LogoutUserFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  })
  builder.addCase("clearErrors", (state) => {
    state.error = null;
  })
});

export const postOfFollowingReducer = createReducer(initialState, builder => {

  builder.addCase("postOfFollowingRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("postOfFollowingSuccess", (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  })
  builder.addCase("postOfFollowingFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("clearErrors", (state) => {
    state.error = null;
  })
});

export const allUsersReducer = createReducer(initialState, builder => {
  builder.addCase("allUsersRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("allUsersSuccess", (state, action) => {
    state.loading = false;
    state.users = action.payload;
  })

  builder.addCase("allUsersFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("clearErrors", (state) => {
    state.error = null;
  })
});

export const userProfileReducer = createReducer(initialState, builder => {
  builder.addCase("userProfileRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("userProfileSuccess", (state, action) => {
    state.loading = false;
    state.user = action.payload;
  })

  builder.addCase("userProfileFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("clearErrors", (state) => {
    state.error = null;
  })
});
