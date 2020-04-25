import React from "react";
import RegisterForm from "./RegisterForm";
import { shallow } from "enzyme";

function renderRegisterForm(args) {
  const defaultProps = {
    onSubmit: () => {},
    onChange: () => {},
    register: {},
    saving: false,
    errors: {},
  };
  const props = { ...defaultProps, ...args };
  return shallow(<RegisterForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderRegisterForm();
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h1").text()).toEqual("Register");
});

it('labels submit buttons as "Register" when not submitting', () => {
  const wrapper = renderRegisterForm();
  expect(wrapper.find("button").text()).toBe("Register");
});

it('labels submit button as "Registering..." when submitting', () => {
  const wrapper = renderRegisterForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Registering...");
});
