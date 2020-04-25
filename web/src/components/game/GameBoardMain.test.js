import React from "react";
import GameBoardMain from "./GameBoardMain";
import { shallow } from "enzyme";

function renderGameBoardMain(args) {
  const defaultProps = {
    gameBoard: [],
    onDiceClick: () => {},
    onSubmit: () => {},
    onChange: () => {},
    onReset: () => {},
    formdata: {},
    saving: false,
    errors: {},
  };
  const props = { ...defaultProps, ...args };
  return shallow(<GameBoardMain {...props} />);
}

it("contains reset and submit buttons Link", () => {
  const wrapper = renderGameBoardMain();
  const link = wrapper.find("button").length;
  expect(link).toEqual(2);
  expect(wrapper.find("button").first().text()).toBe("Reset");
  expect(wrapper.find("button").last().text()).toBe("Submit");
});

it('labels submit buttons as "Submit" when not submitting', () => {
  const wrapper = renderGameBoardMain();
  expect(wrapper.find("button").last().text()).toBe("Submit");
});

it('labels submit button as "Time Out" when submitting', () => {
  const wrapper = renderGameBoardMain({ saving: true });
  expect(wrapper.find("button").last().text()).toBe("Time Out");
});
