import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logout } from "../../../redux/actions/authActions";
import { toast } from "react-toastify";

function LoginPage({ history, login, logout }) {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { username, password } = inputs;

  // reset login status
  useEffect(() => {
    logout();
  }, []);

  function handleLogin(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    login(inputs.username, inputs.password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        setSaving(false);
        toast.error(error.message);
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function formIsValid() {
    const { username, password } = inputs;
    const errors = {};

    if (!username) errors.username = "Username is required.";
    if (!password) errors.password = "Password is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  return (
    <form className="form-signin" onSubmit={handleLogin}>
      <div className="text-center mb-4">
        <h1 className="h3 mb-3 font-weight-normal">Login</h1>
      </div>

      <div className="form-label-group">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <label htmlFor="inputEmail">Username</label>
        {errors.username && (
          <div className="alert alert-danger">{errors.username}</div>
        )}
      </div>

      <div className="form-label-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          name="password"
        />
        <label htmlFor="inputPassword">Password</label>
        {errors.password && (
          <div className="alert alert-danger">{errors.password}</div>
        )}
      </div>

      <button
        disabled={saving}
        className="btn btn-lg btn-primary btn-block"
        type="submit"
      >
        {saving ? "Login..." : "Log in"}
      </button>
      <p className="mt-4 mb-2 text-muted text-center">
        Dont have an account? <Link to="/signup">Register</Link>
      </p>
    </form>
  );
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  login,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
