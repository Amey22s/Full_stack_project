import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  trader: null,
  isAuthenticated: false,
  error: null,
  approvalRequests: [],
};

export const traderReducer = createReducer(initialState, (builder) => {
  console.log('inside trader reducer');
  builder
    .addCase('LoadTraderRequest', (state) => {
      state.loading = true;
    })
    .addCase('LoadTraderSuccess', (state, action) => {
      state.loading = false;
      state.trader = action.payload; // This should include itemsBought and other details
      state.isAuthenticated = true; // Assuming successful load implies authentication
    })
    .addCase('LoadTraderFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('TraderLoginRequest', (state) => {
      state.loading = true;
    })
    .addCase('TraderLoginSuccess', (state, action) => {
      state.loading = false;
      state.trader = action.payload;
      state.isAuthenticated = true;
      state.isTrader = true;
    })
    .addCase('TraderLoginFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase('LogoutTraderRequest', (state) => {
      state.loading = true;
    })
    .addCase('LogoutTraderFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase('TraderLogoutSuccess', (state) => {
      state.loading = false;
      state.trader = null;
      state.isAuthenticated = false;
    })
    // Adding cases for trader registration
    .addCase('TraderRegisterRequest', (state) => {
      state.loading = true;
    })
    .addCase('TraderRegisterSuccess', (state, action) => {
      state.loading = false;
      state.trader = action.payload;
      state.isAuthenticated = true;
    })
    .addCase('TraderRegisterFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase('TraderUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('TraderUserSuccess', (state, action) => {
      state.loading = false;
      state.trader = action.payload;
      state.isAuthenticated = true;
    })
    .addCase('TraderUserFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase('TraderApprovalRequestsRequest', (state) => {
      state.loading = true;
    })
    .addCase('TraderApprovalRequestsSuccess', (state, action) => {
      state.loading = false;
      state.approvalRequests = action.payload;
    })
    .addCase('TraderApprovalRequestsFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});

// Add more reducers or actions as needed for additional trader functionalities
export const TraderProfileReducer = createReducer(initialState, (builder) => {
  builder.addCase('TraderProfileRequest', (state) => {
    state.loading = true;
  });
  builder.addCase('TraderProfileSuccess', (state, action) => {
    state.loading = false;
    state.trader = action.payload;
  });

  builder.addCase('TraderProfileFailure', (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase('clearErrors', (state) => {
    state.error = null;
  });
});
