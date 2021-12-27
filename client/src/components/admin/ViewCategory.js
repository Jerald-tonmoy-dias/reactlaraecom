import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
export default function ViewCategory() {
  // initial value
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get("api/view-category").then((res) => {
      if (res.status == 200) {
        setCategoryList(res.data.category);
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
  let viewCategory_HTML_Table = "";

  if (loading) {
    return <h2>Loading Category....</h2>;
  } else {
    viewCategory_HTML_Table = categorylist.map((item) => {
      return (
        <>
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.slug}</td>
            <td>{item.status}</td>
            <td>
              <Link
                className="btn btn-success btn-sm"
                to={`edit-category/${item.id}`}
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
            <h2 className="my-4">Category List</h2>
            <Link
              to="/admin/add-category"
              className="btn btn-primary btn-sm px-4 text-capitalize"
            >
              add category
            </Link>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{viewCategory_HTML_Table}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
