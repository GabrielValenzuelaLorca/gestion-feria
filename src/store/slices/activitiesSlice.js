import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const activitiesSlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setActivities: (_, action) => {
      return action.payload;
    },
  },
});

export const { setActivities } = activitiesSlice.actions;

export default activitiesSlice.reducer;
