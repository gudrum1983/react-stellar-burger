import {TRootState} from "../store";

export const burgerIngredients = (store:TRootState) => store.burgerIngredients
export const burgerIngredientsArray = (store:TRootState) => store.burgerIngredients.ingredients
export const burgerIngredientsMap = (store:TRootState) => store.burgerIngredients.mapIngredients
