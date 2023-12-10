import React from "react";
import {IngredientPreview} from "../../ingredient-preview/ingredient-preview";
import {useSelector} from "react-redux";
import {burgerIngredientsMap} from "../../../services/burger-ingredients/burger-ingredients-selector";
import {numOptional, stringOptional} from "../../../utils/prop-types";

/**
 * Список ингредиентов в карточке заказа CardOrder
 * @param {string} ingredient - строка ИД ингредиента
 * @param {number} index - счетчик для остальных ингредиентов
 * @param {number} count - счетчик для остальных ингредиентов
 */
export function Ingredients({ingredient, index, count = null}) {

  const mapIngredients = useSelector(burgerIngredientsMap)

  if (!mapIngredients.has(ingredient)) {
    return null
  }

  const {image_mobile} = mapIngredients.get(ingredient)

  const marginLeft = index * 48
  const postIndex = 6 - index

  return (
    <div style={{left: marginLeft, zIndex: postIndex}} className="absolute">
      <IngredientPreview image={image_mobile} {...(count && {count})}></IngredientPreview>
    </div>
  )
}

Ingredients.propTypes = {
  ingredient: stringOptional,
  count: numOptional,
  index: numOptional,
}