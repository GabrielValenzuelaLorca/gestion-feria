import { ADD_USER, REMOVE_USER } from "../actions/action-types";

const userReducer = (state = {}, {type, payload}) => {
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