/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTimer } from "react-timer-hook";
import { validate } from "../../redux/actions/wordActions";

function GamePage({ expiryTimestamp, validate }) {
  const [inputs, setInputs] = useState({
    word: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => setSaving(false),
  });
  const { word } = inputs;
  // reset login status
  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 120);
    restart(time);
  }, []);

  function handleWord(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    validate(inputs.word)
      .then(() => {})
      .catch((error) => {
        errors.word = error.message;
        setErrors(errors);
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function formIsValid() {
    const { word } = inputs;
    const errors = {};

    if (!word) {
      errors.word = "Word is required.";
    } else if (word.length < 3) {
      errors.word = "Word must be at least 3 character.";
    }

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  return (
    <div className="row">
      <div className="col-md-8">
        <form className="form" onSubmit={handleWord}>
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Words"
              name="word"
              value={word}
              onChange={handleChange}
            ></input>
            {errors.word && (
              <div className="alert alert-danger">{errors.word}</div>
            )}
          </div>
          <button
            disabled={saving}
            className="btn btn-lg btn-primary btn-block col-md-6"
            type="submit"
          >
            {saving ? "Expired" : "Submit"}
          </button>
        </form>
      </div>
      <div className="col-md-4">
        <table className="table table-dark">
          <thead>
            <tr>
              <th colSpan="2">Timer</th>
            </tr>
            <tr>
              <th colSpan="2">
                <span>0{minutes}</span>:<span>{seconds}</span>
              </th>
            </tr>
            <tr>
              <th>Word</th>
              <th>Score</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

GamePage.propTypes = {
  expiryTimestamp: PropTypes.object,
  validate: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  validate,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
