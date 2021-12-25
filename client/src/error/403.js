import React from "react";
import Navbar from "../layouts/frontend/Navbar";

export default function Error403() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-5">
              <h4 className="my-4">403 page</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
