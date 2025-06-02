import React from "react";
import { fireEvent } from "@testing-library/react-native";
import LoginScreen from "../app/login";
import { renderWithProviders } from "../utils/test-utils";

describe("LoginScreen basic form", () => {
  it("renders email and password inputs and the login button", () => {
    const { getByPlaceholderText, getByTestId } = renderWithProviders(
      <LoginScreen />
    );

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByTestId("loginButton")).toBeTruthy();
  });

  it("allows typing into the email and password fields", () => {
    const { getByPlaceholderText } = renderWithProviders(<LoginScreen />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "secret123");

    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("secret123");
  });
});
