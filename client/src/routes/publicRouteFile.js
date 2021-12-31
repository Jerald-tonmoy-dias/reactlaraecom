import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import Collection from "../components/frontend/Collection";
import ViewFrontendProduct from "../components/frontend/ViewFrontendProdect.js";
import ProductDetails from "../components/frontend/ProductDetails";
import Cart from "../components/frontend/Cart";

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
  {
    path: "/collection/:category/:product",
    exact: true,
    name: "ProductDetails",
    component: ProductDetails,
  },
  {
    path: "/cart",
    exact: true,
    name: "Cart",
    component: Cart,
  },
];

export default publicRouteFile;
