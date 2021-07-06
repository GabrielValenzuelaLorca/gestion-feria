import { combineReducers } from 'redux';
import homeReducer from './exampleReducer'

const rootReducer = combineReducers({
    homeReducer,
    // stats,
})

export default rootReducer;