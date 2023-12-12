import styles from "./ingredient-preview.module.css";
import React, {FC} from "react";
import {TPropsIngredientPreview} from "../../utils/types";
import {Text} from "../typography/text/text";


export const IngredientPreview: FC<TPropsIngredientPreview> = ({image, count = 0}) => {

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