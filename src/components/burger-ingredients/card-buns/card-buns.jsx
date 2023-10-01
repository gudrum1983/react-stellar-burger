import React from "react";
import {Ingredient} from "../ingredient/ingredient";
import {ingredientPropType} from "../../../utils/prop-types";
//import {SelectedIngredientsContext} from "../../../services/burgerConstructorContext";
import { useSelector, useDispatch } from 'react-redux';
import {CHOOSE_BUN} from "../../../services/actions/choose-ingredients";

const CardBuns = ({currentItem}) => {


  const selectedIngredients = useSelector(store => store.chooseIngredients)
  const dispatch = useDispatch();
  //получаем функцию-сеттер из контекста
  //const { selectedIngredients, selectedIngredientsDispatcher } = React.useContext(SelectedIngredientsContext);
  const count = (currentItem._id === selectedIngredients.bun?._id) ? 2 : 0
  //const count1 = !!(selectedIngredients.bun) ?
/*  function toggleCount() {
    selectedIngredientsDispatcher({type: 'defineBun', payload: currentItem})
  }*/

  function toggleCount() {
    dispatch({type: CHOOSE_BUN, payload: currentItem})
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