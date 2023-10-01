import React from "react";
import uuid from "react-uuid";
import {ingredientPropType} from "../../../utils/prop-types";
import {Ingredient} from "../ingredient/ingredient";
import { useSelector, useDispatch } from 'react-redux';
import {ADD_FILLING} from "../../../services/actions/choose-ingredients";

const CardOther = ({currentItem}) => {

  const selectedIngredients = useSelector(store => store.chooseIngredients)
  const dispatch = useDispatch();

  function toggleCount() {

    const numberIngredient = uuid();
    dispatch({
      type: ADD_FILLING, payload: {
        numberIngredient: numberIngredient,
        ingredient: currentItem,
      }
    })
  }

  let count = 0
  const otherIngredients = selectedIngredients.other

  if (otherIngredients) {
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