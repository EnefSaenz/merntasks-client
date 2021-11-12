import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";
import Projects from "./components/projects/Projects";
import PrivateRoute from "./components/routes/PrivateRoute";
import ProjectProvider from "./contexts/projects/ProjectProvider";
import TasksProvider from "./contexts/tasks/TasksProvider";
import AlertProvider from "./contexts/alerts/alertProvider";
import AuthProvider from "./contexts/authentication/authProvider";
import tokenAuth from "./config/token";

// For validating if there is a token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProjectProvider>
      <TasksProvider>
        <AlertProvider>
          <AuthProvider>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/new-account" component={NewAccount} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthProvider>
        </AlertProvider>
      </TasksProvider>
    </ProjectProvider>
  );
}

export default App;
