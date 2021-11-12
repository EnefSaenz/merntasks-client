import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../contexts/alerts/alertContext";
import AuthContext from "../../contexts/authentication/authContext";

const NewAccount = (props) => {
  // Alert Context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  // Auth Context
  const authContext = useContext(AuthContext);
  const { registerUser, authenticated, message } = authContext;

  // If user is authenticated, registered or duplicated
  useEffect(() => {
    if (authenticated) {
      props.history.push("/projects");
    }

    if (message) {
      showAlert(message.msg, message.cat);
    }

    // eslint-disable-next-line
  }, [message, authenticated, props.history]);

  // States
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const { name, email, password, confirm } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // To validate empty fields
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirm.trim() === ""
    ) {
      showAlert("All fields are required!", "alert-error");
      return;
    }

    // To validate min length pwd
    if (password.length < 8) {
      showAlert("Password's min length is 8 characters", "alert-error");
      return;
    }

    // To validate both pwd are the same
    if (password !== confirm) {
      showAlert("Both passwords must be the same", "alert-error");
      return;
    }

    // Pass to action
    registerUser({ nombre: name, email, password });
  };

  return (
    <div className="form-user">
      {alert ? <div className={`alert ${alert.cat}`}>{alert.msg}</div> : null}
      <div className="container-form shadow-dark">
        <h1>New Account</h1>

        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={onChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="confirm">Confirm password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Your password again"
              value={confirm}
              onChange={onChange}
            />
          </div>

          <div className="form-field">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Sign up"
            />
          </div>
        </form>

        <Link to={"/"} className="account-link">
          Back to the login page
        </Link>
      </div>
    </div>
  );
};

export default NewAccount;
