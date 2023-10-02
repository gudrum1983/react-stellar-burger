import {combineReducers} from 'redux';
import {chooseIngredientsReducer} from "./burger-constructor";
import {showModalReducer} from "./modal";
import {ingredientDetailsReducer} from "./ingredient-details";
import {orderDetailsReducer} from "./order-details";

export const rootReducer = combineReducers({
  chooseIngredients: chooseIngredientsReducer,
  showModal: showModalReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
});