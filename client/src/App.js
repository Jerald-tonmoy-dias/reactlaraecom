import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import MastarLayout from "./layouts/admin/MastarLayout";
import Home from "./components/frontend/Home";
import Register from "./components/frontend/auth/Register";
import Login from "./components/frontend/auth/Login";
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
          {/* for dashboard route */}
          <Route
            path="/admin"
            name="Admin"
            render={(props) => <MastarLayout {...props} />}
          />
          {/* for apps route */}
          <Route path={"/"} exact component={Home} />
          {/* <Route path={"/register"} exact component={Register} />
          <Route path={"/login"} exact component={Login} /> */}

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
