import { createSlice } from "@reduxjs/toolkit";

type AppState = {
  mode: "light" | "dark";
};

const initialState: AppState = {
  mode: "light",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleMode } = appSlice.actions;
export const selectMode = (state: any) => state.app?.mode ?? "light";
export default appSlice.reducer;
