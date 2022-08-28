import "./App.css";
import LandingPage from "./auth/landing/LandingPage";

import { useState } from "react";

import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Login from "./auth/login/Login.component";
import Register from "./auth/registration/Register";
import Protected from "./auth/routing/Protected";
import Activity from "./urls/activity/Activity";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("url_token");
    updateLogin(false)
    navigate('/login')
  };

  function updateLogin(value){
    setIsLoggedIn(value)
  }

  return (
    <div>
      {/**Navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div
          className="
      container-fluid container-xl
      d-flex
      align-items-center
      justify-content-between
    "
        >
          <Link className="navbar-brand text-primary" to={"/"}>
            URL Shortner
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            style={{ padding: 0, border: "none" }}
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list text-primary"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            {isLoggedIn && (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link text-primary" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-primary" to={"/activity"}>
                    Activity
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link logout" onClick={logout}>
                    <i className="bi bi-power"></i>
                  </button>
                </li>
              </ul>
            )}
            {!isLoggedIn && (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link text-primary" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-primary" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-primary" to={"/login"}>
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/login" element={<Login onChange={() => setIsLoggedIn(true)}/>} />
          <Route
            path="/activity"
            element={
              <Protected>
                <Activity />
              </Protected>
            }
          />
          <Route path="*" element={ <Navigate to="/" /> }/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
