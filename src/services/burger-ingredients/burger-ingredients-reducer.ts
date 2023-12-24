import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS, TIngredientsActions,
  TMapIngredients,
} from "./burger-ingredients-actions";

import {TIngredient} from "../../utils/types";

export type TIngredientsState = {
  isLoading: boolean,
  hasError: boolean,
  ingredients: Array<TIngredient>,
  mapIngredients: TMapIngredients
}


const initialState:TIngredientsState = {
  isLoading: false,
  hasError: false,
  ingredients: [],
  mapIngredients: new Map
};

export const burgerIngredientsReducer = (state:TIngredientsState = initialState, action:TIngredientsActions):TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state,
        hasError: false,
        ingredients: action.ingredients,
        mapIngredients: action.mapIngredients,
        isLoading: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state,
        hasError: true,
        isLoading: false };
    }
    default: {
      return state;
    }
  }
};