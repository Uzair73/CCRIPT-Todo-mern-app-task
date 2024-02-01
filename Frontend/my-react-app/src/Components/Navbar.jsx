import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  let Navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    Navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="">
            Todo list App
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/notes">
                  Your Notes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <NavLink
                  className=" d-none btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Signup
                </NavLink>
                <NavLink
                  className="btn btn-primary mx-3"
                  to="/login"
                  role="button"
                >
                  Login
                </NavLink>
              </form>
            ) : (
              <NavLink
                className="btn btn-primary mx-3"
                to="/login"
                role="button"
                onClick={logout}
              >
                Logout
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
