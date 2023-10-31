import {configureStore} from "@reduxjs/toolkit";
import {burgerConstructorReducer} from "./burger-constructor/burger-constructor-reducer";
import {ingredientDetailsReducer} from "./ingredient-details/ingredient-details-reducer";
import {orderDetailsReducer} from "./order-details/order-details-reducer";
import {burgerIngredientsReducer} from "./burger-ingredients/burger-ingredients-reducer";
import {userInputsReducer} from "./user-inputs/user-inputs-reducer";
import {userReducer} from "./user";


export const store = configureStore(({
  reducer: {
    chooseIngredients: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    burgerIngredients:burgerIngredientsReducer,
    userInputs: userInputsReducer,
    user: userReducer,
  }
}));