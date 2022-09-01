import React, { useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

import { Toast, ToastContainer } from "react-bootstrap";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState([]);

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}`.concat("/api/users/login"),
      data: {
        user: {
          email,
          password,
        },
      },
    };

    axios(configuration)
      .then((result) => {
        console.log(result)
        setLogin(true);
        setMessage(result.data.message);
        sessionStorage.setItem("url_token", result.data.token);
        props.onChange(true);
      })
      .catch((err) => {
        setError(true);
        setMessage((prev) => [...prev, err.response.data.errors]);
      });
  };

  const clearData = () => {
    if (login) {
      navigate("/activity");
      setEmail("");
      setPassword("");
    }
    setLogin(false);
    setError(false);
    setMessage("");
  };

  function renderErrors() {
    const errors = [];

    if (error) {
      for (const err of message) {
        errors.push(<li className="text-white">{err}</li>);
      }
    }
    return errors;
  }

  return (
    <div className="login-card">
      <div className="card cards">
        <div className="card-body p-0 row g-0">
          <div className="box-img col-6 p-0 m-0">
            <img
              src="https://images.pexels.com/photos/2033997/pexels-photo-2033997.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              height={"500"}
              width={"400"}
              alt=""
            ></img>
          </div>
          <div className="box-text col-6 p-4">
            <h2 className="text-primary">Login</h2>
            <p className="mb-4" style={{ fontSize: "13px" }}>
              <em>Welcome! Login to view your activity and create new URLs.</em>
            </p>
            <form onSubmit={(e) => handleSubmit(e)} className="mt-2">
              {/* email */}
              <div className="mb-3">
                <label>Email address</label>
                <input
                  name="email"
                  value={email}
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* password */}
              <div className="mb-3">
                <label>Password</label>
                <input
                  name="password"
                  value={password}
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Remember me*/}
              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheck1"
                  />
                  <label className="form-check-label" htmlFor="customCheck1">
                    Remember me
                  </label>
                </div>
              </div>

              {/* submit button */}
              <div className="d-grid mb-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => handleSubmit(e)}
                >
                  Login
                </button>
              </div>

              {/** Forgot password */}
              <div className="d-flex justify-content-between">
                <p className="forgot-password text-right">
                  New User?{" "}
                  <Link to={"/sign-up"} style={{ textDecoration: "none" }}>
                    Register
                  </Link>
                </p>
                <p className="forgot-password text-right">
                  <Link to={"/sign-up"} style={{ textDecoration: "none" }}>
                    Forgot password?
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/**Toast container */}
      <ToastContainer position="top-end" className="m-2">
        {/** Error Toast */}
        <Toast
          onClose={clearData}
          show={error}
          delay={3000}
          autohide
          bg="danger"
        >
          <Toast.Header>
            {/* <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            /> */}
            <strong className="me-auto">Alert</strong>
            <small>1 sec ago</small>
          </Toast.Header>
          <Toast.Body>
            <ol>{renderErrors()}</ol>
          </Toast.Body>
        </Toast>

        {/** Success Toast */}
        <Toast
          onClose={clearData}
          show={login}
          delay={1500}
          autohide
          bg="success"
          placement="top-end"
        >
          <Toast.Header>
            {/* <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            /> */}
            <strong className="me-auto">Success</strong>
            <small>1 sec ago</small>
          </Toast.Header>
          <Toast.Body className="text-white">{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
