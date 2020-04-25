import React from "react";
import MainLayout from "./MainLayout";
import { shallow } from "enzyme";

function renderMainLayout(args) {
  const defaultProps = {
    children: [],
  };

  const props = { ...defaultProps, ...args };

  return shallow(<MainLayout {...props} />);
}

it("renders header", () => {
  const wrapper = renderMainLayout();
  expect(wrapper.find("h3").text()).toEqual("Boggle");
});

it("contains 3 NavLinks via shallow", () => {
  const wrapper = renderMainLayout();
  const numLinks = wrapper.find("NavLink").length;
  expect(numLinks).toEqual(2);
});
