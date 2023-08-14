import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newState = { ...state, ...action.payload };
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          name: newState.name,
          id: newState.id,
        })
      );
      return newState;
    },
    removeUser: (_) => {
      sessionStorage.removeItem("user");
      return {};
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
