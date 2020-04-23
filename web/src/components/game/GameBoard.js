import React from "react";
import PropTypes from "prop-types";

function GameBoard({ boards, validateOnClick }) {
  return (
    <div className="boogle-pannel">
      {boards.map((dice, index) => {
        return (
          <button
            type="button"
            className="boogle-box"
            key={index}
            onClick={() => validateOnClick(dice)}
          >
            {dice.char}
          </button>
        );
      })}
    </div>
  );
}

GameBoard.propTypes = {
  boards: PropTypes.array.isRequired,
  validateOnClick: PropTypes.func.isRequired,
};

export default GameBoard;
