import React from "react";
import GameBoard from "./GameBoard";
import { shallow } from "enzyme";

function renderGameBoard(args) {
  const defaultProps = {
    boards: [
      {
        char: "A",
        isActive: false,
        row: 1,
        col: 1,
      },
      {
        char: "B",
        isActive: false,
        row: 1,
        col: 2,
      },
      {
        char: "C",
        isActive: false,
        row: 1,
        col: 3,
      },
    ],
    validateOnClick: () => {},
  };
  const props = { ...defaultProps, ...args };
  return shallow(<GameBoard {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderGameBoard();
  expect(wrapper.find("button").length).toEqual(3);
});
