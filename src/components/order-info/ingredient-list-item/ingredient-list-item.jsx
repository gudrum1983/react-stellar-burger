import {useSelector} from "react-redux";
import {burgerIngredientsMap} from "../../../services/burger-ingredients/burger-ingredients-selector";
import styles from "./ingredient-list-item.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {IngredientPreview} from "../../ingredient-preview/ingredient-preview";
import {mapOptional, numOptional, stringOptional} from "../../../utils/prop-types";

/**
 * Элемент списка-скролл ингредиентов из OrderInfo
 * @param {string} idIng - строка адреса картинки
 * @param {number} index - счетчик для остальных ингредиентов
 * @param {Map} count - счетчик для остальных ингредиентов
 */
export function IngredientListItem({idIng, index, count}) {

  const mapIngredients = useSelector(burgerIngredientsMap)

  if (!idIng || !mapIngredients.has(idIng)) {
    return null
  }

  const tek = count?.get(idIng)

  const currentIngredient = mapIngredients.get(idIng)

  const {name, price, image_mobile} = currentIngredient

  return (
    <li key={index} className={styles.rowIng}>
      <IngredientPreview image={image_mobile}/>
      <p
        className="text text_type_main-default">{name}</p>
      <div className={styles.orderPrice2}>
        <div className={"text text_type_digits-default pr-2"}>{`${tek?.count} x ${price}`}</div>
        <CurrencyIcon type="primary"/>
      </div>
    </li>
  )
}

IngredientListItem.propTypes = {
  idIng: stringOptional,
  count: mapOptional,
  index: numOptional,
};