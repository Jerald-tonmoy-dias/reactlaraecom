import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
export default function AddProduct() {
  // states
  const [categoryList, setCategoryList] = useState([]);
  const [picture, setPicture] = useState([]);
  const [error, setError] = useState([]);
  const [productInput, setProductInput] = useState({
    category_id: "",
    slug: "",
    name: "",
    des: "",

    meta_title: "",
    meta_keyword: "",
    meta_des: "",

    selling_price: "",
    original_price: "",
    qty: "",
    brand: "",
    featured: "",
    popular: "",
    status: "",
  });

  const handleInput = (e) => {
    e.persist();
    setProductInput({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  useEffect(() => {
    // get catgory list
    axios.get(`api/get-all-category`).then((res) => {
      if (res.data.status == 200) {
        setCategoryList(res.data.category);
      }
    });
  }, []);

  //   handle submit
  const productSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", picture.image);
    formData.append("category_id", productInput.category_id);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("des", productInput.des);

    formData.append("meta_title", productInput.meta_title);
    formData.append("meta_keyword", productInput.meta_keyword);
    formData.append("meta_des", productInput.meta_des);

    formData.append("selling_price", productInput.selling_price);
    formData.append("original_price", productInput.original_price);
    formData.append("qty", productInput.qty);
    formData.append("brand", productInput.brand);
    formData.append("featured", productInput.featured);
    formData.append("popular", productInput.popular);
    formData.append("status", productInput.status);

    axios.post(`api/store-product`, formData).then((res) => {
      if (res.data.status == 200) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
        });
        setError([]);
      } else if (res.data.status == 422) {
        swal({
          title: "All fields are mendatory",
          text: res.data.errors,
          icon: "error",
        });
        setError(res.data.errors);
      }
    });
  };
  return (
    <>
      <div className="container-fluid px-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="my-4">Add Product</h2>
          <Link
            to="/admin/view-category"
            className="btn btn-primary btn-sm px-4 text-capitalize"
          >
            Back to product list
          </Link>
        </div>
        <div className="card-body">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-product-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-product"
                type="button"
                role="tab"
                aria-controls="home-product"
                aria-selected="true"
              >
                Home
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="seo-tags-tab"
                data-bs-toggle="tab"
                data-bs-target="#seo-tags"
                type="button"
                role="tab"
                aria-controls="seo-tags"
                aria-selected="false"
              >
                SEO Tags
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="other-details-tab"
                data-bs-toggle="tab"
                data-bs-target="#other-details"
                type="button"
                role="tab"
                aria-controls="other-details"
                aria-selected="false"
              >
                Other Details
              </button>
            </li>
          </ul>
          <form encType="multipart/form-data" onSubmit={productSubmit}>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane card border p-4 fade show active"
                id="home-product"
                role="tabpanel"
                aria-labelledby="home-product-tab"
              >
                {/* input starts */}
                <div className="form-group mb-3">
                  <label className="mb-3">Select Category</label>
                  <select
                    name="category_id"
                    className="form-control"
                    onChange={handleInput}
                    value={productInput.category_id}
                  >
                    <option>select category</option>
                    {categoryList.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <span className="text-danger my-3">{error.category_id}</span>
                </div>
                <div className="form-group mb-3">
                  <label className="mb-3">Slug</label>
                  <input
                    name="slug"
                    type="text"
                    placeholder="slug"
                    className="form-control"
                    onChange={handleInput}
                    value={productInput.slug}
                  />
                  <span className="text-danger my-3">{error.slug}</span>
                </div>
                <div className="form-group mb-3">
                  <label className="mb-3">Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="name"
                    className="form-control"
                    onChange={handleInput}
                    value={productInput.name}
                  />
                  <span className="text-danger my-3">{error.name}</span>
                </div>
                <div className="form-group mb-3">
                  <label className="mb-3">Description</label>
                  <textarea
                    name="des"
                    type="text"
                    placeholder="description"
                    className="form-control"
                    onChange={handleInput}
                    value={productInput.des}
                  ></textarea>
                  {/* <span className="text-danger my-3">{error.slug}</span> */}
                </div>
                {/* input ends */}
              </div>
              <div
                className="tab-pane card border p-4 fade"
                id="seo-tags"
                role="tabpanel"
                aria-labelledby="seo-tags-tab"
              >
                {/* input starts */}
                <div className="form-group mb-3">
                  <label className="mb-3">Meta title</label>
                  <input
                    name="meta_title"
                    type="text"
                    placeholder="meta-title"
                    className="form-control"
                    onChange={handleInput}
                    value={productInput.meta_title}
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
                    value={productInput.meta_keyword}
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
                    value={productInput.meta_des}
                  ></textarea>
                </div>
                {/* input ends */}
              </div>
              <div
                className="tab-pane card border p-4 fade"
                id="other-details"
                role="tabpanel"
                aria-labelledby="other-details-tab"
              >
                {/* input starts */}
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label className="mb-3">Selling price</label>
                    <input
                      name="selling_price"
                      type="text"
                      placeholder="selling price"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.selling_price}
                    />
                    <span className="text-danger my-3">
                      {error.selling_price}
                    </span>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label className="mb-3">Original price</label>
                    <input
                      name="original_price"
                      type="text"
                      placeholder="original price"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.original_price}
                    />
                    <span className="text-danger my-3">
                      {error.original_price}
                    </span>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label className="mb-3">Quantity</label>
                    <input
                      name="qty"
                      type="text"
                      placeholder="Quantity"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.qty}
                    />
                    <span className="text-danger my-3">{error.qty}</span>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label className="mb-3">Brand</label>
                    <input
                      name="brand"
                      type="text"
                      placeholder="Brand"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.brand}
                    />
                    <span className="text-danger my-3">{error.brand}</span>
                  </div>
                  <div className="col-md-8 form-group mb-3">
                    <label className="mb-3">Image</label>
                    <input
                      name="image"
                      type="file"
                      className="form-control"
                      onChange={handleImage}
                    />
                    <span className="text-danger my-3">{error.image}</span>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label className="mb-3">Featured (checked=shown)</label>
                    <input
                      name="featured"
                      type="checkbox"
                      placeholder="featured"
                      className="w-50 h-50"
                      onChange={handleInput}
                      value={productInput.featured}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label className="mb-3">Popular (checked=shown)</label>
                    <input
                      name="popular"
                      type="checkbox"
                      placeholder="popular"
                      className="w-50 h-50"
                      onChange={handleInput}
                      value={productInput.popular}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label className="mb-3">Status (checked=hidden)</label>
                    <input
                      name="status"
                      type="checkbox"
                      placeholder="status"
                      className="w-50 h-50"
                      onChange={handleInput}
                      value={productInput.status}
                    />
                  </div>
                </div>
                {/* input ends */}
              </div>
              <button className="btn btn-primary px-4 mt-4" type="submit">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
