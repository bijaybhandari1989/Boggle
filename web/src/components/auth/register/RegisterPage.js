import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register, logout } from "../../../redux/actions/authActions";
import { toast } from "react-toastify";

function RegisterPage({ history, register, logout }) {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const { username, password, name } = inputs;

  // reset login status
  useEffect(() => {
    logout();
  }, []);

  function handleRegister(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    register(inputs)
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
    const { username, password, name } = inputs;
    const errors = {};

    if (!username) errors.username = "Username is required.";
    if (!password) errors.password = "Password is required";
    if (!name) errors.name = "Name, is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  return (
    <form className="form-signin" onSubmit={handleRegister}>
      <div className="text-center mb-4">
        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
      </div>

      <div className="form-label-group">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <label htmlFor="inputEmail">Name</label>
        {errors.name && <div className="alert alert-danger">{errors.name}</div>}
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
        {saving ? "Registering..." : "Register"}
      </button>
      <p className="mt-4 mb-2 text-muted text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

RegisterPage.propTypes = {
  history: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  register,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
