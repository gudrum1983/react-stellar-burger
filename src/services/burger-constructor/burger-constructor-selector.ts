import {createSelector} from "reselect";
import {TRootState} from "../store";
import {TIdIngredient, TIngredient, TTypeIngredients} from "../../utils/types";

export const selectBurgerConstructor = (store:TRootState) => store.chooseIngredients
export const selectBun = (store:TRootState) => store.chooseIngredients.bun
export const selectOther = (store:TRootState) => store.chooseIngredients.other

export const selectCount = (id:TIdIngredient, type:TTypeIngredients) => createSelector(
  [selectBun, selectOther],
  (currentBun:TIngredient, currentOther:Array<TIngredient> ) => {
    return (type === "bun")
      ? (id === currentBun?._id ? 2 : 0)
      : (currentOther.filter((itemOtherIng) => itemOtherIng.ingredient._id === id).length)
    }
);