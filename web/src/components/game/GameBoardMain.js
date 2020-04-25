/* eslint-disable react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";
import GameBoard from "./GameBoard";

function GameBoardMain({
  gameBoard,
  onDiceClick,
  onSubmit,
  onChange,
  onReset,
  formdata,
  saving = false,
  errors = {},
}) {
  return (
    <div className="row">
      <div className="col-md-6 text-left">
        <h3>How to Play?</h3>
        <p>You can click on the gameboard to start writing words.</p>
        <h3>Instructions</h3>
        <ol>
          <li>
            The letters must be adjoining in a 'chain'. (Letter cubes in the
            chain may be adjacent horizontally, vertically, or diagonally.)
          </li>
          <li>Words must contain at least three letters.</li>
          <li>
            No letter cube may be used more than once within a single word.
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
        <GameBoard boards={gameBoard} validateOnClick={onDiceClick}></GameBoard>
        <form className="form mt-5" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Click Letters Above"
              name="word"
              value={formdata.word}
              readOnly
              onChange={onChange}
            ></input>
            {errors.word && (
              <div className="alert alert-danger">{errors.word}</div>
            )}
          </div>
          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-lg btn-danger btn-block"
                onClick={() => onReset(event)}
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
  );
}

GameBoardMain.propTypes = {
  gameBoard: PropTypes.array.isRequired,
  onDiceClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  formdata: PropTypes.object.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object.isRequired,
};

export default GameBoardMain;
