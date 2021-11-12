import {
  ADD_TASKS,
  DELETE_TASKS,
  GET_TASKS,
  TASK_STATUS,
  ACTUAL_TASK,
  UPDATE_TASK,
  TASK_ERROR,
} from "../../types";

const tasksReducer = (state, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ADD_TASKS:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case DELETE_TASKS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case TASK_STATUS:
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        selectedTask: null,
      };
    case ACTUAL_TASK:
      return {
        ...state,
        selectedTask: action.payload,
      };
    case TASK_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      break;
  }
};

export default tasksReducer;
