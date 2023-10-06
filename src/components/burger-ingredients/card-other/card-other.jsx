import React from "react";
import {ingredientPropType} from "../../../utils/prop-types";
import {Ingredient} from "../ingredient/ingredient";
import {useSelector} from 'react-redux';
import {other} from "../../../services/burger-constructor/burger-constructor-selector";

const CardOther = ({currentItem}) => {

  const filling = useSelector(other)
  const [count, setCount] = React.useState(0)

  const filterIngredients = filling.filter((itemOtherIng) => itemOtherIng.ingredient._id === currentItem._id).length

  React.useMemo(
    () => {
      setCount(filterIngredients)
    }, [filterIngredients]);

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