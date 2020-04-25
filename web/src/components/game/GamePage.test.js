import React from "react";
import { mount } from "enzyme";
import { GamePage } from "./GamePage";
import { BrowserRouter as Router } from "react-router-dom";

function renderGamePage(args) {
  const defaultProps = {
    expiryTimestamp: {},
    validate: jest.fn(),
    replayGame: async () => {},
    submitScore: jest.fn(),
    generateWords: jest.fn(),
    words: [],
  };

  const props = { ...defaultProps, ...args };

  return mount(
    <Router>
      <GamePage {...props} />
    </Router>
  );
}

it("sets error when attempting to submit an empty word field", () => {
  const wrapper = renderGamePage();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Word is required.");
});
