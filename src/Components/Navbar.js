import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

const Navbar = (props) => {
  return (
    <nav className={`navbar navbar-expand-lg bg-light`}>
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img
            style={{
              display: "flex",
              width: "15rem",
              height: "5rem",
              marginTop: "-1.5rem",
            }}
            src={Logo}
            alt=""
          />
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
                {props.about}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Set Title Here",
  about: "About Text Here",
};
