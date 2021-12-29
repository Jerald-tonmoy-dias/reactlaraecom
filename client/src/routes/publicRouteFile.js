import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import Collection from "../components/frontend/Collection";

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
];

export default publicRouteFile;
