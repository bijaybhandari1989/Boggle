import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../main.css";
const MainLayout = (props) => {
  return (
    <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
      <header className="masthead">
        <div className="inner">
          <h3 className="masthead-brand">Boggle</h3>
          <nav className="nav nav-masthead justify-content-center">
            <Link to="/" className="nav-link active">
              Home
            </Link>
            <Link to="/login" className="nav-link">
              Logout
            </Link>
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
