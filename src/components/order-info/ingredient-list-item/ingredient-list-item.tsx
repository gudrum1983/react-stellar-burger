import {burgerIngredientsMap} from "../../../services/burger-ingredients/burger-ingredients-selector";
import styles from "./ingredient-list-item.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {IngredientPreview} from "../../ingredient-preview/ingredient-preview";
import {useSelectorApp} from "../../../services/store";
import {Text} from "../../typography/text/text";

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

  const mapIngredients = useSelectorApp(burgerIngredientsMap)


  const currentIngredient = mapIngredients.get(idIng)

  if (currentIngredient) {
    const {name, price, image_mobile} = currentIngredient
    return (
      <li key={idIng} className={styles.rowIng}>
        <IngredientPreview image={image_mobile}/>
        <Text>{name}</Text>
        <div className={styles.orderPrice2}>
          <div className={"text text_type_digits-default pr-2"}>{`${count} x ${price}`}</div>
          <CurrencyIcon type="primary"/>
        </div>
      </li>
    )
  } else {
    return (
      <li key={idIng} className={styles.rowIng}>
        <Text>Элемент не найден</Text>
      </li>
    )
  }
}