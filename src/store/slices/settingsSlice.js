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
      state = { ...initialState };
      action.payload.forEach((activity) => {
        ({
          storyCreation: () => (state.canCreate = true),
          storyEdition: () => (state.canEdit = true),
          storyAssign: () => (state.canAssign = true),
          sprint: () => (state.sprints[activity.name] = true),
        })[activity.type]();
      });
      return state;
    },
  },
});

export const { updateSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
