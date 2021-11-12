import React, { useContext } from "react";
import tasksContext from "../../contexts/tasks/tasksContext";

const Task = ({ task }) => {
  // Contexts
  const taskContext = useContext(tasksContext);
  const { deleteTasks, changeStatus, saveActualTask } = taskContext;

  // For deleting
  const onClickDelete = (idTask) => {
    deleteTasks(idTask);
  };

  // For changing Task status
  const onChangeStatus = () => {
    task.estado = !task.estado;
    changeStatus(task);
  };

  //For editing
  const onClickEdit = () => {
    saveActualTask(task);
  };

  return (
    <li className="task shadow">
      <p>{task.nombre}</p>

      <div className="state">
        {task.estado ? (
          <button type="button" className="completed" onClick={onChangeStatus}>
            Completed
          </button>
        ) : (
          <button
            type="button"
            className="incompleted"
            onClick={onChangeStatus}
          >
            Incompleted
          </button>
        )}
      </div>

      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={onClickEdit}>
          Edit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            onClickDelete(task._id);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Task;
