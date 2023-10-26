import {SET_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS} from "./ingredient-details-actions";

const initialState = {
  details: null,
};

export function ingredientDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS:
      return {
        details: action.details,
      };
    case
    CLEAR_INGREDIENT_DETAILS:
      return {
        initialState,
      };
    default: {
      return state;
    }
  }
}