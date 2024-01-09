import styles from "./ingredient-details.module.css";
import {useLocation, useParams} from "react-router-dom";
import {burgerIngredientsMap,} from "../../services/burger-ingredients/burger-ingredients-selector";
import React from "react";
import {Text} from "../typography/text/text";
import {COLOR_INACTIVE, DISPLAY_LARGE, TIngredient} from "../../utils/types";
import {Digits} from "../typography/digits/digits";
import {useSelectorApp} from "../../services/store";


export function IngredientDetails(): JSX.Element {

  const params = useParams()
  const location = useLocation()
  const background = location.state && location.state.background;
  const ingredients: Map<string, TIngredient> = useSelectorApp(burgerIngredientsMap)
  const idCurrentItem = params.id

  if (!!idCurrentItem) {
    const currentIngredient = ingredients.get(idCurrentItem);
    if (!!currentIngredient) {
      const {proteins, calories, fat, carbohydrates, name, image_large} = currentIngredient
      const energyValue = (text: string, value: number) => {
        return (
          <li className={styles.column}>
            <Text color={COLOR_INACTIVE}>{text}</Text>
            <Digits color={COLOR_INACTIVE}>{value}</Digits>
          </li>
        )
      }

      const styleContainer = background ? "" : "container"

      return (
        <div className={`${styles.modalContainer} ${styleContainer} pb-5`}>
          {!background && <Text size={DISPLAY_LARGE}>Детали ингредиента</Text>}
          <img src={image_large} alt={name} className="mb-4"></img>
          <p className={`${styles.title} text text_type_main-medium mb-8`}>{name}</p>
          <ul className={`${styles.row}`}>
            {energyValue('Калории,ккал', calories)}
            {energyValue('Белки, г', proteins)}
            {energyValue('Жиры, г', fat)}
            {energyValue('Углеводы, г', carbohydrates)}
          </ul>
        </div>
      )
    }
  }

  return (
    <Text size={DISPLAY_LARGE}>Детали ингредиента не найдены</Text>
  )
}