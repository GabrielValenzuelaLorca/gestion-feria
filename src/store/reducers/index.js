import { combineReducers } from 'redux';
import storiesReducer from './storiesReducer';

const rootReducer = combineReducers({
    storiesReducer,
})

export default rootReducer;