import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function LandingPage() {
  return (
    <section className="hero-area d-flex align-items-center">
      <div className="container-fluid container-xl">
        <div className="row align-items-center">
          <div className="col-lg-8 offset-lg-2 col-md-12 col-12">
            <div className="hero-content">
              <h1>Privately manage your own shortened URLs.</h1>
              <p>
                We provide for you a solution to the problem of sharing very
                long URLs that may be hard to remember.
              </p>
              <p>
                We create for you very simple versions of the very long complex
                URLs.
              </p>

              <h4>All this at no cost!</h4>

              <h5>Are you excited? Let's get started!</h5>

              <div className="button">
              <Link  to={"/sign-up"}>
              <i className="bi bi-arrow-right-circle"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
