import React, { useContext } from "react";
import projectContext from "../../contexts/projects/projectContext";
import tasksContext from "../../contexts/tasks/tasksContext";

const Project = ({ project }) => {
  // Contexts
  const projectsContext = useContext(projectContext);
  const { selectProject } = projectsContext;

  const taskContext = useContext(tasksContext);
  const { getTasks } = taskContext;

  // On select project
  const onSelectProject = (idProject) => {
    selectProject(idProject);
    getTasks(idProject);
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => {
          onSelectProject(project._id);
        }}
      >
        {project.nombre}
      </button>
    </li>
  );
};

export default Project;
