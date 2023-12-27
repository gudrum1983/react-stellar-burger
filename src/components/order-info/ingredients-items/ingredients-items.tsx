import styles from "./ingredients-items.module.css";
import React from "react";
import {IngredientListItem} from "../ingredient-list-item/ingredient-list-item";
import {burgerIngredientsMap} from "../../../services/burger-ingredients/burger-ingredients-selector";
import {TIdIngredient} from "../../../utils/types";
import {useSelectorApp} from "../../../services/store";

type TPropsIngredientsItems = {
  componentsOrder:  Array<TIdIngredient>;
}

/**
 * скролл список ингредиентов OrderInfo
 * @param  componentsOrder - массив ингредиентов
 */
export function IngredientsItems({componentsOrder}: TPropsIngredientsItems): JSX.Element {

  const mapIngredients = useSelectorApp(burgerIngredientsMap)
  const mapCount: Map<TIdIngredient, {count: number}> = new Map()
  const listItems: Array<JSX.Element> = []

  function createListItems() {
    mapCount.forEach((value, key) => (listItems.push(
      <IngredientListItem count={value.count} idIng={key} key={key}/>
    )))
  }

  function checkItems() {
    componentsOrder.forEach((item) => {
      if (mapCount.has(item)) {
        const count = mapCount.get(item)!.count
        mapCount.set(item, {count: count + 1})
      } else {
        if (mapIngredients && mapIngredients.has(item)) {
          mapCount.set(item, {count: 1})
        }
      }
    })
  }

  checkItems();
  createListItems()

  return (
    <ul className={`${styles.containerFeed2} nonList custom-scroll`}>
      {listItems}
    </ul>
  )
}
