import axios from "axios";

export const adminLogin = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "AdminLoginRequest",
      });
  
      const { data } = await axios.post(
        "/api/v1/loginAdmin",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "AdminLoginSuccess",
        payload: data.admin,
      });
    } catch (error) {
      dispatch({
        type: "AdminLoginFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const registerAdmin = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: "AdminRegisterRequest" });
  
      const { data } = await axios.post(
        "/api/v1/registerAdmin",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({ type: "AdminRegisterSuccess", payload: data.admin });
    } catch (error) {
      dispatch({
        type: "AdminRegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const loadAdmin = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadAdminRequest",
      });
  
      const { data } = await axios.get("/api/v1/adminLoad");
  
      dispatch({
        type: "LoadAdminSuccess",
        payload: data.admin,
      });
    } catch (error) {
      dispatch({
        type: "LoadAdminFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const logoutAdmin = () => async (dispatch) => {
    try {
      dispatch({
        type: "LogoutAdminRequest",
      });
  
      await axios.get("/api/v1/logout");
  
      dispatch({
        type: "LogoutAdminSuccess",
      });
    } catch (error) {
      dispatch({
        type: "LogoutAdminFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const getAllUsersForAdmin = () => async (dispatch) => {
    try {
      dispatch({
        type: "allUsersForAdminRequest",
      });

      const { data } = await axios.get(`/api/v1/allUsersForAdmin`);
      dispatch({
        type: "allUsersForAdminSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "allUsersForAdminFailure",
        payload: error.response.data.message,
      });
    }
  };


  export const setUserProfile = (user) => async (dispatch) => {
      dispatch({
        type: "LoadUserSuccess",
        payload: user,
      }); 
  };

  export const deleteMyProfile = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteProfileRequest",
      });
  
      const { data } = await axios.delete(`/api/v1/deleteUser/${id}`);
  
      dispatch({
        type: "deleteProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteProfileFailure",
        payload: error.response.data.message,
      });
    }
  };
   
  