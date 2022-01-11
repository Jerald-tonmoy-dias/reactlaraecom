import axios from "axios";
import swal from "sweetalert";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../../Base_url";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [checkoutInput, setCheckoutInput] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    payment_mode: "",
    payment_id: "",
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

  const handleSubmit = (e, payment_mode) => {
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
      payment_mode: payment_mode,
      payment_id: "",
    };

    switch (payment_mode) {
      case "cod":
        axios.post(`api/place-order`, data).then((res) => {
          if (res.data.status === 200) {
            swal({
              title: "Order placed successfully",
              text: res.data.message,
              icon: "success",
            });
            setError([]);
            history.push("/thankyou");
          } else if (res.data.status === 422) {
            swal({
              title: "all fields are required",
              text: res.data.message,
              icon: "error",
            });

            setError(res.data.error);
          }
        });
        break;
      case "razorpay":
        axios.post(`api/validate-order`, data).then((res) => {
          if (res.data.status === 200) {
            setError([]);
            var options = {
              key: "rzp_test_prkdcE3hvF5U4T",
              // amount: totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              amount: 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              name: "Reac ecom company",
              description: "Test Transaction",
              image: "https://example.com/your_logo",
              handler: function (response) {
                console.log(response.razorpay_payment_id);

                data.payment_id = response.razorpay_payment_id;
                axios.post(`api/place-order`, data).then((res) => {
                  if (res.data.status === 200) {
                    swal({
                      title: "Order placed successfully",
                      text: res.data.message,
                      icon: "success",
                    });
                    setError([]);
                    history.push("/thankyou");
                  }
                });
              },
              prefill: {
                name: data.firstname + data.lastname,
                email: data.email,
                contact: data.phone,
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#3399cc",
              },
            };
            var rzp = new window.Razorpay(options);
            rzp.open();
          } else if (res.data.status === 422) {
            swal({
              title: "all fields are required",
              text: res.data.message,
              icon: "error",
            });

            setError(res.data.error);
          }
        });
        break;
    }
  };

  let checkout_HTML = "";
  if (loading) {
    return (
      <div className="col-lg-12 mb-4">
        <div className="card">
          <div className="card-body">
            <h4>Cart details loading...</h4>
          </div>
        </div>
      </div>
    );
  } else {
    if (cart.length > 0) {
      checkout_HTML = (
        <>
          {/* modal */}
          <div
            class="modal fade"
            id="exampleModalToggle"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel"
            tabindex="-1"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "AWOafqislzl8zx6-w5BwIOu9p-7DXKNt3Ly4hGzXYNRYBKJkY_yrUcAYSc5RP6YFz_ckikuYoDoBs9NK",
                    }}
                  >
                    <PayPalButtons
                      // for getting the state value
                      forceReRender={[checkoutInput]}
                      // createOrder
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: "1", // Can reference variables or functions. Example: `value: document.getElementById('...').value`
                              },
                            },
                          ],
                        });
                      }}
                      // Finalize the transaction after payer approval
                      onApprove={(data, actions) => {
                        return actions.order
                          .capture()
                          .then(function (orderData) {
                            const paypal_data = {
                              firstname: checkoutInput.firstname,
                              lastname: checkoutInput.lastname,
                              phone: checkoutInput.phone,
                              email: checkoutInput.email,
                              address: checkoutInput.address,
                              city: checkoutInput.city,
                              state: checkoutInput.state,
                              zipcode: checkoutInput.zipcode,
                              payment_mode: "paypal",
                              payment_id: "",
                            };
                            let transaction =
                              orderData.purchase_units[0].payments.captures[0]
                                .id;
                            paypal_data.payment_id = transaction;
                            // console.log("this from latest value", paypal_data);
                            axios
                              .post(`api/place-order`, paypal_data)
                              .then((res) => {
                                if (res.data.status === 200) {
                                  swal({
                                    title: "Order placed successfully",
                                    text: res.data.message,
                                    icon: "success",
                                  });
                                  setError([]);
                                  history.push("/thankyou");
                                } else if (res.data.status === 422) {
                                  swal({
                                    title: "all fields are required",
                                    text: res.data.message,
                                    icon: "error",
                                  });

                                  setError(res.data.error);
                                }
                              });
                          });
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          </div>

          {/* basic information */}
          <div className="row py-4">
            <div className="col-lg-7">
              <div className="card">
                <div className="card-header">
                  <h4>Basic Information</h4>
                </div>
                <form>
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
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={(e) => handleSubmit(e, "cod")}
                        >
                          Place order
                        </button>
                        <button
                          className="btn btn-primary ms-4"
                          type="button"
                          onClick={(e) => handleSubmit(e, "razorpay")}
                        >
                          razorpay
                        </button>
                        <button
                          className="btn btn-primary ms-4"
                          type="button"
                          data-bs-toggle="modal"
                          href="#exampleModalToggle"
                          onClick={(e) => e.preventDefault()}
                        >
                          paypal
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
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
        </>
      );
    } else {
      checkout_HTML = (
        <div className="card-body text-center">
          <h2>Your Checkout Is Empty</h2>
        </div>
      );
    }
  }
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
      {checkout_HTML}
    </div>
  );
}
