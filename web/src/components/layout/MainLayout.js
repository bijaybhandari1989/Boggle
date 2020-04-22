import React from "react";
import PropTypes from "prop-types";

const MainLayout = (props) => {
  return (
    <div id="wrapper">
      <h1>Main Layout</h1>
      <div id="content">{props.children}</div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
