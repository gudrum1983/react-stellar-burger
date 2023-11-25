import styles from "./ingredients-items.module.css";
import React from "react";
import {IngredientListItem} from "../ingredient-list-item/ingredient-list-item";

export function IngredientsItems({componentsOrder}) {

  return (
    <ul className={`${styles.containerFeed2} nonList custom-scroll`}>
      {componentsOrder.map((item, index) => (

          <IngredientListItem idIng={item} index={index}/>

      ))}
    </ul>
  )
}