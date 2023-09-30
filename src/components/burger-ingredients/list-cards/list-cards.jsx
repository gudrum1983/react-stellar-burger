import React from "react";
import styles from "./list-cards.module.css";
import {CardOther} from "../card-other/card-other";
import {CardBuns} from "../card-buns/card-buns";
import {optionalArrayOfIngredients} from "../../../utils/prop-types";

function ListCards({ingredients}) {

  let defaultBunId = false

  if (ingredients[0].type === "bun") {
    defaultBunId = ingredients[0]._id;
  }

  return (
    <ul className={styles.listCards}>
      {ingredients.map((currentItem) => (
        <React.Fragment key={currentItem._id}>
          {!!(defaultBunId)
            ? <CardBuns currentItem={currentItem} defaultBunId={defaultBunId}
                        />
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