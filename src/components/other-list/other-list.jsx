import React from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import {CardOther} from "../card-other/card-other";

const OtherList = React.memo((props) => {
    return (
      <div className={`${styles.type} pt-6 pr-4 pl-4 pb-10`}>
        {props.data.map((currentItem) => (
          <React.Fragment key={currentItem._id}>
            <CardOther currentItem={currentItem} setSelectedIngredients={props.setSelectedIngredients}
                       selectedIngredients={props.selectedIngredients}/>
          </React.Fragment>
        ))}
      </div>
    )
  }
)
export {
  OtherList
}