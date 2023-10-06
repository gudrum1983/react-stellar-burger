import {
  CHOOSE_BUN,
  CLEAR_BURGER_CONSTRUCTOR,
  DELETE_FILLING,
  ADD_FILLING,
  MOVE_FILLING
} from "./burger-constructor-actions";

const initialState = {
  bun: null,
  other: [],
};


export function burgerConstructorReducer(state = initialState, action) {
  switch (action.type) {
    case CHOOSE_BUN:
      return {
        ...state,
        bun: action.payload
      };
    case ADD_FILLING:
      return {
        ...state,
        other: [...state.other,
          {
            numberIngredient: action.payload.numberIngredient,
            ingredient: action.payload.ingredient,
          }]
      };
    case CLEAR_BURGER_CONSTRUCTOR:
      return initialState;
    case DELETE_FILLING:
      return {
        ...state,
        other: [...state.other].filter(item => item.numberIngredient !== action.payload),
      };
    case MOVE_FILLING:
      return {
        ...state,
        other: action.payload,
      };
    default: {
      return state;
    }
  }
}
