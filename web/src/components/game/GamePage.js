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
import GameBoardMain from "./GameBoardMain";
import {
  validate,
  replayGame,
  submitScore,
  generateWords,
} from "../../redux/actions/wordActions";
import GamePageComplete from "./GamePageComplete";
import GamePageScore from "./GamePageScore";

export function GamePage({
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
    expiryTimestamp: new Date(),
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
          <GamePageComplete
            message={finalMessage}
            onReplay={replay}
          ></GamePageComplete>
        ) : (
          <GameBoardMain
            errors={errors}
            gameBoard={gameBoard}
            onChange={handleChange}
            onDiceClick={handleDiceClick}
            onReset={reset}
            onSubmit={handleWord}
            saving={saving}
            formdata={inputs}
          ></GameBoardMain>
        )}
      </div>
      <div className="col-md-4">
        <GamePageScore
          calculateTotalScore={calculateTotalScore}
          seconds={seconds}
          minutes={minutes}
          words={words}
        ></GamePageScore>
      </div>
    </div>
  );
}

GamePage.propTypes = {
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
