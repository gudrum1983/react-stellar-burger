import {useSelector} from "react-redux";
import {
  burgerIngredientsArray,
  burgerIngredientsMap
} from "../../../services/burger-ingredients/burger-ingredients-selector";
import styles from "./ingredient-list-item.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {IngredientPreview} from "../ingredient-preview/ingredient-preview";


export function IngredientListItem({idIng, index, count = 1}) {

/*  const mapIngredients = useSelector(burgerIngredientsMap)*/

  const ingredients = useSelector(burgerIngredientsArray)
  const currentIngredient = ingredients.find((element) => element._id === idIng)
  const {name, price, image_mobile} = currentIngredient

  return (
    <li key={index} className={styles.rowIng}>
        <IngredientPreview image_mobile={image_mobile} itemIng={index} index={index}/>
        <p
          className="text text_type_main-default">{name}</p>
        <div className={styles.orderPrice2}>
          <div className={"text text_type_digits-default pr-2"}>{`${count} x ${price}`}</div>
          <CurrencyIcon type="primary"/>
        </div>
    </li>
  )
}