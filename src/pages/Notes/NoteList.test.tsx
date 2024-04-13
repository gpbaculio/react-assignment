import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "../../store";
import NoteList from "./NoteList";

// mock with 2 notes
const mockStoreWithNotes = configureStore({
  reducer: rootReducer,
  preloadedState: {
    user: {
      value: "luke.skywalker@resistence.com",
    },
    notes: {
      notes: [
        {
          id: "tPobEz64HsaQrGcPkbWoA",
          title: "add note test",
          description: "desc test",
          owner: "luke.skywalker@resistence.com",
          createdAt: "2024-04-13T19:39:44.009Z",
        },
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

const setupScreenWithList = () => {
  render(
    <Provider store={mockStoreWithNotes}>
      <NoteList />
    </Provider>
  );
};

const mockStoreWithoutNotes = configureStore({
  reducer: rootReducer,
  preloadedState: {
    user: {
      value: "luke.skywalker@resistence.com",
    },
    notes: {
      notes: [],
    },
  },
});

const setupScreenWithoutList = () => {
  render(
    <Provider store={mockStoreWithoutNotes}>
      <NoteList />
    </Provider>
  );
};

describe("NoteList", () => {
  test("renders note list correctly", () => {
    setupScreenWithList();
    expect(screen.getByText("add note test")).toBeInTheDocument();
    expect(screen.getByText("New Note")).toBeInTheDocument();
  });
  test("displays message when no notes are available", () => {
    setupScreenWithoutList();
    expect(screen.getByText("No notes available.")).toBeInTheDocument();
  });
});
