import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

import AddNoteForm from "./AddNoteForm";
import { mockStore } from "../../App.test";

const setupScreen = () => {
  render(
    <Provider store={mockStore}>
      <AddNoteForm />
    </Provider>
  );
};

describe("AddNoteForm", () => {
  it("should render button to open modal", () => {
    setupScreen();
    expect(
      screen.getByRole("button", { name: "Add Note" })
    ).toBeInTheDocument();
  });

  it("opens the modal on button click", () => {
    setupScreen();
    fireEvent.click(screen.getByText("Add Note"));
    expect(screen.getByText("Add a Note")).toBeInTheDocument();
  });

  it("closes the modal when clicking the close button", () => {
    setupScreen();
    fireEvent.click(screen.getByText("Add Note"));
    fireEvent.click(screen.getByText("X"));
    expect(screen.queryByText("Add a Note")).not.toBeInTheDocument();
  });

  it("submits the form with title and description", async () => {
    setupScreen();

    fireEvent.click(screen.getByText("Add Note"));
    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Note" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Description of new note" },
    });

    window.alert = jest.fn();
    userEvent.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Note added successfully!");
    });
    const notesState = mockStore.getState().notes;
    expect(notesState.notes).toHaveLength(1);
  });

  it("displays form required field errors if empty", async () => {
    setupScreen();
    fireEvent.click(screen.getByText("Add Note"));
    fireEvent.submit(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
    });
  });
});
