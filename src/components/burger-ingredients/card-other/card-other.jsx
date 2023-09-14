import React from "react";
import uuid from "react-uuid";
import {ingredientPropType, optionalFunc, selectedIngredientsPropType} from "../../../utils/prop-types";
import {Ingredient} from "../ingredient/ingredient";

const CardOther = ({currentItem, setSelectedIngredients, selectedIngredients, setShowModal}) => {

  CardOther.propTypes = {
    currentItem: ingredientPropType,
    setSelectedIngredients: optionalFunc,
    selectedIngredients: selectedIngredientsPropType,
    setShowModal: optionalFunc,
  };


  let count = 0
  const otherIngredients = selectedIngredients.other
  if (otherIngredients.length > 0) {
    count = otherIngredients.filter((itemOtherIng) => itemOtherIng.ingredient._id === currentItem._id).length
  }

  function toggleCount() {
    const numberIngredient = uuid();
    setSelectedIngredients({
      ...selectedIngredients,
      other: [...selectedIngredients.other,
        {
          numberIngredient: numberIngredient,
          ingredient: currentItem,
        }]
    })
  }

  return (
    <Ingredient currentItem={currentItem} count={count} toggleCount={toggleCount} setShowModal={setShowModal}/>
  );

};

export {
  CardOther
}