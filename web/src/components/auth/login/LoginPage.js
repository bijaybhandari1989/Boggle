import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logout } from "../../../redux/actions/authActions";
import { toast } from "react-toastify";
import LoginForm from "./LoginForm";

export function LoginPage({ history, login, logout }) {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

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
    if (!password) errors.password = "Password is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  return (
    <LoginForm
      errors={errors}
      login={inputs}
      onChange={handleChange}
      onSave={handleLogin}
      saving={saving}
    ></LoginForm>
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
