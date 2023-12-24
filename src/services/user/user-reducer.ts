import {SET_AUTH_CHECKED, SET_USER, CLEAR_USER, TUserActions} from './user-action';
import {DataUser} from "../../api/user";

export type TUserDataState = {
  user: DataUser | null,
  isAuthChecked: boolean,
}

const initialState:TUserDataState = {
    user: null,
    isAuthChecked: false,
};

//todo any delete

export const userDataReducer = (state:TUserDataState = initialState, action:TUserActions):TUserDataState => {
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