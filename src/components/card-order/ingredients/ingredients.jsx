import React from "react";
import {IngredientPreview} from "../ingredient-preview/ingredient-preview";
import {useSelector} from "react-redux";
import {burgerIngredientsMap} from "../../../services/burger-ingredients/burger-ingredients-selector";

export function Ingredients({itemIng, index, count = null}) {

  const mapIngredients = useSelector(burgerIngredientsMap)
  const {image_mobile} = mapIngredients.get(itemIng)


  const marginLeft = index * 48
  const postIndex = 6 - index

  return (
    <div style={{left: marginLeft, zIndex: postIndex}} className="absolute">
      <IngredientPreview image_mobile={image_mobile} itemIng={itemIng} count={count}></IngredientPreview>
    </div>
  )

}