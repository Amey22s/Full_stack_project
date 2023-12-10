import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  items: [],
  error: null,
  message: null,
};

export const itemReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('createItemRequest', (state) => {
      state.loading = true;
    })
    .addCase('createItemSuccess', (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
      state.message = 'Item created successfully';
    })
    .addCase('createItemFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Add more cases as needed for other item-related actions
    .addCase('clearItemErrors', (state) => {
      state.error = null;
    })
    .addCase('clearItemMessages', (state) => {
      state.message = null;
    });
});

// Add more reducer cases as needed for other functionalities related to items
