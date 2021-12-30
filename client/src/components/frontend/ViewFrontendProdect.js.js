import axios from "axios";
import swal from "sweetalert";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../../Base_url";
export default function ViewFrontendProduct(props) {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const productCount = product.length;
  const history = useHistory;
  useEffect(() => {
    let isMounted = true;
    let product_slug = props.match.params.slug;
    if (isMounted) {
      axios
        .get(`api/get-frontend-products-data/${product_slug}`)
        .then((res) => {
          if (res.data.status == 200) {
            setProduct(res.data.product_data.product);
            setCategory(res.data.product_data.category);
            setLoading(false);
          } else if (res.data.status == 400) {
            swal({
              title: "error",
              text: res.data.message,
              icon: "warning",
            });
          } else {
            swal({
              title: "Error",
              text: res.data.message,
              icon: "error",
            });
            history.push("/collection");
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [history, props.match.params.slug]);

  let viewproductList = "";
  if (loading) {
    return (viewproductList = (
      <div className="col-lg-4 mb-4">
        <div className="card">
          <div className="card-body">
            <h4>category loading...</h4>
          </div>
        </div>
      </div>
    ));
  } else {
    if (productCount > 0) {
      viewproductList = product.map((item, index) => {
        return (
          <div className="col-lg-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                  <img src={`${BASE_URL}${item.image}`} className="w-100" />
                </Link>
                <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                  <h4>{item.name}</h4>
                </Link>
              </div>
            </div>
          </div>
        );
      });
    } else {
      viewproductList = (
        <div className="col-lg-12 mb-4">
          <div className="card text-center p-5">
            <h4>No product Found</h4>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div className="container mt-5">
        <nav aria-label="breadcrumb" className="bg-warning py-3 px-4">
          <ol className="breadcrumb">
            <li
              className="breadcrumb-item active text-white display-5"
              aria-current="page"
            >
              Collection /{category.name}
            </li>
          </ol>
        </nav>

        <div className="row mt-4 justify-content-center">{viewproductList}</div>
      </div>
    </>
  );
}
