import React, { useContext, useState, useEffect } from "react";
import projectContext from "../../contexts/projects/projectContext";
import tasksContext from "../../contexts/tasks/tasksContext";
import Error from "../layout/Error";

const TaskForm = () => {
  // States
  const [task, setTask] = useState({
    nombre: "",
  });
  const [error, setError] = useState(false);

  // Contexts
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  const taskContext = useContext(tasksContext);
  const { addTasks, selectedTask, updateTask } = taskContext;

  // Detecting if there is a selected task
  useEffect(() => {
    if (selectedTask !== null) {
      setTask(selectedTask);
    } else {
      setTask({ nombre: "" });
    }
  }, [selectedTask]);

  // If there aren't projects
  if (!project) return null;

  // Array destructuring
  const [actualProject] = project;

  const { nombre } = task;

  const onChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // To validate form
    if (nombre === "") {
      setError(true);
      return;
    }

    // Not to show errors
    setError(false);

    // Check if edit or add
    if (selectedTask === null) {
      // Add new tasks
      task.proyecto = actualProject._id;
      task.estado = false;
      addTasks(task);
    } else {
      updateTask(task);
    }

    // Reset form
    setTask({
      nombre: "",
    });
  };

  return (
    <div className="form-task">
      <form onSubmit={onSubmit}>
        <div className="container-input">
          <input
            type="text"
            className="input-text"
            placeholder="Task name..."
            name="nombre"
            value={nombre}
            onChange={onChange}
          />
        </div>

        <div className="container-input">
          <input
            type="submit"
            className="btn btn-primary btn-submit btn-block"
            value={selectedTask ? "Edit task" : "Add task"}
          />
        </div>
      </form>
      {error ? <Error message="Type a valid task!" /> : null}
    </div>
  );
};

export default TaskForm;
