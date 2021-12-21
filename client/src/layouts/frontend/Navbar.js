import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

export default function Navbar() {
  const history = useHistory();
  const logoutfunc = (e) => {
    e.preventDefault();

    axios.post(`api/logout`).then((res) => {
      if (res.data.status == 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal({
          title: "Good job!",
          text: res.data.message,
          icon: "success",
        });
        history.push("/");
      }
    });
  };

  let linkState = "";
  if (localStorage.getItem("auth_name")) {
    linkState = (
      <li className="nav-item">
        <button className="nav-link btn btn-danger" onClick={logoutfunc}>
          Logout
        </button>
      </li>
    );
  } else {
    linkState = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Jerald Tonmoy Dias
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Dashboard
              </Link>
            </li>
            {linkState}
          </ul>
        </div>
      </div>
    </nav>
  );
}
