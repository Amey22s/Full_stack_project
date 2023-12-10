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
    try {
      dispatch({
        type: 'TraderRegisterRequest',
      });

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
