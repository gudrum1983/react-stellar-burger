import React from "react";
import {Ingredient} from "../ingredient/ingredient";
import {ingredientPropType} from "../../../utils/prop-types";
import {useSelector} from 'react-redux';
import {bun} from "../../../services/burger-constructor/burger-constructor-selector";

const CardBuns = ({currentItem}) => {

  const top = useSelector(bun)
  const [count, setCount] = React.useState(0)

  React.useMemo(
    () => {
      setCount(currentItem._id === top?._id ? 2 : 0);
    }, [top]);

  return (
    <Ingredient currentItem={currentItem} count={count}/>
  );
};

CardBuns.propTypes = {
  currentItem: ingredientPropType,
};

export {
  CardBuns
}