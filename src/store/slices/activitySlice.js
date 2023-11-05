import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    addActivity: (_, action) => {
      return action.payload;
    },
  },
});

export const { addActivity } = activitySlice.actions;

export default activitySlice.reducer;
