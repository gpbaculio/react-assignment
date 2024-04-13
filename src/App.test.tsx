import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// Mock store setup
export const mockStore = configureStore({
  reducer: rootReducer,
  preloadedState: {
    user: {
      value: "luke.skywalker@resistence.com",
    },
  },
});

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <Provider store={mockStore}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  const linkElement = screen.getByText("Agridence Notes App");
  expect(linkElement).toBeInTheDocument();
});
