import React from "react";
import PropTypes from "prop-types";

const LoginLayout = (props) => {
  return (
    <div id="wrapper">
      <div id="content">{props.children}</div>
    </div>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginLayout;
