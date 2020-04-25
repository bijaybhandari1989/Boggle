import React from "react";
import GamePageScore from "./GamePageScore";
import { shallow } from "enzyme";

function renderGamePageScore(args) {
  const defaultProps = {
    minutes: 2,
    seconds: 0,
    words: [],
    calculateTotalScore: () => {},
  };
  const props = { ...defaultProps, ...args };
  return shallow(<GamePageScore {...props} />);
}

it("renders table model", () => {
  const wrapper = renderGamePageScore();
  expect(wrapper.find("table").length).toEqual(1);
  expect(wrapper.find("thead").length).toEqual(1);
  expect(wrapper.find("tbody").length).toEqual(1);
  expect(wrapper.find("tfoot").length).toEqual(1);
});
