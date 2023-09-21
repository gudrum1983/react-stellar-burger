import React from "react";
import {Ingredient} from "../ingredient/ingredient";
import {ingredientPropType} from "../../../utils/prop-types";
import {SelectedIngredientsContext} from "../../../services/burgerConstructorContext";

const CardBuns = ({currentItem}) => {
  //получаем функцию-сеттер из контекста
  const { selectedIngredients, selectedIngredientsDispatcher } = React.useContext(SelectedIngredientsContext);
  const count = (currentItem._id === selectedIngredients.bun._id) ? 1 : 0

  function toggleCount() {
    selectedIngredientsDispatcher({type: 'defineBun', payload: currentItem})
  }

  return (
    <Ingredient currentItem={currentItem} count={count} toggleCount={toggleCount}/>
  );
};

CardBuns.propTypes = {
  currentItem: ingredientPropType,
};

export {
  CardBuns
}