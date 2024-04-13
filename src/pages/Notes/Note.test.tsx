import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "../../store";
import Note from "./Note";

const mockNote = {
  id: "tPobEz64HsaQrGcPkbWoA",
  title: "add note test",
  description: "desc test",
  owner: "luke.skywalker@resistence.com",
  createdAt: "2024-04-13T19:39:44.009Z",
};

const mockStoreWithNotes = configureStore({
  reducer: rootReducer,
  preloadedState: {
    user: {
      value: "luke.skywalker@resistence.com",
    },
    notes: {
      notes: [
        mockNote,
        {
          id: "Tg8qT8IBMlJryYG2uWbOW",
          title: "New Note",
          description: "Description of new note",
          owner: "luke.skywalker@resistence.com",
          createdAt: "2024-04-13T21:22:00.056Z",
        },
      ],
    },
  },
});

const setup = () => {
  render(
    <Provider store={mockStoreWithNotes}>
      <Note note={mockNote} />
    </Provider>
  );
};

describe("NoteList", () => {
  test("renders note data", () => {
    setup();
    expect(screen.getByText(mockNote.title)).toBeInTheDocument();
    expect(screen.getByText(mockNote.description)).toBeInTheDocument();
    expect(screen.getByText(/Created on:/)).toBeInTheDocument();
  });

  test("enters edit mode", () => {
    setup();
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByDisplayValue(mockNote.title)).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("updates a note", () => {
    window.alert = jest.fn();
    setup();
    fireEvent.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByDisplayValue(mockNote.title), {
      target: { value: "Updated Note 2" },
    });
    fireEvent.click(screen.getByText("Save"));
    expect(window.alert).toHaveBeenCalledWith("Note updated successfully!");

    const updatedNote = mockStoreWithNotes
      .getState()
      .notes.notes.find((note) => note.id === mockNote.id);

    expect(updatedNote?.title).toBe("Updated Note 2");
  });

  test("deletes a note", () => {
    setup();
    window.confirm = jest.fn().mockReturnValue(true);

    fireEvent.click(screen.getByText("Delete"));
    expect(window.confirm).toHaveBeenCalledWith(
      "Are you sure you want to delete this note?"
    );
    // should be undefined from store
    const deletedNote = mockStoreWithNotes
      .getState()
      .notes.notes.find((n) => n.id === mockNote.id);
    const { notes } = mockStoreWithNotes.getState().notes;

    expect(deletedNote).toBe(undefined);
    expect(notes.length).toBe(1); // initialized with 2 notes
  });
});
