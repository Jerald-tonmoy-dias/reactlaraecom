import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
export default function Login() {
  const history = useHistory();
  const [loginput, setLoginput] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    setLoginput({
      ...loginput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formdata = {
      email: loginput.email,
      password: loginput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, formdata).then((res) => {
        if (res.data.status == 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.auth_name);
          swal({
            title: "Good job!",
            text: res.data.message,
            icon: "success",
          });
          if (res.data.role_as == "admin") {
            history.push("/admin");
          } else {
            history.push("/");
          }
        } else if (res.data.status == 401) {
          swal({
            title: "Warning",
            text: res.data.message,
            icon: "warning",
          });
        } else {
          setLoginput({
            ...loginput,
            error_list: res.data.validation_erros,
          });
        }
      });
    });
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-5">
              <h4 className="my-4">Login form</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={handleInput}
                    value={loginput.name}
                    name="email"
                  />
                  <div id="emailHelp" className="form-text">
                    {loginput.error_list.email}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={handleInput}
                    value={loginput.password}
                    name="password"
                  />
                  <div id="emailHelp" className="form-text">
                    {loginput.error_list.password}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
