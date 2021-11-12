import React, { useReducer } from "react";
import {
  ADD_TASKS,
  DELETE_TASKS,
  GET_TASKS,
  TASK_STATUS,
  ACTUAL_TASK,
  UPDATE_TASK,
  TASK_ERROR,
} from "../../types";
import tasksContext from "./tasksContext";
import tasksReducer from "./tasksReducer";
import axiosClient from "../../config/axios";

const TasksProvider = (props) => {
  const initialState = {
    tasks: [],
    selectedTask: null,
  };

  // Dispatcher
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  // Functions
  const getTasks = async (idProject) => {
    try {
      const response = await axiosClient.get("/api/tareas", {
        params: {
          proyecto: idProject,
        },
      });

      dispatch({
        type: GET_TASKS,
        payload: response.data.tareas,
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
        type: TASK_ERROR,
        payload: alert,
      });
    }
  };

  const addTasks = async (task) => {
    try {
      const response = await axiosClient.post("/api/tareas", task);

      dispatch({
        type: ADD_TASKS,
        payload: response.data.tarea,
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
        type: TASK_ERROR,
        payload: alert,
      });
    }
  };

  const deleteTasks = async (idTask) => {
    try {
      await axiosClient.delete(`/api/tareas/${idTask}`);

      dispatch({
        type: DELETE_TASKS,
        payload: idTask,
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
        type: TASK_ERROR,
        payload: alert,
      });
    }
  };

  const changeStatus = async (task) => {
    try {
      const response = await axiosClient.put(`/api/tareas/${task._id}`, task);

      dispatch({
        type: TASK_STATUS,
        payload: response.data.tarea,
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
        type: TASK_ERROR,
        payload: alert,
      });
    }
  };

  const saveActualTask = (task) => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task,
    });
  };

  const updateTask = async (task) => {
    try {
      const response = await axiosClient.put(`/api/tareas/${task._id}`, task);

      dispatch({
        type: UPDATE_TASK,
        payload: response.data.tarea,
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
        type: TASK_ERROR,
        payload: alert,
      });
    }
  };

  return (
    <tasksContext.Provider
      value={{
        tasks: state.tasks,
        selectedTask: state.selectedTask,
        getTasks,
        addTasks,
        deleteTasks,
        changeStatus,
        saveActualTask,
        updateTask,
      }}
    >
      {props.children}
    </tasksContext.Provider>
  );
};

export default TasksProvider;
