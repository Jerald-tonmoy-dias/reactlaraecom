import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Collection() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("api/get-category-collection").then((res) => {
      if (res.data.status == 200) {
        setCategory(res.data.category);
        setLoading(false);
      }
    });
  }, []);

  let viewcategoryList = "";
  if (loading) {
    return (viewcategoryList = (
      <div className="col-lg-4 mb-4">
        <div className="card">
          <div className="card-body">
            <h4>category loading...</h4>
          </div>
        </div>
      </div>
    ));
  } else {
    viewcategoryList = category.map((item, index) => {
      return (
        <div className="col-lg-4 mb-4" key={index}>
          <div className="card">
            <div className="card-body">
              {/* <Link>
                <img src={`$`}/>
            </Link> */}
              <Link to={`/collection/${item.slug}`}>
                <h4>{item.name}</h4>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="container mt-5">
        <nav aria-label="breadcrumb" className="bg-warning py-3 px-4">
          <ol class="breadcrumb">
            <li
              class="breadcrumb-item active text-white display-5"
              aria-current="page"
            >
              Home
            </li>
          </ol>
        </nav>

        <div className="row mt-4 justify-content-center">
          {viewcategoryList}
        </div>
      </div>
    </>
  );
}
