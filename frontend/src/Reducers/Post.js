import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const likeReducer = createReducer(initialState, builder => {
  builder.addCase("likeRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("likeSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })
  builder.addCase("likeFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("addCommentRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("addCommentSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })
  builder.addCase("addCommentFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("deleteCommentRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("deleteCommentSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })
  builder.addCase("deleteCommentFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })

  builder.addCase("newPostRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("newPostSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })
  builder.addCase("newPostFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("updateCaptionRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("updateCaptionSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })
  builder.addCase("updateCaptionFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("deletePostRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("deletePostSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })
  builder.addCase("deletePostFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("updateProfileRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("updateProfileSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })
  builder.addCase("updateProfileFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("updatePasswordRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("updatePasswordSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })
  builder.addCase("updatePasswordFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("deleteProfileRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("deleteProfileSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })
  builder.addCase("deleteProfileFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("forgotPasswordRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("forgotPasswordSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })
  builder.addCase("forgotPasswordFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("resetPasswordRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("resetPasswordSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })
  builder.addCase("resetPasswordFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("followUserRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("followUserSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })
  builder.addCase("followUserFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("clearErrors", (state) => {
    state.error = null;
  })
  builder.addCase("clearMessage", (state) => {
    state.message = null;
  })
});

export const myPostsReducer = createReducer(initialState, builder => {
  builder.addCase("myPostsRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("myPostsSuccess", (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  })
  builder.addCase("myPostsFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("clearErrors", (state) => {
    state.error = null;
  })
});

export const userPostsReducer = createReducer(initialState, builder => {
  builder.addCase("userPostsRequest", (state) => {
    state.loading = true;
  })
  builder.addCase("userPostsSuccess", (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  })
  builder.addCase("userPostsFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase("clearErrors", (state) => {
    state.error = null;
  })
});
