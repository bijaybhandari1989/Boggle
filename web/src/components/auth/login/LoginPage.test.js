import React from "react";
import { mount } from "enzyme";
import { LoginPage } from "./LoginPage";
import { BrowserRouter as Router } from "react-router-dom";

function renderLoginPage(args) {
  const defaultProps = {
    history: {},
    login: jest.fn(),
    logout: jest.fn(),
  };

  const props = { ...defaultProps, ...args };

  return mount(
    <Router>
      <LoginPage {...props} />
    </Router>
  );
}

it("sets error when attempting to submit an empty username field", () => {
  const wrapper = renderLoginPage();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Username is required.");
});
