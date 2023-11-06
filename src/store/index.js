import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import storyReducer from "./slices/storySlice";
import periodSlice from "./slices/periodSlice";
import activitySlice from "./slices/activitySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    stories: storyReducer,
    period: periodSlice,
    activity: activitySlice,
  },
});

export default store;
