import React from "react";
import styles from "./list-cards.module.css";
import {CardOther} from "../card/card-other";
import {CardBuns} from "../card/card-buns";
import {optionalArray, optionalFunc, optionalObject} from "../../../utils/prop-types";

function ListCards({data, setSelectedIngredients, selectedIngredients}) {

  ListCards.propTypes = {
    data: optionalArray,
    selectedIngredients: optionalObject,
    setSelectedIngredients: optionalFunc,
  };

  let defaultBunId = false

  if (data[0].type === "bun") {
    defaultBunId = data[0]._id;
  }

  return (
    <ul className={styles.listCards}>
      {data.map((currentItem) => (
        <React.Fragment key={currentItem._id}>
          {!!(defaultBunId)
            ? <CardBuns currentItem={currentItem} setSelectedIngredients={setSelectedIngredients}
                        selectedIngredients={selectedIngredients} defaultBunId={defaultBunId}/>
            : <CardOther currentItem={currentItem} setSelectedIngredients={setSelectedIngredients}
                         selectedIngredients={selectedIngredients}/>}
        </React.Fragment>
      ))}
    </ul>
  )
}

export {
  ListCards
}