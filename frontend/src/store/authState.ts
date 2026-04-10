import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  username: string | null;
  password: string | null;
};

const initialState: AuthState = {
  username: null,
  password: null,
};

const authState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ username: string; password: string }>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    clearCredentials: (state) => {
      state.username = null;
      state.password = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authState.actions;
export const selectAuth = (state: any) => state.auth;
export default authState.reducer;