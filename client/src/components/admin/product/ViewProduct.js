import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../Base_url";
export default function ViewProduct() {
  // initial value
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    document.title = "view product";

    axios.get("api/view-product").then((res) => {
      if (res.status == 200) {
        setProductList(res.data.category);
      }
      setLoading(false);
    });
  }, []);

  // handle delete
  const handleDelete = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`api/delete-category/${id}`).then((res) => {
      if (res.data.status == 200) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
        });

        thisClicked.closest("tr").remove();
      } else if (res.data.status == 404) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
        });

        thisClicked.innerText = "Delete";
      }
    });
  };

  // table input
  let viewProduct_HTML_Table = "";

  if (loading) {
    return <h2>Loading Product....</h2>;
  } else {
    viewProduct_HTML_Table = productList.map((item, idx) => {
      return (
        <>
          <tr key={idx}>
            <td>{item.id}</td>
            <td>{item.category.name}</td>
            <td>{item.name}</td>
            <td>{item.selling_price}</td>
            <td>
              <img
                src={`${BASE_URL}${item.image}`}
                width={50}
                alt={item.name}
              />
            </td>
            <td>
              <Link
                className="btn btn-success btn-sm"
                to={`edit-product/${item.id}`}
              >
                Edit
              </Link>
            </td>
            <td>
              <button
                type="button"
                onClick={(e) => handleDelete(e, item.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </>
      );
    });
  }

  return (
    <>
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="my-4">Product List</h2>
            <Link
              to="/admin/add-product"
              className="btn btn-primary btn-sm px-4 text-capitalize"
            >
              add product
            </Link>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category Name</th>
                  <th>Product name</th>
                  <th>Selling Price</th>
                  <th>Image</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{viewProduct_HTML_Table}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
