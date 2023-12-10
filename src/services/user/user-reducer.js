import { SET_AUTH_CHECKED, SET_USER, CLEAR_USER } from './user-action';

const initialState = {
    user: null,
    isAuthChecked: false,
};

export const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      }
    default:
      return state;    
  }
};