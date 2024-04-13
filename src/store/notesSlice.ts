// src/features/notes/notesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import { RootState } from "./index";

export interface Note {
  id: string;
  title: string;
  description: string;
  owner: string;
  createdAt: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: {
      reducer: (state, action: PayloadAction<Note>) => {
        state.notes.push(action.payload);
      },
      prepare: (title: string, description: string, owner: string) => ({
        payload: {
          id: nanoid(),
          title,
          description,
          owner,
          createdAt: new Date().toISOString(),
        },
      }),
    },
    editNote: (
      state,
      action: PayloadAction<{
        id: string;
        title?: string;
        description?: string;
        owner?: string;
      }>
    ) => {
      const { id, title, description } = action.payload;
      const existingNote = state.notes.find((note) => note.id === id);
      if (existingNote) {
        if (title) existingNote.title = title;
        if (description) existingNote.description = description;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, deleteNote, editNote } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;

export default notesSlice.reducer;
