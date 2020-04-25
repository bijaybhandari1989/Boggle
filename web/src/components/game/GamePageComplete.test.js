import React from "react";
import GamePageComplete from "./GamePageComplete";
import { shallow } from "enzyme";

function renderGamePageComplete(args) {
  const defaultProps = {
    message: "Test Message",
    onReplay: () => {},
  };
  const props = { ...defaultProps, ...args };
  return shallow(<GamePageComplete {...props} />);
}

it("renders header and button", () => {
  const wrapper = renderGamePageComplete();
  expect(wrapper.find("h3").text()).toEqual("Game Results!!");
  expect(wrapper.find("button").length).toEqual(1);
});

it("renders message as submitted", () => {
  const wrapper = renderGamePageComplete();
  expect(wrapper.find("p").text()).toEqual("Test Message");
});
