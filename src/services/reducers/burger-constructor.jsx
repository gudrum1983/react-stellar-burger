import {CHOOSE_BUN, RESET_ORDER, DELETE_FILLING, ADD_FILLING} from "../actions/burger-constructor";

//Создать функцию reducers
/*export function reducerSelectedIngredients(state, action) {
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
}*/

const initialState = {
  bun: null,
  other: [],
};


//Создать функцию reducers
export function chooseIngredientsReducer(state = initialState, action) {
  switch (action.type) {
    case CHOOSE_BUN:
      return {
        ...state,
        bun: action.payload
      };
    case ADD_FILLING:
      return {
        ...state,
        other: [...state.other,
          {
            numberIngredient: action.payload.numberIngredient,
            ingredient: action.payload.ingredient,
          }]
      };
    case RESET_ORDER:
      return {
        ...state,
        bun: null,
        other: [],
      };
    case DELETE_FILLING:
      return {
        ...state,
        other: [...state.other].filter(item => item.numberIngredient !== action.id),
      };
    default: {
      return state;
    }
  }
}
