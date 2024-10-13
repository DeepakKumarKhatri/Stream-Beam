import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTheme: "light",
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setThemeRedux: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setThemeRedux } = systemSlice.actions;

export default systemSlice.reducer;
