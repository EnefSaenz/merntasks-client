import React, { useContext, useEffect } from "react";
import projectContext from "../../contexts/projects/projectContext";
import Project from "./Project";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AlertContext from "../../contexts/alerts/alertContext";

const ProjectsList = () => {
  // Alert Context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  // Project Context
  const projectsContext = useContext(projectContext);
  const { projects, getProjects, message } = projectsContext;

  useEffect(() => {
    if (message) {
      showAlert(message.msg, message.cat);
    }

    getProjects();

    // eslint-disable-next-line
  }, [message]);

  if (projects.length === 0)
    return <p>There aren't projects, start creating a new one!</p>;

  return (
    <ul className="list-projects">
      {alert ? <div className={`alert ${alert.cat}`}>{alert.msg}</div> : null}
      <TransitionGroup>
        {projects.map((project) => (
          <CSSTransition key={project._id} timeout={200} classNames={project}>
            <Project project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ProjectsList;
