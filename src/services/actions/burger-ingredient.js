import {getIngredientsData} from "../../api/config";
import {OPEN_MODAL} from "./modal";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

const sortedData = (data) => data.toSorted((a, b) => a._id > b._id ? 1 : -1)

export function getBurgerIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsData()
      .then(res => {
        if (res && res.success) {
          dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients: sortedData(res.data)});
        } else {
          dispatch({type: OPEN_MODAL, payload: {type: "error"}});
          dispatch({type: GET_INGREDIENTS_FAILED});
        }
      })
        .catch(() => {
          dispatch({type: OPEN_MODAL, payload: {type: "error"}});
          dispatch({type: GET_INGREDIENTS_FAILED});
        })
    };
}