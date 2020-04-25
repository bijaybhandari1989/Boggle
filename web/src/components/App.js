import React from "react";
import { Route, Switch } from "react-router-dom";
import ConnectedHomePage from "./home/HomePage";
import ConnectedGamePage from "./game/GamePage";
import ConnectedLoginPage from "./auth/login/LoginPage";
import ConnectedRegisterPage from "./auth/register/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import LoginRoute from "./LoginRoute";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Switch>
        <PrivateRoute exact path="/" component={ConnectedHomePage} />
        <PrivateRoute path="/game" component={ConnectedGamePage} />
        <LoginRoute path="/signup" component={ConnectedRegisterPage} />
        <LoginRoute path="/login" component={ConnectedLoginPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
}

export default App;
