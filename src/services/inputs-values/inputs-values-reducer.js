import {
  USER_NAME,
  PASSWORD,
  EMAIL,
  CHECKED_TOKEN
} from "./inputs-values-actions";

const initialState = {
  userName: '',
  password: '',
  email: '',
  checkedCode: '',
};

export function inputsValuesReducer(state = initialState, action) {
  switch (action.type) {
    case USER_NAME:
      return {
        ...state,
        userName: action.payload
      };
    case PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    case EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case CHECKED_TOKEN:
      return {
        ...state,
        checkedCode: action.payload
      };
    default: {
      return state;
    }
  }
}