import {burgerIngredientsMap} from "../../../services/burger-ingredients/burger-ingredients-selector";
import styles from "./ingredient-list-item.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {IngredientPreview} from "../../ingredient-preview/ingredient-preview";

export type TPropsIngredientListItem = {
  idIng: string;
  count: number;
};

/**
 * Элемент списка-скролл ингредиентов из OrderInfo
 * @param idIng - строка адреса картинки
 * @param index - индекс текущего элемента в массиве
 * @param count - счетчик для ингредиента
 */
export function IngredientListItem({idIng, count}: TPropsIngredientListItem): JSX.Element {

  const mapIngredients = useSelector2(burgerIngredientsMap)

/*  const tek = count?.get(idIng)*/

  const currentIngredient = mapIngredients.get(idIng)

  const {name, price, image_mobile} = currentIngredient

  return (
    <li key={idIng} className={styles.rowIng}>
      <IngredientPreview image={image_mobile}/>
      <p
        className="text text_type_main-default">{name}</p>
      <div className={styles.orderPrice2}>
        <div className={"text text_type_digits-default pr-2"}>{`${count} x ${price}`}</div>
        <CurrencyIcon type="primary"/>
      </div>
    </li>
  )
}