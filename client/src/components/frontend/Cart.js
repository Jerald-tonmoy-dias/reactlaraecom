import axios from "axios";
import swal from "sweetalert";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../../Base_url";
export default function Cart(props) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const history = useHistory;
  if (!localStorage.getItem("auth_token")) {
    swal({
      title: "Error",
      text: "Please log in first",
      icon: "error",
    });
    history.push("/");
  }
  //   handle increment decrement option
  const handleDecreament = (cart_idd) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_idd === item.id
          ? {
              ...item,
              product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    updatecartQuantity(cart_idd, "dec");
  };

  const handleIncreament = (cart_idd) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_idd === item.id
          ? { ...item, product_qty: item.product_qty + 1 }
          : item
      )
    );
    updatecartQuantity(cart_idd, "inc");
  };

  const updatecartQuantity = (cart_idd, scope) => {
    axios.put(`api/updatecart-qty/${cart_idd}/${scope}`).then((res) => {
      if (res.data.status == 201) {
        return "okk";
      }
    });
  };

  const handledeleteCart = (e, cart_idd) => {
    e.preventDefault();
    let thisClicked = e.currentTarget;
    thisClicked.innerText = "removing";
    axios.delete(`api/delete-cart-item/${cart_idd}`).then((res) => {
      if (res.data.status == 200) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
        });
        thisClicked.closest("tr").remove();
      } else if (res.data.status == 404) {
        swal({
          title: "Warning",
          text: res.data.message,
          icon: "warning",
        });
        thisClicked.innerText = "remove";
      }
    });
  };

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

  let cart_HTML = "";
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
      cart_HTML = (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>
                      <img
                        src={`${BASE_URL}${item.product.image}`}
                        width={50}
                        height={50}
                      />
                    </td>
                    <td>{item.product.name}</td>
                    <td>{item.product.selling_price}</td>
                    <td>
                      <div className="input-group d-flex">
                        <button
                          type="button"
                          className="input-group-text"
                          onClick={() => handleDecreament(item.id)}
                        >
                          -
                        </button>
                        <span type="text" className="form-control text-center">
                          {item.product_qty}
                        </span>
                        <button
                          type="button"
                          className="input-group-text"
                          onClick={() => handleIncreament(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      {parseInt(item.product.selling_price) *
                        parseInt(item.product_qty)}
                    </td>
                    <td>
                      <button
                        onClick={(e) => handledeleteCart(e, item.id)}
                        className="btn-sm btn-danger"
                        type="button"
                      >
                        remove
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      cart_HTML = (
        <div className="card-body text-center">
          <h2>Your Cart Is Empty</h2>
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
              key="1"
            >
              Collection /Cart
            </li>
          </ol>
        </nav>

        <div className="card mt-4">{cart_HTML}</div>
      </div>
    </>
  );
}
