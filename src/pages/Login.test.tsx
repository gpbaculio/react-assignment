import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Login from "./Login";
import { rootReducer } from "../store";

jest.mock("../data/users.json", () => [
  { username: "test@user.com", password: "password123" },
]);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useNavigate: () => jest.fn(),
}));

const store = configureStore({
  reducer: rootReducer,
});

const setup = () => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
};

describe("Login Component", () => {
  test("renders login form", () => {
    setup();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });
  test("handles invalid login", async () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "wrong@user.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByText("Sign in"));

    expect(
      await screen.findByText("Invalid username or password")
    ).toBeInTheDocument();
  });

  test("submits form and navigates on successful login", async () => {
    window.alert = jest.fn(); // Mock alert
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => navigate);

    setup();

    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "test@user.com" }, // Assume this is correct based on your users.json
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" }, // Assume this is correct based on your users.json
    });
    fireEvent.click(screen.getByText("Sign in"));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Logged in successfully!");
    });
    expect(store.getState().user.value).toEqual("test@user.com");
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
