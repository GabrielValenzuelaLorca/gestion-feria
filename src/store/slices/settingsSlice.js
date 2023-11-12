import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  canEdit: false,
  canCreate: false,
  canAssign: false,
  sprints: {
    MVP: false,
    "Sprint 1": false,
    "Sprint 2": false,
    "Sprint 3": false,
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      action.payload.forEach((activity) => {
        const operations = {
          storyCreation: () => (state.canCreate = true),
          storyEdition: () => (state.canEdit = true),
          storyAssign: () => (state.canAssign = true),
          sprint: () => (state.sprints[activity.name] = true),
        };
        operations[activity.type]();
      });
    },
  },
});

export const { updateSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
