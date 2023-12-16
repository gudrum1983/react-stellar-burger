import styles from "./ingredient-preview.module.css";
import React from "react";
import {Text} from "../typography/text/text";

type TPropsIngredientPreview = {
  image: string;
  count?: number;
};

export function IngredientPreview({image, count = 0}:TPropsIngredientPreview):JSX.Element {

  const text = String(count)

  return (
    <div style={{backgroundImage: `url(${image})`}} className={`${styles.box}`}>
      {!!count && <div className={styles.imgCardSmallFonNumber}>
        <Text> +{text}</Text>
      </div>}
    </div>
  )
}



/**
 * Иконка с ингредиентом
 * @param  image - строка адреса картинки
 * @param  count - счетчик для остальных ингредиентов
 */