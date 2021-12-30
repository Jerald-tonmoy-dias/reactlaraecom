import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import Collection from "../components/frontend/Collection";
import ViewFrontendProduct from "../components/frontend/ViewFrontendProdect.js";

const publicRouteFile = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/about", exact: true, name: "About", component: About },
  { path: "/contact", exact: true, name: "Contact", component: Contact },
  {
    path: "/collection",
    exact: true,
    name: "Collection",
    component: Collection,
  },
  {
    path: "/collection/:slug",
    exact: true,
    name: "ViewFrontendProduct",
    component: ViewFrontendProduct,
  },
];

export default publicRouteFile;
