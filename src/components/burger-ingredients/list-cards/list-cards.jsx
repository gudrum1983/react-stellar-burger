import React from "react";
import styles from "./list-cards.module.css";
import {CardOther} from "../card-other/card-other";
import {CardBuns} from "../card-buns/card-buns";
import {optionalArrayOfIngredients, optionalFunc, optionalObject} from "../../../utils/prop-types";

function ListCards({ingredients, setSelectedIngredients, selectedIngredients, setShowModal}) {

  ListCards.propTypes = {
    ingredients: optionalArrayOfIngredients,
    selectedIngredients: optionalObject,
    setSelectedIngredients: optionalFunc,
    setShowModal: optionalFunc,
  };

  let defaultBunId = false

  if (ingredients[0].type === "bun") {
    defaultBunId = ingredients[0]._id;
  }

  return (
    <ul className={styles.listCards}>
      {ingredients.map((currentItem) => (
        <React.Fragment key={currentItem._id}>
          {!!(defaultBunId)
            ? <CardBuns currentItem={currentItem} setSelectedIngredients={setSelectedIngredients}
                        selectedIngredients={selectedIngredients} defaultBunId={defaultBunId} setShowModal={setShowModal}/>
            : <CardOther currentItem={currentItem} setSelectedIngredients={setSelectedIngredients}
                         selectedIngredients={selectedIngredients} setShowModal={setShowModal}/>}
        </React.Fragment>
      ))}
    </ul>
  )
}

export {
  ListCards
}