import React, {FC} from "react";
import {IngredientPreview} from "../../ingredient-preview/ingredient-preview";
import {burgerIngredientsMap} from "../../../services/burger-ingredients/burger-ingredients-selector";
import {TPropsIngredients} from "../../../utils/types";
import {useSelector2} from "../../../services/store";

/**
 * Список ингредиентов в карточке заказа CardOrder
 * @param  ingredient - строка ИД ингредиента
 * @param  index - счетчик для остальных ингредиентов
 * @param  count - счетчик для остальных ингредиентов
 */
export const Ingredients: FC<TPropsIngredients> = ({ingredient, index, count}):JSX.Element | null => {

  const mapIngredients = useSelector2(burgerIngredientsMap)
  const isIngredients = mapIngredients.get(ingredient)

  if (isIngredients) {

    const {image_mobile} = isIngredients

    const marginLeft = index * 48
    const postIndex = 6 - index

    return (
      <div style={{left: marginLeft, zIndex: postIndex}} className="absolute">
        <IngredientPreview image={image_mobile} {...(!!count && {count})}></IngredientPreview>
      </div>
    )
  } else {
    return null
  }
}