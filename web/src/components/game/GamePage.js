/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTimer } from "react-timer-hook";
import {
  validate,
  replayGame,
  submitScore,
} from "../../redux/actions/wordActions";

function GamePage({
  expiryTimestamp,
  validate,
  replayGame,
  submitScore,
  words,
}) {
  const [inputs, setInputs] = useState({
    word: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [finalMessage, setfinalMessage] = useState("");
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setSaving(true);
      submitScore(0)
        .then((data) => {
          setfinalMessage(data.message);
        })
        .catch((error) => {
          setfinalMessage(error.message);
        });
    },
  });
  const { word } = inputs;
  // reset login status
  useEffect(() => {
    startGame();
  }, []);

  function startGame() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 120);
    restart(time);
  }

  function handleWord(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    validate(inputs.word)
      .then((data) => {
        if (data && !data.valid) {
          errors.word = data.message;
          setErrors(errors);
        }
      })
      .catch((error) => {
        errors.word = error.message;
        setErrors(errors);
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function calculateTotalScore(words) {
    return words.reduce((total, obj) => obj.score + total, 0);
  }

  function replay() {
    setSaving(false);
    setfinalMessage("");
    inputs.word = "";
    replayGame().then(() => {
      startGame();
    });
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
        {finalMessage.length > 0 ? (
          <div className="row text-left">
            <div className="col-md-12">
              <h3>Game Completed!!</h3>
              <p>{finalMessage}</p>
              <button className="btn btn-lg btn-primary" onClick={replay}>
                Replay >>
              </button>
            </div>
          </div>
        ) : (
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
              {saving ? "Time Out" : "Submit"}
            </button>
          </form>
        )}
      </div>
      <div className="col-md-4">
        <table className="table table-dark">
          <thead>
            <tr>
              <th colSpan="2">Timer</th>
            </tr>
            <tr>
              <th colSpan="2">
                <span>{("0" + minutes).slice(-2)}</span>:
                <span>{("0" + seconds).slice(-2)}</span>
              </th>
            </tr>
            <tr>
              <th>Word</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word) => {
              return (
                <tr key={word.word}>
                  <td>{word.word}</td>
                  <td>{word.score}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{calculateTotalScore(words)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

GamePage.propTypes = {
  expiryTimestamp: PropTypes.object,
  validate: PropTypes.func.isRequired,
  words: PropTypes.array.isRequired,
  replayGame: PropTypes.func.isRequired,
  submitScore: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    words: state.words,
  };
}

const mapDispatchToProps = {
  validate,
  replayGame,
  submitScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
