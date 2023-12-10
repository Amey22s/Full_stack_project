import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  items: [], // Items created by the user
  itemsOnSale: [], // Items available for sale (not posted by the user)
  myItems: [], // Items posted by the user
  approvalRequests: [], // Approval requests for the user's items
  error: null,
  message: null,
};

export const itemReducer = createReducer(initialState, (builder) => {
  builder
    // Handling item creation
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
    // Handling fetching items on sale
    .addCase('GET_ITEMS_ON_SALE_SUCCESS', (state, action) => {
      state.itemsOnSale = action.payload;
    })
    .addCase('GET_ITEMS_ON_SALE_FAILURE', (state, action) => {
      state.error = action.payload;
    })
    // Handling fetching user's items
    .addCase('GET_MY_ITEMS_SUCCESS', (state, action) => {
      state.myItems = action.payload;
    })
    .addCase('GET_MY_ITEMS_FAILURE', (state, action) => {
      state.error = action.payload;
    })
    // Handling fetching approval requests
    .addCase('GET_APPROVAL_REQUESTS_SUCCESS', (state, action) => {
      state.approvalRequests = action.payload;
    })
    .addCase('GET_APPROVAL_REQUESTS_FAILURE', (state, action) => {
      state.error = action.payload;
    })
    // Handling clear actions
    .addCase('clearItemErrors', (state) => {
      state.error = null;
    })
    .addCase('clearItemMessages', (state) => {
      state.message = null;
    });
});

export default itemReducer;
