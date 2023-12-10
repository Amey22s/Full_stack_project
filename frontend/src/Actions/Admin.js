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
  
  