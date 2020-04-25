import React from "react";
import LoginLayout from "./LoginLayout";
import { shallow } from "enzyme";

function renderLoginLayout(args) {
  const defaultProps = {
    children: [],
  };

  const props = { ...defaultProps, ...args };

  return shallow(<LoginLayout {...props} />);
}

it("renders header", () => {
  const wrapper = renderLoginLayout();
  expect(wrapper.find("div").length).toEqual(1);
});
