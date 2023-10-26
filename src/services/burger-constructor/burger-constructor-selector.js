import {createSelector} from "reselect";

export const selectBurgerConstructor = store => store.chooseIngredients
export const selectBun = store => store.chooseIngredients.bun
export const selectOther = store => store.chooseIngredients.other

export const selectCount = (id, type) => createSelector(
  [selectBun, selectOther],
  (currentBun, currentOther ) => {
    return (type === "bun")
      ? (id === currentBun?._id ? 2 : 0)
      : (currentOther.filter((itemOtherIng) => itemOtherIng.ingredient._id === id).length)
    }
);