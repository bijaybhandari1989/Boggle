import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import GamePage from "./game/GamePage";
import ConnectedLoginPage from "./auth/login/LoginPage";
import RegisterPage from "./auth/register/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import LoginRoute from "./LoginRoute";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute path="/game" component={GamePage} />
        <LoginRoute path="/signup" component={RegisterPage} />
        <LoginRoute path="/login" component={ConnectedLoginPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
}

export default App;
