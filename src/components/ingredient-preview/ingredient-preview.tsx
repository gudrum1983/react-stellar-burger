import styles from "./ingredient-preview.module.css";
import React from "react";
import {Text} from "../typography/text/text";
import {TIngredient} from "../../utils/types";

type TPropsIngredientPreview = Pick<TIngredient, "image"> & {
  count?: number;
};

export function IngredientPreview({image, count = 0}:TPropsIngredientPreview):JSX.Element {

  const textValue = String(count)

  return (
    <div style={{backgroundImage: `url(${image})`}} className={`${styles.box}`}>
      {!!count && <div className={styles.imgCardSmallFonNumber}>
        <Text> +{textValue}</Text>
      </div>}
    </div>
  )
}



/**
 * Иконка с ингредиентом
 * @param  image - строка адреса картинки
 * @param  count - счетчик для остальных ингредиентов
 */