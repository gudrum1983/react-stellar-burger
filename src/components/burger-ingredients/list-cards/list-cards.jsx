import React from "react";
import styles from "./list-cards.module.css";
import {CardOther} from "../card-other/card-other";
import {CardBuns} from "../card-buns/card-buns";
import {optionalArrayOfIngredients} from "../../../utils/prop-types";

function ListCards({ingredients}) {

  const isBun = ingredients[0].type === "bun"

  return (
    <ul className={styles.listCards}>
      {ingredients.map((currentItem) => (
        <React.Fragment key={currentItem._id}>
          {isBun
            ? <CardBuns currentItem={currentItem}/>
            : <CardOther currentItem={currentItem} />}
        </React.Fragment>
      ))}
    </ul>
  )
}

ListCards.propTypes = {
  ingredients: optionalArrayOfIngredients,
};

export {
  ListCards
}