import {useSelector} from "react-redux";
import {burgerIngredientsArray} from "../../../services/burger-ingredients/burger-ingredients-selector";
import styles from "./ingredient-preview.module.css";
import React from "react";

export function IngredientPreview({image, itemIng, count = null}) {

  const ingredients = useSelector(burgerIngredientsArray)

  function image_mobile_find(idIng) {
    const currentIngredient = ingredients.find((itemIng) => (itemIng._id === idIng));
    return currentIngredient.image_mobile
  }

  return (

    <div
      /*      style={{backgroundImage: `url(${image_mobile_find(itemIng)})`}}*/
      style={{backgroundImage: `url(${image})`}}
      className={`${styles.rowIngNew}`}>
      {count && <div className={styles.imgCardSmallFonNumber}>
        <p className="text text_type_main-default">
          {`+${count}`}
        </p>


      </div>}

    </div>

  )

}