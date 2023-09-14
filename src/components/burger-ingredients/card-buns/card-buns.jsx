import React from "react";
import {Ingredient} from "../ingredient/ingredient";
import {ingredientPropType, optionalFunc, selectedIngredientsPropType} from "../../../utils/prop-types";

const CardBuns = ({currentItem, setSelectedIngredients, selectedIngredients, setShowModal}) => {

  CardBuns.propTypes = {
    currentItem: ingredientPropType,
    setSelectedIngredients: optionalFunc,
    selectedIngredients: selectedIngredientsPropType,
    setShowModal: optionalFunc,
  };

  const count = (currentItem._id === selectedIngredients.bun._id) ? 1 : 0

  function toggleCount() {
    setSelectedIngredients({
      ...selectedIngredients,
      bun: currentItem,
    });
  }

  return (
    <Ingredient currentItem={currentItem} count={count} toggleCount={toggleCount} setShowModal={setShowModal}/>
  );
};

export {
  CardBuns
}