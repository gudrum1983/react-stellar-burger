import React from "react";
import {IngredientPreview} from "../../ingredient-preview/ingredient-preview";
import {useSelector} from "react-redux";
import {burgerIngredientsMap} from "../../../services/burger-ingredients/burger-ingredients-selector";

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
      <IngredientPreview image={image_mobile} ingredient={ingredient} count={count}></IngredientPreview>
    </div>
  )
}