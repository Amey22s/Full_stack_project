import axios from 'axios';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'LoginRequest',
    });

    const { data } = await axios.post(
      '/api/v1/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: 'LoginSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'LoginFailure',
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LoadUserRequest',
    });

    const { data } = await axios.get('/api/v1/me');

    console.log("Data in loadUser is ",data);

    if(data.user.name === "guest")
    {
      console.log("In if of loadUser")
      dispatch({
        type: 'LoadGuestSuccess',
        payload: data.user,
      });
    }
    else{

      console.log("In else of loadUser")
    dispatch({
      type: 'LoadUserSuccess',
      payload: data.user,
    });
  }
  } catch (error) {
    dispatch({
      type: 'LoadUserFailure',
      payload: error.response.data.message,
    });
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: 'postOfFollowingRequest',
    });

    const { data } = await axios.get('/api/v1/posts');
    dispatch({
      type: 'postOfFollowingSuccess',
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: 'postOfFollowingFailure',
      payload: error.response.data.message,
    });
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: 'myPostsRequest',
    });

    const { data } = await axios.get('/api/v1/my/posts');
    dispatch({
      type: 'myPostsSuccess',
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: 'myPostsFailure',
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers =
  (name = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: 'allUsersRequest',
      });

      const { data } = await axios.get(`/api/v1/users?name=${name}`);
      dispatch({
        type: 'allUsersSuccess',
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: 'allUsersFailure',
        payload: error.response.data.message,
      });
    }
  };

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LogoutUserRequest',
    });

    await axios.get('/api/v1/logout');

    dispatch({
      type: 'LogoutUserSuccess',
    });
  } catch (error) {
    dispatch({
      type: 'LogoutUserFailure',
      payload: error.response.data.message,
    });
  }
};

export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: 'RegisterRequest',
      });

      const { data } = await axios.post(
        '/api/v1/register',
        { name, email, password, avatar },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch({
        type: 'RegisterSuccess',
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: 'RegisterFailure',
        payload: error.response.data.message,
      });
    }
  };

export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: 'updateProfileRequest',
    });

    const { data } = await axios.put(
      '/api/v1/update/profile',
      { name, email, avatar },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: 'updateProfileSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'updateProfileFailure',
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: 'updatePasswordRequest',
      });

      const { data } = await axios.put(
        '/api/v1/update/password',
        { oldPassword, newPassword },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch({
        type: 'updatePasswordSuccess',
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: 'updatePasswordFailure',
        payload: error.response.data.message,
      });
    }
  };

export const deleteMyProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteProfileRequest',
    });

    const { data } = await axios.delete(`/api/v1/delete/${id}`);

    dispatch({
      type: 'deleteProfileSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'deleteProfileFailure',
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: 'forgotPasswordRequest',
    });

    const { data } = await axios.post(
      '/api/v1/forgot/password',
      {
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: 'forgotPasswordSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'forgotPasswordFailure',
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'resetPasswordRequest',
    });

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      {
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: 'resetPasswordSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'resetPasswordFailure',
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'userPostsRequest',
    });

    const { data } = await axios.get(`/api/v1/userposts/${id}`);
    dispatch({
      type: 'userPostsSuccess',
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: 'userPostsFailure',
      payload: error.response.data.message,
    });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'userProfileRequest',
    });

    const { data } = await axios.get(`/api/v1/user/${id}`);
    dispatch({
      type: 'userProfileSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'userProfileFailure',
      payload: error.response.data.message,
    });
  }
};

export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'followUserRequest',
    });

    const { data } = await axios.get(`/api/v1/follow/${id}`);
    dispatch({
      type: 'followUserSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'followUserFailure',
      payload: error.response.data.message,
    });
  }
};

export const guestLogin = () => async(dispatch) => {

  dispatch({
    type: "GUEST_LOGIN",
  });
};


// actions/User.js

export const loginUserAsTrader = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'loginTraderRequest' });

    // Replace with your API endpoint for trader login
    const { data } = await axios.post('/api/v1/trader/login', {
      email,
      password,
    });

    dispatch({
      type: 'loginTraderSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'loginTraderFailure',
      payload: error.response.data.message,
    });
  }
};

// News actions

export const updateSearchTerm = (searchTerm) => async (dispatch) => {

  dispatch({
  type: "updateSearchTerm",
  payload: searchTerm,
  });
};

export const setSearchResults = (searchResults) => async(dispatch) => {

  console.log("in setsearchresults pre", searchResults);

  dispatch({
  type: "setSearchResult",
  payload: searchResults,
  });

  console.log("in setsearchresults post");
};

export const selectArticle = (article) => async(dispatch) => {

  dispatch({
  type: "selectArticle",
  payload: article,
  });
};

export const fetchSearchResults = (searchTerm) => async(dispatch) => {

  try {

    // console.log("NEWS api key is ",process.env.NEWS_API_KEY)
    // console.log("NEWS api key is ",process.env.)
    // console.log("search term is ",searchTerm)


  const {data} = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);

  console.log("Data from api is ",data);

  await dispatch(setSearchResults(data.articles));


  }
  catch(error)
  {
    dispatch({
      type: "newsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: 'allPostsRequest',
    });

    const { data } = await axios.get('/api/v1/allPosts');
    dispatch({
      type: 'allPostsSuccess',
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: 'allPostsFailure',
      payload: error.response.data.message,
    });
  }
};
