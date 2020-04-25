/* eslint-disable react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";

function GamePageComplete({ message, onReplay }) {
  return (
    <div className="row text-left">
      <div className="col-md-12">
        <h3>Game Results!!</h3>
        <p>{message}</p>
        <button className="btn btn-lg btn-primary" onClick={onReplay}>
          Replay >>
        </button>
      </div>
    </div>
  );
}

GamePageComplete.propTypes = {
  message: PropTypes.string.isRequired,
  onReplay: PropTypes.func.isRequired,
};

export default GamePageComplete;
