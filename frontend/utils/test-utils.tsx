import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react-native";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/store/auth/authSlice";
import userReducer from "../app/store/user/userSlice";

export function renderWithProviders(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}
