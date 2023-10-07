import {getBurgerIngredientsData} from "../../api/config";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

const sortedData = (data) => data.toSorted((a, b) => a._id > b._id ? 1 : -1)

export function getIngredientsSuccess(ingredients) {
  return {
    type: GET_INGREDIENTS_SUCCESS, ingredients: sortedData(ingredients)
  }
}

export function getIngredientsFailed() {
  return {
    type: GET_INGREDIENTS_FAILED
  }
}

export function getIngredientsRequest() {
  return {
    type: GET_INGREDIENTS_REQUEST
  }
}

export function loadBurgerIngredients() {
  return function(dispatch) {
    dispatch(getIngredientsRequest());
    getBurgerIngredientsData()
      .then(res => {
        if (res && res.success) {
          dispatch(getIngredientsSuccess(res.data));
        } else {
          dispatch(getIngredientsFailed());
        }
      })
        .catch(() => {
          dispatch(getIngredientsFailed());
        })
    };
}