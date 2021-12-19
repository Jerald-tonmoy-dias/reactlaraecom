import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "../../components/admin/Dashboard";
import "../../assets/admin/css/styles.css";
import "../../assets/admin/js/scripts.js";
import routesFile from "../../routes/routesFile";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

export default function MastarLayout() {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <Switch>
              {routesFile.map((item, idx) => {
                return (
                  item.component && (
                    <Route
                      key={idx}
                      path={item.path}
                      exact={item.exact}
                      name={item.name}
                      render={(props) => <item.component {...props} />}
                    />
                  )
                );
              })}
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
