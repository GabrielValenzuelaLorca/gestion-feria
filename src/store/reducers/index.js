import { combineReducers } from 'redux';
import storiesReducer from './storiesReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    stories: storiesReducer,
    user: userReducer,
})

export default rootReducer;