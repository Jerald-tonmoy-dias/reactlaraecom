import axios from "axios";
import swal from "sweetalert";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../../Base_url";
export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const history = useHistory;
  let totalPrice = 0;
  if (!localStorage.getItem("auth_token")) {
    swal({
      title: "Error",
      text: "Please log in first",
      icon: "error",
    });
    history.push("/");
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios.get(`api/cart-data`).then((res) => {
        if (res.data.status == 200) {
          setCart(res.data.cart);
          setLoading(false);
        } else if (res.data.status == 401) {
          swal({
            title: "Error",
            text: res.data.message,
            icon: "error",
          });
          history.push("/");
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [history]);

  return (
    <div className="container">
      {/* breadcrumb */}
      <nav aria-label="breadcrumb" className="bg-warning py-3 px-4">
        <ol className="breadcrumb">
          <li
            className="breadcrumb-item active text-white display-5"
            aria-current="page"
            key="1"
          >
            Collection /Checkout
          </li>
        </ol>
      </nav>

      {/* main content */}
      <div className="row py-4">
        <div className="col-lg-7">
          <div className="card">
            <div className="card-header">
              <h4>Basic Information</h4>
            </div>
            <div className="row card-body">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstname"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label>Last Name</label>
                  <input type="text" className="form-control" name="lastname" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label>Phone Number</label>
                  <input type="text" className="form-control" name="phone" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label>Email Address</label>
                  <input type="text" className="form-control" name="email" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label>Full Address</label>
                  <textarea
                    row={3}
                    className="form-control"
                    name="email"
                  ></textarea>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label>City</label>
                  <input className="form-control" name="city" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label>State</label>
                  <input className="form-control" name="state" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label>Zip code</label>
                  <input className="form-control" name="zipcode" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <button className="btn btn-primary">Place order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                totalPrice +=
                  parseInt(item.product.selling_price) *
                  parseInt(item.product_qty);

                return (
                  <tr>
                    <th>{item.product.name}</th>
                    <th>{item.product.selling_price}</th>
                    <th>{item.product_qty}</th>
                    <th>
                      {parseInt(item.product.selling_price) *
                        parseInt(item.product_qty)}
                    </th>
                  </tr>
                );
              })}
              <tr>
                <th className="text-end fw-bold text-uppercase" colSpan={2}>
                  Total
                </th>
                <th className="text-end fw-bold text-uppercase" colSpan={2}>
                  {totalPrice}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
