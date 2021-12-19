import { Component } from "react/cjs/react.production.min";
import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";

const routesFile = [
  { path: "/admin", exact: true, name: "Admin" },
  {
    path: "/admin/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/profile",
    exact: true,
    name: "Profile",
    component: Profile,
  },
];

export default routesFile;
