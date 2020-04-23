import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import MainLayout from "./layout/MainLayout";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("currentUser") &&
      JSON.parse(localStorage.getItem("currentUser")).auth_token.length > 0 ? (
        <MainLayout>
          <Component {...props} />
        </MainLayout>
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  location: PropTypes.object,
};

export default PrivateRoute;
