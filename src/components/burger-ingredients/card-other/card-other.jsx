import React from "react";
import uuid from "react-uuid";
import {ingredientPropType} from "../../../utils/prop-types";
import {Ingredient} from "../ingredient/ingredient";
import {SelectedIngredientsContext} from "../../../services/burgerConstructorContext";

const CardOther = ({currentItem}) => {

  //получаем функцию-сеттер из контекста
  const { selectedIngredients, selectedIngredientsDispatcher} = React.useContext(SelectedIngredientsContext);

  function toggleCount() {

    const numberIngredient = uuid();
    selectedIngredientsDispatcher({
      type: 'addOther', payload: {
        numberIngredient: numberIngredient,
        ingredient: currentItem,
      }
    })
  }

  let count = 0
  const otherIngredients = selectedIngredients.other

  if (otherIngredients.length > 0) {
    count = otherIngredients.filter((itemOtherIng) => itemOtherIng.ingredient._id === currentItem._id).length
  }



  return (
    <Ingredient currentItem={currentItem} count={count} toggleCount={toggleCount}/>
  );

};

CardOther.propTypes = {
  currentItem: ingredientPropType,
};

export {
  CardOther
}