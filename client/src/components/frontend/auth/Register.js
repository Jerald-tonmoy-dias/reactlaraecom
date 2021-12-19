import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

export default function Register() {
  const history = useHistory();

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formdata = {
      name: register.name,
      email: register.email,
      password: register.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/register`, formdata).then((res) => {
        if (res.data.status == 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.auth_name);
          swal({
            title: "Good job!",
            text: res.data.message,
            icon: "success",
          });

          history("/");
        } else {
          setRegister({
            ...register,
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
              <h4 className="my-4">Register form</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputName1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    aria-describedby="emailHelp"
                    name="name"
                    onChange={handleInput}
                  />
                  <div id="emailHelp" className="form-text">
                    {register.error_list.name}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    onChange={handleInput}
                  />
                  <div id="emailHelp" className="form-text">
                    {register.error_list.email}
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
                    name="password"
                    onChange={handleInput}
                  />
                  <div id="emailHelp" className="form-text">
                    {register.error_list.password}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
     