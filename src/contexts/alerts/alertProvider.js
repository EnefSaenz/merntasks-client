import { useReducer } from "react";
import alertContext from "./alertContext";
import alertReducer from "./alertReducer";

import { SHOW_ALERT, HIDE_ALERT } from "../../types";

const AlertProvider = (props) => {
  const initialState = { alert: null };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const showAlert = (msg, cat) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        msg,
        cat,
      },
    });

    // After 5 seconds, it cleans the alert
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 5000);
  };

  return (
    <alertContext.Provider
      value={{
        alert: state.alert,
        showAlert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertProvider;
