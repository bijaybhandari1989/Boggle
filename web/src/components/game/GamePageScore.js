/* eslint-disable react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";

function GamePageScore({ minutes, seconds, words, calculateTotalScore }) {
  return (
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
  );
}

GamePageScore.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  words: PropTypes.array.isRequired,
  calculateTotalScore: PropTypes.func.isRequired,
};

export default GamePageScore;
