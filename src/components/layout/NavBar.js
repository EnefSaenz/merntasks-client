import React, { useContext, useEffect } from "react";
import AuthContext from "../../contexts/authentication/authContext";

const NavBar = () => {
  // For getting user
  const authContext = useContext(AuthContext);
  const { user, logout, userAuthenticated } = authContext;

  useEffect(() => {
    userAuthenticated();
    // eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {user ? (
        <p className="username">
          Hi <span>{user.nombre}!</span>
        </p>
      ) : null}

      <nav className="nav-main">
        <button
          data-cy="navbar-signout"
          className="btn btn-blank sign-out"
          onClick={() => {
            logout();
          }}
        >
          Sign out
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
