import React from "react";
import Navbar from "./Navbar";
import publicRouteFile from "../../routes/publicRouteFile";
import { Route, Switch } from "react-router-dom";
export default function FrontendLayout() {
  return (
    <div>
      <Navbar />
      <div>
        <Switch>
          {publicRouteFile.map((item, idx) => {
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
        </Switch>
      </div>
    </div>
  );
}
