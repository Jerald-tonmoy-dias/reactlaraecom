import React from "react";
import Navbar from "../../layouts/frontend/Navbar";

export default function Home() {
  return (
    <>
      {/* <!-- Hero section--> */}
      <section className="py-5 border-bottom bg-dark" id="features">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center my-5">
                <h1 className="display-5 fw-bolder text-white mb-2">
                  Present your business in a whole new way
                </h1>
                <p className="lead text-white-50 mb-4">
                  Quickly design and customize responsive mobile-first sites
                  with Bootstrap, the world’s most popular front-end open source
                  toolkit!
                </p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                  <a
                    className="btn btn-primary btn-lg px-4 me-sm-3"
                    href="#features"
                  >
                    Get Started
                  </a>
                  <a className="btn btn-outline-light btn-lg px-4" href="#!">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        >
      </section>
    </>
  );
}
