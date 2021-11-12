import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import axiosClient from "../../config/axios";
import tokenAuth from "../../config/token";

import {
  SUCCESSFUL_REG,
  ERROR_REG,
  GET_USER,
  SUCCESSFUL_LOG,
  ERROR_LOG,
  SIGN_OUT,
} from "../../types";

const AuthProvider = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: false,
    loading: true,
    user: null,
    message: null,
  };

  // Dispatch for excecuting actions
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Registering user
  const registerUser = async (data) => {
    try {
      const response = await axiosClient.post("/api/usuarios", data);

      dispatch({
        type: SUCCESSFUL_REG,
        payload: response.data,
      });

      // Get user
      userAuthenticated();
    } catch (error) {
      // console.log(error.response.data.msg);
      const alert = { msg: error.response.data.msg, cat: "alert-error" };
      dispatch({
        type: ERROR_REG,
        payload: alert,
      });
    }
  };

  // Getting user
  const userAuthenticated = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const response = await axiosClient.get("/api/auth");
      // console.log(response);
      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_LOG,
      });
    }
  };

  // Logging in user
  const login = async (data) => {
    try {
      const response = await axiosClient.post("/api/auth", data);
      dispatch({
        type: SUCCESSFUL_LOG,
        payload: response.data,
      });

      // Get user
      userAuthenticated();
    } catch (error) {
      // console.log(error.response.data.msg);
      let alert = {};
      if (error.response.data.msg) {
        alert = { msg: error.response.data.msg, cat: "alert-error" };
      } else {
        alert = {
          msg: error.response.data.errores[0].msg,
          cat: "alert-error",
        };
      }
      dispatch({
        type: ERROR_LOG,
        payload: alert,
      });
    }
  };

  // Logging out user
  const logout = () => {
    dispatch({
      type: SIGN_OUT,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        loading: state.loading,
        user: state.user,
        message: state.message,
        registerUser,
        userAuthenticated,
        login,
        logout,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
