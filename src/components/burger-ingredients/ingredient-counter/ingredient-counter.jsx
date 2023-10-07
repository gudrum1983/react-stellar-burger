import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {optionalString} from "../../../utils/prop-types";
import {useSelector} from "react-redux";
import {selectCount} from "../../../services/burger-constructor/burger-constructor-selector";

export function IngredientCounter({id, type}) {
  const count = useSelector(selectCount(id, type))
  return (count > 0) ? <Counter count={count} size="default"/> : null
}

IngredientCounter.propTypes = {
  id: optionalString,
  type: optionalString,
};