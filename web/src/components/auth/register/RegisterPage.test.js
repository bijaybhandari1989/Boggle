import React from "react";
import { mount } from "enzyme";
import { RegisterPage } from "./RegisterPage";
import { BrowserRouter as Router } from "react-router-dom";

function renderRegisterPage(args) {
  const defaultProps = {
    history: {},
    register: jest.fn(),
    logout: jest.fn(),
  };

  const props = { ...defaultProps, ...args };

  return mount(
    <Router>
      <RegisterPage {...props} />
    </Router>
  );
}

it("sets error when attempting to submit an empty name field", () => {
  const wrapper = renderRegisterPage();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Name is required.");
});
