import axios from 'axios';

export const traderLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'TraderLoginRequest',
    });

    // Update the endpoint URL according to your backend API routes
    const { data } = await axios.post(
      '/api/trader/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: 'TraderLoginSuccess',
      payload: data.trader, // Assuming the backend returns trader data
    });
  } catch (error) {
    dispatch({
      type: 'TraderLoginFailure',
      payload: error.response.data.message,
    });
  }
};

export const registerTrader =
  (name, email, password, avatar) => async (dispatch) => {
    console.log('Register trader action');

    try {
      console.log('inside try');
      dispatch({
        type: 'TraderRegisterRequest',
      });
      console.log('after traderregisterrequest dispatch');

      // Assuming your backend expects JSON data
      const { data } = await axios.post(
        '/api/trader/register', // Update this URL to your trader registration endpoint
        { name, email, password, avatar },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('data after axios post', data);

      dispatch({
        type: 'TraderRegisterSuccess',
        payload: data.trader, // Update according to the response structure from your backend
      });
    } catch (error) {
      dispatch({
        type: 'TraderRegisterFailure',
        payload: error.response.data.message,
      });
    }
  };

export const loadTrader = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LoadTraderRequest',
    });

    const { data } = await axios.get('/api/trader/loadTrader');

    dispatch({
      type: 'LoadTraderSuccess',
      payload: data.trader,
    });
  } catch (error) {
    dispatch({
      type: 'LoadTraderFailure',
      payload: error.response.data.message,
    });
  }
};

export const logoutTrader = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LogoutTraderRequest',
    });

    await axios.get('/api/trader/logout');

    dispatch({
      type: 'TraderLogoutSuccess',
    });
  } catch (error) {
    dispatch({
      type: 'LogoutTraderFailure',
      payload: error.response.data.message,
    });
  }
};
export const getTraderProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'TraderProfileRequest',
    });
    console.log(id, 'id in get trader action');
    const { data } = await axios.get(`/api/trader/${id}`);
    dispatch({
      type: 'TraderProfileSuccess',
      payload: data.trader,
    });
  } catch (error) {
    dispatch({
      type: 'TraderProfileFailure',
      payload: error.response.data.message,
    });
  }
};

// Action to fetch approval requests
export const getTraderApprovalRequests = (traderId) => async (dispatch) => {
  try {
    dispatch({ type: 'TraderApprovalRequestsRequest' });

    const { data } = await axios.get(
      `/api/trader/${traderId}/approvalRequests`
    ); // Update with your API endpoint
    console.log(data, 'data in action');
    console.log('from getapproval action', data.approvalRequests);
    dispatch({
      type: 'TraderApprovalRequestsSuccess',
      payload: data.approvalRequests,
    });
  } catch (error) {
    dispatch({
      type: 'TraderApprovalRequestsFailure',
      payload: error.response.data.message,
    });
  }
};
