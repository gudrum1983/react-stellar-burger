import React from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import {CardOther} from "../card-other/card-other";
import {CardBuns} from "../card-buns/card-buns";

function CardList({data, setSelectedIngredients, selectedIngredients}) {
  let defaultBunId = false

  if (data[0].type === "bun") {
    defaultBunId = data[0]._id;
  }

  return (
    <div className={`${styles.type} pt-6 pr-4 pl-4 pb-10`}>
      {data.map((currentItem) => (
        <React.Fragment key={currentItem._id}>
          {!!(defaultBunId)
            ? <CardBuns currentItem={currentItem} setSelectedIngredients={setSelectedIngredients}
                        selectedIngredients={selectedIngredients} defaultBunId={defaultBunId}/>
            : <CardOther currentItem={currentItem} setSelectedIngredients={setSelectedIngredients}
                        selectedIngredients={selectedIngredients}/>}
        </React.Fragment>
      ))}
    </div>
  )
}

export {
  CardList
}