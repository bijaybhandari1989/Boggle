import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function RegisterForm({
  onSubmit,
  onChange,
  register,
  saving = false,
  errors = {},
}) {
  return (
    <form className="form-signin" onSubmit={onSubmit}>
      <div className="text-center mb-4">
        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
      </div>

      <div className="form-label-group">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          name="name"
          value={register.name}
          onChange={onChange}
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
          value={register.username}
          onChange={onChange}
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
          value={register.password}
          onChange={onChange}
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

RegisterForm.propTypes = {
  register: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object,
};

export default RegisterForm;
