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
    .addCase('GET_APPROVAL_REQUESTS_REQUEST', (state, action) => {
      state.loading = true;
    })
    .addCase('GET_APPROVAL_REQUESTS_SUCCESS', (state, action) => {
      state.loading = false;
      state.approvalRequests = action.payload;
    })
    .addCase('GET_APPROVAL_REQUESTS_FAILURE', (state, action) => {
      state.error = action.payload;
      state.error = action.payload;
    })
    // Handling clear actions
    .addCase('clearItemErrors', (state) => {
      state.error = null;
    })
    .addCase('clearItemMessages', (state) => {
      state.message = null;
    })
    .addCase('MarkInterestRequest', (state) => {
      state.loading = true;
    })
    .addCase('MarkInterestSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.interestMarked = true;
      // Updating the itemsOnSale to reflect interest marked
      state.itemsOnSale = state.itemsOnSale.map((item) => {
        if (item._id === action.payload.itemId) {
          // Assuming the backend response includes the itemId
          return { ...item, interested: true };
        }
        return item;
      });
    })
    .addCase('MarkInterestFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Handling approving sale
    .addCase('ApproveSaleRequest', (state) => {
      state.loading = true;
    })
    .addCase('ApproveSaleSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      // Update item status to 'sold' and set soldTo
      state.myItems = state.myItems.map((item) =>
        item._id === action.payload.itemId
          ? { ...item, status: 'sold', soldTo: action.payload.buyerId }
          : item
      );
    })
    .addCase('ApproveSaleFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Handling declining interest
    .addCase('DeclineSaleRequest', (state) => {
      state.loading = true;
    })
    .addCase('DeclineSaleSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      // Remove buyerId from interestedBuyers array
      state.myItems = state.myItems.map((item) =>
        item._id === action.payload.itemId
          ? {
              ...item,
              interestedBuyers: item.interestedBuyers.filter(
                (buyerId) => buyerId !== action.payload.buyerId
              ),
            }
          : item
      );
    })
    .addCase('DeclineSaleFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default itemReducer;
