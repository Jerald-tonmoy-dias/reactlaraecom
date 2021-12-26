import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
export default function AddCategory() {
  // initial value
  const [categoryInput, setCategoryInput] = useState({
    slug: "",
    name: "",
    des: "",
    status: "",
    meta_title: "",
    meta_keyword: "",
    meta_des: "",
    errors: [],
  });

  // setting value
  const handleInput = (e) => {
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  };

  // handle submit
  const categorySubmit = (e) => {
    e.preventDefault();

    let data = {
      slug: categoryInput.slug,
      name: categoryInput.name,
      des: categoryInput.des,
      status: categoryInput.status,
      meta_title: categoryInput.meta_title,
      meta_keyword: categoryInput.meta_keyword,
      meta_des: categoryInput.meta_des,
    };

    axios.post(`api/store-category`, data).then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
        });

        document.getElementById("CATEGORY_FORM").reset();
      }
      if (res.data.status == 400) {
        setCategoryInput({ ...categoryInput, errors: res.data.errors });
      }
    });
  };

  // display error
  let display_error = [];

  if (categoryInput.errors) {
    display_error = [
      categoryInput.errors.slug,
      categoryInput.errors.name,
      categoryInput.errors.meta_title,
    ];
  }
  return (
    <>
      <div className="container-fluid px-4">
        <h2 className="my-4">Add Category</h2>
        {display_error.map((item) => {
          return <p className="my-2">{item}</p>;
        })}
        <form onSubmit={categorySubmit} id="CATEGORY_FORM">
          <div className="p-4 card border">
            {/* nav */}
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Home
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="seo-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#seo"
                  type="button"
                  role="tab"
                  aria-controls="seo"
                  aria-selected="false"
                >
                  Seo tags
                </button>
              </li>
            </ul>
            {/* main content */}
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active card-body border"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                {/* input start*/}
                <div className="form-group mb-3">
                  <label className="mb-3">Slug</label>
                  <input
                    name="slug"
                    type="text"
                    placeholder="slug"
                    className="form-control"
                    onChange={handleInput}
                    value={categoryInput.slug}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="mb-3">Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="slug"
                    className="form-control"
                    onChange={handleInput}
                    value={categoryInput.name}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="mb-3">Description</label>
                  <textarea
                    name="des"
                    type="text"
                    placeholder="slug"
                    className="form-control"
                    onChange={handleInput}
                    value={categoryInput.des}
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label className="mb-3 mr-4 d-block">Status</label>
                  <input
                    name="status"
                    type="checkbox"
                    className="mr-4 d-inline-block"
                    onChange={handleInput}
                    value={categoryInput.status}
                  />
                  <span className="ml-4 d-inline-block">1=show/0=hidden</span>
                </div>

                {/* input end*/}
              </div>
              <div
                class="tab-pane fade card-body border"
                id="seo"
                role="tabpanel"
                aria-labelledby="seo-tab"
              >
                {/* input start */}
                <div className="form-group mb-3">
                  <label className="mb-3">Meta title</label>
                  <input
                    name="meta_title"
                    type="text"
                    placeholder="meta-title"
                    className="form-control"
                    onChange={handleInput}
                    value={categoryInput.meta_title}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="mb-3">Meta Keyword</label>
                  <textarea
                    name="meta_keyword"
                    type="text"
                    placeholder="meta-keyword"
                    className="form-control"
                    onChange={handleInput}
                    value={categoryInput.meta_keyword}
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label className="mb-3">Meta Description</label>
                  <textarea
                    name="meta_des"
                    type="text"
                    placeholder="meta-description"
                    className="form-control"
                    onChange={handleInput}
                    value={categoryInput.meta_des}
                  ></textarea>
                </div>
                {/* input end */}
              </div>
              <button className="btn btn-primary px-4" type="submit">
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
