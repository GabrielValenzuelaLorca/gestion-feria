import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import storyReducer from './slices/storySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    story: storyReducer,
  },
});

export default store;