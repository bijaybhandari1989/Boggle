import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import "../login.css";
import LoginLayout from "./layout/LoginLayout";

const LoginRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <LoginLayout>
          <Component {...props} />
        </LoginLayout>
      )}
    />
  );
};

LoginRoutes.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default LoginRoutes;
