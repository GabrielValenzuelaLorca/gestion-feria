import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import storyReducer from "./slices/storySlice";
import periodSlice from "./slices/periodSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    story: storyReducer,
    period: periodSlice,
  },
});

export default store;
