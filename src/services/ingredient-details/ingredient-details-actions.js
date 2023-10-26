export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';

export function setIngredientDetails({proteins, calories, fat, carbohydrates, name, image_large}) {
  return {
    type: SET_INGREDIENT_DETAILS,
    details: {
      calories,
      proteins,
      fat,
      carbohydrates,
      name,
      image_large,
    }
  }
}

export function clearIngredientDetails() {
  return {
    type: CLEAR_INGREDIENT_DETAILS
  }
}