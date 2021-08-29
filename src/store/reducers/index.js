import { combineReducers } from 'redux';
import homeReducer from './exampleReducer'
import storiesReducer from './storiesReducer';

const rootReducer = combineReducers({
    homeReducer,
    storiesReducer,
})

export default rootReducer;