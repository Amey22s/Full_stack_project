import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const messageReducer = createReducer(initialState, builder => {
    builder.addCase("messageRequest", (state) => {
        state.loading = true;
      });

      builder.addCase("messageSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      });

      builder.addCase("messageFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder.addCase("clearErrors", (state) => {
        state.error = null;
      })
    });


    export const myConversationsReducer = createReducer(initialState, builder => {
        builder.addCase("myConversationsRequest", (state) => {
          state.loading = true;
        });

        builder.addCase("myConversationsSuccess", (state, action) => {
          state.loading = false;
          state.conversations = action.payload;
        });
      
        builder.addCase("myConversationsFailure", (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });

        builder.addCase("clearErrors", (state) => {
          state.error = null;
        })
      });


      export const allMessagesReducer = createReducer(initialState, builder => {
        builder.addCase("allMessagesRequest", (state) => {
          state.loading = true;
        });

        builder.addCase("allMessagesSuccess", (state, action) => {
          state.loading = false;
          state.selectedConversation = action.payload;
        });
      
        builder.addCase("allMessagesFailure", (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });

        builder.addCase("clearErrors", (state) => {
          state.error = null;
        });
      });


      export const newChatReducer = createReducer(initialState, builder => {
        builder.addCase("newChatRequest", (state) => {
          state.loading = true;
        })
        builder.addCase("newChatSuccess", (state, action) => {
          state.loading = false;
          state.selectedConversation = action.payload;
        })
        builder.addCase("newChatFailure", (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
      })