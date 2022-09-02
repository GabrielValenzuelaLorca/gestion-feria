import { ADD_USER, REMOVE_USER } from "../actions/action-types";

const defaultState = sessionStorage.getItem('user')
  ? JSON.parse(sessionStorage.getItem('user')) 
  : {};

const userReducer = (state = defaultState, {type, payload}) => {
  switch (type){
    case REMOVE_USER:
      return {};

    case ADD_USER:
      return payload;
      
    default:
      return state;
  }
}

export default userReducer;