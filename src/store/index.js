import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import storyReducer from "./slices/storySlice";
import periodSlice from "./slices/periodSlice";
import activitiesSlice from "./slices/activitiesSlice";
import settingsSlice from "./slices/settingsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    stories: storyReducer,
    period: periodSlice,
    activities: activitiesSlice,
    settings: settingsSlice,
  },
});

export default store;
