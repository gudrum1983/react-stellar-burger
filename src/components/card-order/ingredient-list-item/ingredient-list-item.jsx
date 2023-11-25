import {useSelector} from "react-redux";
import {burgerIngredientsArray} from "../../../services/burger-ingredients/burger-ingredients-selector";
import styles from "./ingredient-list-item.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {IngredientPreview} from "../ingredient-preview/ingredient-preview";


export function IngredientListItem({idIng, index}) {

  const ingredients = useSelector(burgerIngredientsArray)
  const currentIngredient = ingredients.find((itemIng) => (itemIng._id === idIng))
  const {name, price} = currentIngredient

  return (
    <li key={`${index}_${idIng}`} className={styles.rowIng}>
        <IngredientPreview itemIng={idIng} index={index}/>
        <p
          className="text text_type_main-default">{name}</p>
        <div className={styles.orderPrice2}>
          <div className={"text text_type_digits-default pr-2"}>{price}</div>
          <CurrencyIcon type="primary"/>
        </div>
    </li>
  )
}