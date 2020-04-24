/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTimer } from "react-timer-hook";
import {
  getBoggleBoard,
  selectBoardDice,
  deselectBoardDice,
} from "../../helper/boggle";
import GameBoard from "./GameBoard";
import {
  validate,
  replayGame,
  submitScore,
  generateWords,
} from "../../redux/actions/wordActions";

function GamePage({
  expiryTimestamp,
  validate,
  replayGame,
  submitScore,
  generateWords,
  words,
}) {
  const [inputs, setInputs] = useState({
    word: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [gameBoard, setGameBoard] = useState([]);
  const [diceList, setDiceList] = useState([]);
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
    replay();
  }, []);

  function startGame() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 120);
    restart(time);
  }

  function handleWord(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    const oldWord = words.filter((c) => c.word === inputs.word);
    if (oldWord.length > 0) {
      errors.word = "Cannot use same word twice";
      setErrors(errors);
    } else {
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
    setGameBoard(deselectBoardDice(gameBoard));
    inputs.word = "";
    setDiceList([]);
    setInputs(inputs);
  }

  function handleDiceClick(dice) {
    const updatedGameBoard = selectBoardDice(dice, gameBoard);
    let wordsList = diceList.map((x) => x);
    errors.word = "";
    setErrors(errors);
    if (wordsList.length === 0) {
      wordsList.push(dice);
      setDiceList(wordsList);
      inputs.word = inputs.word + dice.char;
      setInputs(inputs);
      setGameBoard(updatedGameBoard);
    } else {
      const oldWord = wordsList.filter(
        (c) => c.char === dice.char && c.row === dice.row && c.col == dice.col
      );
      if (oldWord.length > 0) {
        errors.word = "You cannot select same word twice";
        setErrors(errors);
      } else {
        let lastWord = wordsList.slice(-1)[0];
        const colDiff = Math.abs(lastWord.col - dice.col);
        const rowDiff = Math.abs(lastWord.row - dice.row);
        if (colDiff === 0 && rowDiff === 0) {
          errors.word = "You cannot select same word twice";
          setErrors(errors);
        } else if (colDiff <= 1 && rowDiff <= 1) {
          wordsList.push(dice);
          setDiceList(wordsList);
          inputs.word = inputs.word + dice.char;
          setInputs(inputs);
          setGameBoard(updatedGameBoard);
        } else {
          errors.word = "You cannot select that one";
          setErrors(errors);
        }
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function calculateTotalScore(words) {
    return words.reduce((total, obj) => obj.score + total, 0);
  }

  function reset(event) {
    event.preventDefault();
    errors.word = "";
    setErrors(errors);
    inputs.word = "";
    setInputs(inputs);
    setDiceList([]);
    setGameBoard(deselectBoardDice(gameBoard));
  }

  function replay() {
    setSaving(false);
    setfinalMessage("");
    inputs.word = "";
    setInputs(inputs);
    errors.word = "";
    setErrors(errors);
    setDiceList([]);
    replayGame().then(() => {
      generateWords().then((data) => {
        const board = getBoggleBoard(data);
        setGameBoard(board);
        startGame();
      });
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
              <h3>Game Results!!</h3>
              <p>{finalMessage}</p>
              <button className="btn btn-lg btn-primary" onClick={replay}>
                Replay >>
              </button>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6 text-left">
              <h3>How to Play?</h3>
              <p>You can click on the gameboard to start writing words.</p>
              <h3>Instructions</h3>
              <ol>
                <li>
                  The letters must be adjoining in a 'chain'. (Letter cubes in
                  the chain may be adjacent horizontally, vertically, or
                  diagonally.)
                </li>
                <li>Words must contain at least three letters.</li>
                <li>
                  No letter cube may be used more than once within a single
                  word.
                </li>
                <li>Words cannot be repeated.</li>
              </ol>
              <h3>Scoring</h3>
              <ul>
                <li>Fewer than 3 Letters: no score</li>
                <li>3 Letters: 1 point</li>
                <li>4 Letters: 1 point</li>
                <li>5 Letters: 2 points</li>
                <li>6 Letters: 3 points</li>
                <li>7 Letters: 4 points</li>
                <li>8 or More Letters: 11 points</li>
              </ul>
            </div>
            <div className="col-md-6">
              <GameBoard
                boards={gameBoard}
                validateOnClick={handleDiceClick}
              ></GameBoard>
              <form className="form mt-5" onSubmit={handleWord}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Click Letters Above"
                    name="word"
                    value={word}
                    readOnly
                    onChange={handleChange}
                  ></input>
                  {errors.word && (
                    <div className="alert alert-danger">{errors.word}</div>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <button
                      className="btn btn-lg btn-danger btn-block"
                      onClick={() => reset(event)}
                    >
                      Reset
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      disabled={saving}
                      className="btn btn-lg btn-primary btn-block"
                      type="submit"
                    >
                      {saving ? "Time Out" : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
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
  generateWords: PropTypes.func.isRequired,
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
  generateWords,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
