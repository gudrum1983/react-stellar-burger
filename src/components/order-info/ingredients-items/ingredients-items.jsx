import styles from "./ingredients-items.module.css";
import React from "react";
import {IngredientListItem} from "../ingredient-list-item/ingredient-list-item";
import {useSelector} from "react-redux";
import {burgerIngredientsMap} from "../../../services/burger-ingredients/burger-ingredients-selector";
import {arrayStringOptional} from "../../../utils/prop-types";

/**
 * скролл список ингредиентов OrderInfo
 * @param {array} componentsOrder - массив ингредиентов
 */
export function IngredientsItems({componentsOrder}) {

  const mapIngredients = useSelector(burgerIngredientsMap)
  const mapCount = new Map

  const filteredComponentsOrder = []

  function checkItems() {
    componentsOrder.forEach((item) => {
      if (mapCount.has(item)) {
        const {count, ...value} = mapCount.get(item)
        mapCount.set(item, {...value, count: count + 1})
      } else {
        if (mapIngredients.has(item)) {
          mapCount.set(item, {count: 1})
          filteredComponentsOrder.push(item)
        }
      }
    })
  }

  checkItems()

  const checkItem = (item) => {
    return mapIngredients.has(item)
  }

  return (
    <ul className={`${styles.containerFeed2} nonList custom-scroll`}>
      {filteredComponentsOrder.map((item, index) => (
        checkItem && <IngredientListItem count={mapCount} idIng={item} index={index} key={index}/>
      ))}
    </ul>
  )
}

IngredientsItems.propTypes = {
  componentsOrder: arrayStringOptional,
}