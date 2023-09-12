import React from "react";
import {Ingredient} from "../ingredient/ingredient";
import {ingredientPropType, optionalFunc, optionalObject, optionalString} from "../../../utils/prop-types";

const CardBuns = ({currentItem, setSelectedIngredients, selectedIngredients}) => {

  CardBuns.propTypes = {
    currentItem: ingredientPropType,
    defaultBunId: optionalString,
    setSelectedIngredients: optionalFunc,
    selectedIngredients: optionalObject,
  };

  const count = (currentItem._id === selectedIngredients.bun._id) ? 1 : 0

  function toggleCount() {
    setSelectedIngredients({
      ...selectedIngredients,
      bun: currentItem,
    });
  }

  return (
    <Ingredient currentItem={currentItem} count={count} toggleCount={toggleCount}/>
  );
};

export {
  CardBuns
}