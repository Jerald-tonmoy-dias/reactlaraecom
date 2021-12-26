import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
export default function EditCategory(props) {
  // initial value
  const [categoryInput, setCategoryInput] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);
  const history = useHistory();

  // setting value
  const handleInput = (e) => {
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  };

  // handle submit
  const updateCategory = (e) => {
    e.preventDefault();

    let data = categoryInput;

    let category_id = props.match.params.id;
    axios.put(`api/update-category/${category_id}`, data).then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
        });
        setError([]);
      } else if (res.data.status == 422) {
        swal({
          title: "All Fileds are mendatory",
          text: res.data.message,
          icon: "error",
        });
        setError(res.data.errors);
      } else if (res.data.status == 404) {
        swal({
          title: "Error",
          text: res.data.message,
          icon: "error",
        });
        history.push("/admin/view-category");
      }
    });
  };

  useEffect(() => {
    let category_id = props.match.params.id;
    axios.get(`api/edit-category/${category_id}`).then((res) => {
      if (res.data.status == 200) {
        setCategoryInput(res.data.category);
      } else if (res.data.status == 404) {
        swal({
          title: "Error",
          text: res.data.message,
          icon: "error",
        });

        history.push("/admin/view-category");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  if (loading) {
    return <h2>Loading Category....</h2>;
  }

  return (
    <>
      <div className="container-fluid px-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="my-4">Edit Category</h2>
          <Link
            to="/admin/view-category"
            className="btn btn-primary btn-sm px-4 text-capitalize"
          >
            Back to category list
          </Link>
        </div>

        <form onSubmit={updateCategory} id="CATEGORY_UPATED_FORM">
          <div className="p-4 card border">
            {/* nav */}
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
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
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
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
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active card-body border"
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
                  <span className="text-danger my-3">{error.slug}</span>
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
                  <span className="text-danger my-3">{error.name}</span>
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
                className="tab-pane fade card-body border"
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
                  <span className="text-danger my-3">{error.meta_title}</span>
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
