import React from "react";
import { render } from "@testing-library/react-native";
import TabLayout from "./_layout";
import * as reactRedux from "react-redux";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("expo-router", () => ({
  Redirect: (props: any) => null,
}));

describe("TabLayout", () => {
  it("renders Redirect when no token or user", () => {
    const useSelectorMock = reactRedux.useSelector as unknown as jest.Mock;

    useSelectorMock.mockReturnValueOnce(null).mockReturnValueOnce(null);

    const { queryByTestId } = render(<TabLayout />);

    expect(queryByTestId("tab-layout-root")).toBeNull();

    useSelectorMock.mockReset();
  });
});
