/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="row text-left">
    <div className="col-md-12">
      <h3>Prepare to Play 4x4!</h3>
      <p>
        A new 4x4 game has been initialized and is ready for you to play. You'll
        have two minutes to find as many words as you can. Each word must be at
        least three letters long. When you're ready to start, just click Start
        play!
      </p>
      <Link to="/game" className="btn btn-lg btn-primary">
        Start Game>>
      </Link>
    </div>
  </div>
);

export default HomePage;
