import React from "react";
import { Route } from "react-router-dom";
import FrontendLayout from "./layouts/frontend/FrontendLayout";

export default function FrontendPublicRoute({ ...rest }) {
  return <Route {...rest} render={(props) => <FrontendLayout {...props} />} />;
}
