import styles from "./ingredients-type-list.module.css";
import React from "react";
import {arrayOfIngredientsPropType, stringPropType} from "../../../utils/prop-types";
import {Ingredient} from "../ingredient/ingredient";


export const IngredientsTypeList = React.forwardRef(({name, data, id}, ref) =>  {

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
  name: stringPropType,
  data: arrayOfIngredientsPropType,
  id: stringPropType,
};