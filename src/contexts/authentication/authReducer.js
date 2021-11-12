import {
  SUCCESSFUL_REG,
  ERROR_REG,
  GET_USER,
  SUCCESSFUL_LOG,
  ERROR_LOG,
  SIGN_OUT,
} from "../../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case SUCCESSFUL_LOG:
    case SUCCESSFUL_REG:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loading: false,
        authenticated: true,
        message: null,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
        loading: false,
      };
    case SIGN_OUT:
    case ERROR_LOG:
    case ERROR_REG:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        token: null,
        user: null,
        authenticated: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
