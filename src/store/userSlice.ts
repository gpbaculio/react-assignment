import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./index";

type UserType = string | null;

export interface UserState {
  value: UserType;
}

const initialState: UserState = {
  value: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
