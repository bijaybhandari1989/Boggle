import React, { useEffect, useState } from "react";
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
    <div className="login-form">
      <form onSubmit={handleRegister}>
        <h2 className="text-center"> Register Form</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          {errors.name && (
            <div className="alert alert-danger">{errors.name}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="alert alert-danger">{errors.username}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            name="password"
          />
          {errors.password && (
            <div className="alert alert-danger">{errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary btn-block"
          >
            {saving ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
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
