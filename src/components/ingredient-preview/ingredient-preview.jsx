import styles from "./ingredient-preview.module.css";
import React from "react";
import {string} from "prop-types";
import {numOptional, stringOptional} from "../../utils/prop-types";

/**
 * Иконка с ингредиентом
 * @param {string} image - строка адреса картинки
 * @param {number} count - счетчик для остальных ингредиентов
 */
export function IngredientPreview({image, count = 0}) {

  const text = String(count)

  return (
    <div style={{backgroundImage: `url(${image})`}} className={`${styles.box}`}>
      {!!count && <div className={styles.imgCardSmallFonNumber}>
        <p className="text text_type_main-default">
          +{text}
        </p>
      </div>}
    </div>
  )
}

IngredientPreview.propTypes = {
  image: stringOptional,
  count: numOptional,
};