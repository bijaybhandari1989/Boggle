import React from "react";
import LoginForm from "./LoginForm";
import { shallow } from "enzyme";

function renderLoginForm(args) {
  const defaultProps = {
    onSave: () => {},
    onChange: () => {},
    login: {},
    saving: false,
    errors: {},
  };

  const props = { ...defaultProps, ...args };
  return shallow(<LoginForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderLoginForm();
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h1").text()).toEqual("Login");
});

it('labels submit buttons as "Save" when not submitting', () => {
  const wrapper = renderLoginForm();
  expect(wrapper.find("button").text()).toBe("Log in");
});

it('labels submit button as "Login..." when submitting', () => {
  const wrapper = renderLoginForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Login...");
});
