import React from "react";
import { HomePage } from "./HomePage";
import { shallow } from "enzyme";

function renderHomePage(args) {
  const defaultProps = {
    replayGame: jest.fn(),
  };

  const props = { ...defaultProps, ...args };

  return shallow(<HomePage {...props} />);
}

it("renders header", () => {
  const wrapper = renderHomePage();
  expect(wrapper.find("h3").text()).toEqual("Prepare to Play 4x4!");
});

it("contains 1 Link", () => {
  const wrapper = renderHomePage();
  const link = wrapper.find("Link").length;
  expect(link).toEqual(1);
});
