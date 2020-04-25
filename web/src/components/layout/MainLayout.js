import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "../../main.css";
const MainLayout = (props) => {
  return (
    <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
      <header className="masthead">
        <div className="inner">
          <h3 className="masthead-brand">Boggle</h3>
          <nav className="nav nav-masthead justify-content-center">
            <NavLink to="/" className="nav-link active" exact>
              Home
            </NavLink>
            <NavLink to="/login" className="nav-link">
              Logout
            </NavLink>
          </nav>
        </div>
      </header>
      <main role="main" className="inner cover">
        {props.children}
      </main>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
