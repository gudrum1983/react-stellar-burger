import {combineReducers} from 'redux';
import {chooseIngredientsReducer} from "./burgerConstructor";

export const rootReducer = combineReducers({
  chooseIngredients: chooseIngredientsReducer,
  //cart: cartReducer,
});