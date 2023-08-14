import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const periodSlice = createSlice({
  name: "period",
  initialState,
  reducers: {
    addPeriod: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addPeriod } = periodSlice.actions;

export default periodSlice.reducer;
