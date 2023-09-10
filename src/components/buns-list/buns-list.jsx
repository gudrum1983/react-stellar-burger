import React from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import {CardBuns} from "../card-buns/card-buns";

function BunsList({data, selectedIngredients, setSelectedIngredients}) {
  const defaultBunId = data[0]._id;
  return (
    <div className={`${styles.type} pt-6 pr-4 pl-4 pb-10`}>
      {data.map((currentItem) => (
        <React.Fragment key={currentItem._id}>
          <CardBuns currentItem={currentItem} setSelectedIngredients={setSelectedIngredients}
                    selectedIngredients={selectedIngredients} defaultBunId={defaultBunId}/>
        </React.Fragment>
      ))}
    </div>
  )
}
export {
  BunsList
}