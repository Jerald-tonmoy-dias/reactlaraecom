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
  const [checkoutInput, setCheckoutInput] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const [error, setError] = useState([]);
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

  const handleCheckInput = (e) => {
    setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstname: checkoutInput.firstname,
      lastname: checkoutInput.lastname,
      phone: checkoutInput.phone,
      email: checkoutInput.email,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state: checkoutInput.state,
      zipcode: checkoutInput.zipcode,
    };

    axios.post(`api/place-order`, data).then((res) => {
      if (res.data.status === 200) {
        swal({
          title: "Order placed successfully",
          text: res.data.message,
          icon: "success",
        });
        setError([]);
        history.push("/thank-you");
      } else if (res.data.status === 422) {
        swal({
          title: "all fields are required",
          text: res.data.message,
          icon: "error",
        });

        setError(res.data.error);
      }
    });
  };
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
                    onChange={handleCheckInput}
                    name="firstname"
                    value={checkoutInput.firstname}
                  />
                  <span className="text-danger">{error.firstname}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleCheckInput}
                    name="lastname"
                    value={checkoutInput.lastname}
                  />
                  <span className="text-danger">{error.lastname}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleCheckInput}
                    name="phone"
                    value={checkoutInput.phone}
                  />
                  <span className="text-danger">{error.phone}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label>Email Address</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleCheckInput}
                    name="email"
                    value={checkoutInput.email}
                  />
                  <span className="text-danger">{error.email}</span>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label>Full Address</label>
                  <textarea
                    row={3}
                    className="form-control"
                    onChange={handleCheckInput}
                    name="address"
                    value={checkoutInput.address}
                  ></textarea>
                  <span className="text-danger">{error.address}</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label>City</label>
                  <input
                    className="form-control"
                    onChange={handleCheckInput}
                    name="city"
                    value={checkoutInput.city}
                  />
                  <span className="text-danger">{error.city}</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label>State</label>
                  <input
                    className="form-control"
                    onChange={handleCheckInput}
                    name="state"
                    value={checkoutInput.state}
                  />
                  <span className="text-danger">{error.state}</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label>Zip code</label>
                  <input
                    className="form-control"
                    onChange={handleCheckInput}
                    name="zipcode"
                    value={checkoutInput.zipcode}
                  />
                  <span className="text-danger">{error.zipcode}</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Place order
                  </button>
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
