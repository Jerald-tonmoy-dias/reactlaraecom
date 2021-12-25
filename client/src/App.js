import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Home from "./components/frontend/Home";
import Register from "./components/frontend/auth/Register";
import Login from "./components/frontend/auth/Login";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Error404 from "./error/404";
import Error403 from "./error/403";
function App() {
  // default settings
  axios.defaults.baseURL = "http://127.0.0.1:8000/";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Accept"] = "application/json";
  axios.defaults.withCredentials = true;

  // for authinticate user
  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("auth_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* private route */}
          <AdminPrivateRoute path="/admin" name="Admin" />
          {/* for apps route */}
          <Route path={"/"} exact component={Home} />
          <Route path={"/404"} component={Error404} />
          <Route path={"/403"} component={Error403} />
          <Route path="/login">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <Login />
            )}
          </Route>

          <Route path="/register">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <Register />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
