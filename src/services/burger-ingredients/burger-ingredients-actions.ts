import {getIngredients} from "../../api-config/api-burger-ingredients";
import {AppThunk} from "../store";
import {TIngredient} from "../../utils/types";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export type TMapIngredients = Map<string, TIngredient>


type TGetIngredientsSuccess = {
  type: typeof GET_INGREDIENTS_SUCCESS,
  ingredients: Array<TIngredient>,
  mapIngredients: TMapIngredients,
}

type TGetIngredientsFailed = {
  type: typeof GET_INGREDIENTS_FAILED
}

type TGetIngredientsRequest = {
  type: typeof GET_INGREDIENTS_REQUEST
}

export type TIngredientsActions = TGetIngredientsSuccess | TGetIngredientsFailed | TGetIngredientsRequest;

const sortedData = (data:Array<TIngredient>):Array<TIngredient> => data.sort((a:TIngredient, b:TIngredient) => a._id > b._id ? 1 : -1)

const mapIngredients = (sortedDataArr:Array<TIngredient>) => {
  const map:TMapIngredients = new Map()
  sortedDataArr.forEach((element) => {
    map.set(element._id, element);
  });
  return map
}

export function getIngredientsSuccess(ingredients:Array<TIngredient>):TGetIngredientsSuccess {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: sortedData(ingredients),
    mapIngredients: mapIngredients(ingredients)
  }
}

export function getIngredientsFailed():TGetIngredientsFailed {
  return {
    type: GET_INGREDIENTS_FAILED
  }
}

export function getIngredientsRequest():TGetIngredientsRequest {
  return {
    type: GET_INGREDIENTS_REQUEST
  }
}

export function loadBurgerIngredients(): AppThunk {
  return function (dispatch) {
    dispatch(getIngredientsRequest());
    getIngredients()
      .then(res => {
        dispatch(getIngredientsSuccess(res.data));
      })
      .catch(() => {
        dispatch(getIngredientsFailed());
      })
  };
}