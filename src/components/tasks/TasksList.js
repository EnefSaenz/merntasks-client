import React, { Fragment, useContext } from "react";
import projectContext from "../../contexts/projects/projectContext";
import tasksContext from "../../contexts/tasks/tasksContext";
import Task from "./Task";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TasksList = () => {
  // Contexts
  const projectsContext = useContext(projectContext);
  const { project, deleteProject } = projectsContext;

  const taskContext = useContext(tasksContext);
  const { tasks } = taskContext;

  // If there aren't projects
  if (!project) return <h2 data-cy="tasks-toSelect">Select a project</h2>;

  // Array destructuring
  const [actualProject] = project;

  // For deleting
  const onClickDelete = () => {
    deleteProject(actualProject._id);
  };

  return (
    <Fragment>
      <h2>Project: {actualProject.nombre}</h2>

      <ul className="list-tasks">
        {tasks.length === 0 ? (
          <li className="task">
            <p>There aren't tasks</p>
          </li>
        ) : (
          <TransitionGroup>
            {tasks.map((task) => (
              <CSSTransition key={task._id} timeout={200} classNames="task">
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button type="button" className="btn btn-delete" onClick={onClickDelete}>
        Delete project
      </button>
    </Fragment>
  );
};

export default TasksList;
