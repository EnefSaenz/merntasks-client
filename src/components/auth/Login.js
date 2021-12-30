import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../contexts/alerts/alertContext";
import AuthContext from "../../contexts/authentication/authContext";

const Login = (props) => {
  // Alert Context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  // Auth Context
  const authContext = useContext(AuthContext);
  const { login, authenticated, message } = authContext;

  // If user or password doesn't exist
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
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      showAlert("All fields are required!", "alert-error");
      return;
    }

    // Pass to action
    setLoading(true);
    await login({ email, password });
    setLoading(false);
  };

  return (
    <div className="form-user">
      {alert ? <div className={`alert ${alert.cat}`}>{alert.msg}</div> : null}
      <div className="container-form shadow-dark">
        <h1 data-cy="login-title">Login</h1>

        <form data-cy="login-form" onSubmit={onSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              data-cy="login-form-email"
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
              data-cy="login-form-password"
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              value={password}
              onChange={onChange}
            />
          </div>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div className="form-field">
              <input
                data-cy="login-form-submit"
                type="submit"
                className="btn btn-primary btn-block"
                value="Login"
              />
            </div>
          )}
        </form>

        <Link
          data-cy="login-signup"
          to={"/new-account"}
          className="account-link"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
