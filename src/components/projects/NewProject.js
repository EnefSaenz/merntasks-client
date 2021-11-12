import React, { Fragment, useContext, useState } from "react";
import projectContext from "../../contexts/projects/projectContext";
import Error from "../layout/Error";

const NewProject = () => {
  // States
  const [project, setProject] = useState({
    nombre: "",
  });
  const [error, setError] = useState(false);

  // Context
  const projectsContext = useContext(projectContext);
  const { newProject, showNewProjectForm, addProject } = projectsContext;

  const { nombre } = project;

  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // To validate projectName
    if (nombre === "") {
      setError(true);
      return;
    }

    // Not to show errors
    setError(false);

    // Add to state
    addProject(project);

    // Reset form
    setProject({
      nombre: "",
    });
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primary"
        onClick={showNewProjectForm}
      >
        New Project
      </button>

      {newProject ? (
        <form className="form-new-project" onSubmit={onSubmit}>
          <input
            type="text"
            className="input-text"
            placeholder="Project name"
            name="nombre"
            value={nombre}
            onChange={onChange}
          />

          <input
            type="submit"
            className="btn btn-primary btn-block"
            value="Add project"
          />
        </form>
      ) : null}

      {error ? <Error message="Type a valid name for your project!" /> : null}
    </Fragment>
  );
};

export default NewProject;
