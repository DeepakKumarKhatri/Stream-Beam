import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
//   displayName: "",
  email: "",
//   bio: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
    //   state.displayName = action.payload.displayName;
      state.email = action.payload.email;
    //   state.bio = action.payload.bio;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      return initialState;
    },
    updateBio: (state, action) => {
      state.bio = action.payload;
    },
  },
});

export const { setUser, clearUser, updateBio } = userSlice.actions;

export default userSlice.reducer;
