import { createSlice } from '@reduxjs/toolkit'

const initialState = sessionStorage.getItem('user')
  ? JSON.parse(sessionStorage.getItem('user'))
  : {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newState = {...state, ...action.payload};
      sessionStorage.setItem('user', JSON.stringify(newState));
      return newState;
    },
    removeUser: _ => {
      sessionStorage.removeItem('user');
      return {};
    },
  },
})

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer