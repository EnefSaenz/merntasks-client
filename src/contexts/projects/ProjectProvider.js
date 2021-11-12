import React, { useReducer } from "react";
import {
  ACTUAL_PROJECT,
  ADD_PROJECT,
  DELETE_PROJECT,
  FORM_PROJECT,
  GET_PROJECTS,
  PROJECT_ERROR,
} from "../../types";
import projectContext from "./projectContext";
import projectReducer from "./projectReducer";
import axiosClient from "../../config/axios";

const ProjectProvider = (props) => {
  const initialState = {
    projects: [],
    newProject: false,
    project: null,
    message: null,
  };

  // Dispatch for excecuting actions
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Functions for CRUD
  const showNewProjectForm = () => {
    dispatch({
      type: FORM_PROJECT,
    });
  };

  const getProjects = async () => {
    try {
      const response = await axiosClient.get("/api/proyectos");
      dispatch({
        type: GET_PROJECTS,
        payload: response.data.proyectos,
      });
    } catch (error) {
      const alert = { msg: error.response.data.msg, cat: "alert-error" };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  const addProject = async (project) => {
    try {
      const response = await axiosClient.post("/api/proyectos", project);

      dispatch({
        type: ADD_PROJECT,
        payload: response.data.proyecto,
      });
    } catch (error) {
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
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  const selectProject = (projectId) => {
    dispatch({
      type: ACTUAL_PROJECT,
      payload: projectId,
    });
  };

  const deleteProject = async (projectId) => {
    try {
      await axiosClient.delete(`/api/proyectos/${projectId}`);

      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    } catch (error) {
      const alert = { msg: error.response.data.msg, cat: "alert-error" };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        newProject: state.newProject,
        project: state.project,
        message: state.message,
        showNewProjectForm,
        getProjects,
        addProject,
        selectProject,
        deleteProject,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectProvider;
