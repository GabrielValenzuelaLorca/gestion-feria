import { combineReducers } from 'redux';
import storiesReducer from './storiesReducer';

const rootReducer = combineReducers({
    stories: storiesReducer,
})

export default rootReducer;