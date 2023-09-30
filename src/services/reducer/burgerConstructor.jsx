
//Создать функцию reducer
export function reducerSelectedIngredients(state, action) {
  switch (action.type) {
    case "defineBun":
      return {
        ...state,
        bun: action.payload
      };
    case "addOther":
      return {
        ...state,
        other: [...state.other,
          {
            numberIngredient: action.payload.numberIngredient,
            ingredient: action.payload.ingredient,
          }]
      };
    case "resetOnlyOther":
      return {
        ...state,
        other: [],
      };
    case "replaceOther":
      return {
        ...state,
        other: action.payload
      };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}