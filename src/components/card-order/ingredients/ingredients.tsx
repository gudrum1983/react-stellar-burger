import React, {FC} from "react";
import {IngredientPreview} from "../../ingredient-preview/ingredient-preview";
import {burgerIngredientsMap} from "../../../services/burger-ingredients/burger-ingredients-selector";
import {TPropsIngredients} from "../../../utils/types";

/**
 * Список ингредиентов в карточке заказа CardOrder
 * @param  ingredient - строка ИД ингредиента
 * @param  index - счетчик для остальных ингредиентов
 * @param  count - счетчик для остальных ингредиентов
 */
export const Ingredients: FC<TPropsIngredients> = ({ingredient, index, count}) => {

  const mapIngredients = useSelector2(burgerIngredientsMap)

  if (!mapIngredients.has(ingredient)) {
    return null
  }

  const {image_mobile} = mapIngredients.get(ingredient)

  const marginLeft = index * 48
  const postIndex = 6 - index

  return (
    <div style={{left: marginLeft, zIndex: postIndex}} className="absolute">
      <IngredientPreview image={image_mobile} {...(!!count && {count})}></IngredientPreview>
    </div>
  )
}