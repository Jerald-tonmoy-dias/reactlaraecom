import { Component } from "react/cjs/react.production.min";
import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import AddCategory from "../components/admin/category/AddCategory";
import EditCategory from "../components/admin/category/EditCategory";
import ViewCategory from "../components/admin/category/ViewCategory";
import AddProduct from "../components/admin/product/AddProduct";
import ViewProduct from "../components/admin/product/ViewProduct";
import EditProduct from "../components/admin/product/EditProduct";
import ThankYou from "../components/frontend/ThankYou";

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
  {
    path: "/admin/add-category",
    exact: true,
    name: "AddCategory",
    component: AddCategory,
  },
  {
    path: "/admin/view-category",
    exact: true,
    name: "ViewCategory",
    component: ViewCategory,
  },
  {
    path: "/admin/edit-category/:id",
    exact: true,
    name: "EditCategory",
    component: EditCategory,
  },
  {
    path: "/admin/add-product",
    exact: true,
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: "/admin/view-product",
    exact: true,
    name: "ViewProduct",
    component: ViewProduct,
  },
  {
    path: "/admin/edit-product/:id",
    exact: true,
    name: "EditProduct",
    component: EditProduct,
  },
  {
    path: "/thank-you",
    exact: true,
    name: "ThankYou",
    component: ThankYou,
  },
];

export default routesFile;
