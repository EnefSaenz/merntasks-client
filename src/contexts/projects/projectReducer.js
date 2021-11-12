import {
  ACTUAL_PROJECT,
  ADD_PROJECT,
  DELETE_PROJECT,
  FORM_PROJECT,
  GET_PROJECTS,
  PROJECT_ERROR,
} from "../../types";

const projectReducer = (state, action) => {
  switch (action.type) {
    case FORM_PROJECT:
      return {
        ...state,
        newProject: true,
        message: null,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        message: null,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        newProject: false,
        message: null,
      };
    case ACTUAL_PROJECT:
      return {
        ...state,
        project: state.projects.filter(
          (project) => project._id === action.payload
        ),
        message: null,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
        project: null,
        message: null,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default projectReducer;
