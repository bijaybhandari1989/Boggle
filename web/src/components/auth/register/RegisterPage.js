import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register, logout } from "../../../redux/actions/authActions";
import { toast } from "react-toastify";
import RegisterForm from "./RegisterForm";

export function RegisterPage({ history, register, logout }) {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

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
    if (!password) errors.password = "Password is required.";
    if (!name) errors.name = "Name is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  return (
    <RegisterForm
      errors={errors}
      onChange={handleChange}
      onSubmit={handleRegister}
      register={inputs}
      saving={saving}
    ></RegisterForm>
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
