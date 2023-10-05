import React from "react";
import {ingredientPropType} from "../../../utils/prop-types";
import {Ingredient} from "../ingredient/ingredient";
import { useSelector } from 'react-redux';

const CardOther = ({currentItem}) => {

  const selectedIngredients = useSelector(store => store.chooseIngredients)

  let count = 0
  const otherIngredients = selectedIngredients.other

  if (otherIngredients) {
    count = otherIngredients.filter((itemOtherIng) => itemOtherIng.ingredient._id === currentItem._id).length
  }


  return (
    <Ingredient currentItem={currentItem} count={count}/>
  );

};

CardOther.propTypes = {
  currentItem: ingredientPropType,
};

export {
  CardOther
}