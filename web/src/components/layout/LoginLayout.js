import React from "react";
import PropTypes from "prop-types";

const LoginLayout = (props) => {
  return <div className="login-page">{props.children}</div>;
};

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginLayout;
