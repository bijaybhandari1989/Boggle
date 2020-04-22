import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import LoginPage from "./auth/login/LoginPage";
import RegisterPage from "./auth/register/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import LoginRoute from "./LoginRoute";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <LoginRoute path="/signup" component={RegisterPage} />
        <LoginRoute path="/login" component={LoginPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
