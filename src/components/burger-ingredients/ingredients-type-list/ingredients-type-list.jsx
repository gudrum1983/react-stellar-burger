import styles from "./ingredients-type-list.module.css";
import React from "react";
import {optionalArrayOfIngredients, optionalString} from "../../../utils/prop-types";
import {Ingredient} from "../ingredient/ingredient";


export const IngredientsTypeList = React.forwardRef(({name, data, id}, ref) =>  {

  console.log("IngredientsTypeList", name)

  return (
    <li  className={styles.typePart}>
      <p  ref={ref} id={id} className="text text_type_main-medium">{name}</p>
      <ul className={styles.listCards}>
        {data.map((currentItem) => (
            <Ingredient currentItem={currentItem} key={currentItem._id}/>
        ))}
      </ul>
    </li>)
});

IngredientsTypeList.propTypes = {
  name: optionalString,
  data: optionalArrayOfIngredients,
  id: optionalString,
};