import {configureStore} from "@reduxjs/toolkit";
import {burgerConstructorReducer} from "./burger-constructor/burger-constructor-reducer";
import {orderDetailsReducer} from "./order-details/order-details-reducer";
import {burgerIngredientsReducer} from "./burger-ingredients/burger-ingredients-reducer";
import {inputsValuesReducer} from "./inputs-values/inputs-values-reducer";
import {userDataReducer} from "./user/user-reducer";
import {errorModalReducer} from "./error-modal/error-modal-reducer";


export const store = configureStore(({
  reducer: {
    chooseIngredients: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    burgerIngredients: burgerIngredientsReducer,
    inputsValues: inputsValuesReducer,
    user: userDataReducer,
    errorModal: errorModalReducer,
  }
}));