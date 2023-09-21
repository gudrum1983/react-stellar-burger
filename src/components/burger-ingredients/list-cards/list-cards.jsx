import React from "react";
import styles from "./list-cards.module.css";
import {CardOther} from "../card-other/card-other";
import {CardBuns} from "../card-buns/card-buns";
import {optionalArrayOfIngredients, optionalFunc} from "../../../utils/prop-types";

function ListCards({ingredients, setShowModal}) {

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
                        setShowModal={setShowModal}/>
            : <CardOther currentItem={currentItem} setShowModal={setShowModal}/>}
        </React.Fragment>
      ))}
    </ul>
  )
}

ListCards.propTypes = {
  ingredients: optionalArrayOfIngredients,
  setShowModal: optionalFunc,
};

export {
  ListCards
}