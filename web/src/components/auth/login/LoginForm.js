import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function LoginForm({ onSave, onChange, login, saving = false, errors = {} }) {
  return (
    <form className="form-signin" onSubmit={onSave}>
      <div className="text-center mb-4">
        <h1 className="h3 mb-3 font-weight-normal">Login</h1>
      </div>

      <div className="form-label-group">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          name="username"
          value={login.username}
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
          value={login.password}
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
        {saving ? "Login..." : "Log in"}
      </button>
      <p className="mt-4 mb-2 text-muted text-center">
        Dont have an account? <Link to="/signup">Register</Link>
      </p>
    </form>
  );
}

LoginForm.propTypes = {
  saving: PropTypes.bool,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
};

export default LoginForm;
