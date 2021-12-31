import axios from "axios";
import swal from "sweetalert";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../../Base_url";
export default function ProductDetails(props) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  //   handle increment decrement option
  const handleIncreament = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const handleDecreament = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };

  //   handle add to cart
  const handleAddTOCart = (e) => {
    e.preventDefault();
    const data = {
      product_id: product.id,
      product_qty: quantity,
    };

    axios.post("api/add-to-cart", data).then((res) => {
      if (res.data.status == 201) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
        });
      } else if (res.data.status == 409) {
        // already product added successfully
        swal({
          title: "success",
          text: res.data.message,
          icon: "success",
        });
      } else if (res.data.status == 401) {
        swal({
          title: "error",
          text: res.data.message,
          icon: "error",
        });
      } else if (res.data.status == 404) {
        swal({
          title: "Warning",
          text: res.data.message,
          icon: "warning",
        });
      }
      //   console.log("response from server", res);
    });
  };

  const history = useHistory;
  useEffect(() => {
    let isMounted = true;
    let product_slug = props.match.params.product;
    let category_slug = props.match.params.category;
    if (isMounted) {
      axios
        .get(`api/view-product/${category_slug}/${product_slug}`)
        .then((res) => {
          if (res.data.status == 200) {
            setProduct(res.data.product);
            setLoading(false);
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
  }, [history, props.match.params.product, props.match.params.category]);

  let availableStock = "";
  if (loading) {
    return (
      <div className="col-lg-12 mb-4">
        <div className="card">
          <div className="card-body">
            <h4>product details loading...</h4>
          </div>
        </div>
      </div>
    );
  } else {
    if (product.qty > 0) {
      availableStock = (
        <>
          <label className="btn-sm btn-success px-4 mt-2">In stock</label>

          <div className="row">
            <div className="col-md-3 mt-3">
              <div className="input-group d-flex">
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => handleDecreament()}
                >
                  -
                </button>
                <span type="text" className="form-control text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => handleIncreament()}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <button
                type="submit"
                onClick={handleAddTOCart}
                className="btn btn-primary w-100"
              >
                Add to cart
              </button>
            </div>
          </div>
        </>
      );
    } else {
      availableStock = (
        <>
          <label className="btn-sm btn-danger px-4 mt-2">Out of stock</label>
        </>
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
              Collection /{product.category.slug}/{product.slug}
            </li>
          </ol>
        </nav>

        <div className="row mt-5 justify-content-center">
          <div className="col-lg-4 border-end d-flex justify-content-center align-items-center">
            <img width={200} src={`${BASE_URL}${product.image}`} />
          </div>
          <div className="col-lg-8">
            <h4>
              {product.name}
              <span className="btn-sm btn-danger float-end">
                {" "}
                {product.brand}
              </span>
            </h4>
            <p> {product.des}</p>
            <h4 className="mb-3">
              BDT : {product.selling_price}
              <s className="ms-2"> BDT : {product.original_price}</s>
            </h4>

            <div>{availableStock}</div>
            <button type="button" className="btn btn-primary mt-4">
              Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
