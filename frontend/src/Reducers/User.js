import { createReducer } from "@reduxjs/toolkit";
const initialState = {
};



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

export const newsReducer = createReducer(initialState, builder => {
  builder.addCase("updateSearchTerm", (state,action) => {
    state.searchTerm = action.payload;
  })
  builder.addCase("setSearchResult", (state,action) => {
    state.searchResults = action.payload;
  })
  builder.addCase("selectArticle", (state,action) => {
    state.selectedArticle = action.payload;
  })
  builder.addCase("newsFailure", (state,action) => {
    state.error = action.payload;
  })
  builder.addCase("clearErrors", (state) => {
    state.error = null;
  })
})
