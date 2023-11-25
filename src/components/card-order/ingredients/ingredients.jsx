import React from "react";
import {IngredientPreview} from "../ingredient-preview/ingredient-preview";

export function Ingredients({itemIng, index, count = null}) {

  const marginLeft = index * 48
  const postIndex = 6 - index

  return (
    <div style={{left: marginLeft, zIndex: postIndex}} className="absolute">
      <IngredientPreview itemIng={itemIng} count={count}></IngredientPreview>
    </div>
  )

}