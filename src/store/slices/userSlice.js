import { createSlice } from "@reduxjs/toolkit";

const localUser = localStorage.getItem("user");
const initialState = localUser ? JSON.parse(localUser) : {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newState = { ...state, ...action.payload };
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: newState.name,
          id: newState.id,
          auth_token: newState.auth_token,
        })
      );
      return newState;
    },
    removeUser: (_) => {
      localStorage.removeItem("user");
      return {};
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
