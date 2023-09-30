import styles from "./ingredients-type-list.css";
import {ListCards} from "../list-cards/list-cards";
import React from "react";
import {optionalArrayOfIngredients, optionalString} from "../../../utils/prop-types";


export function List ({name, data, id})  {
  return (
    <li className={styles.typePart}>
      <p id={id} className="text text_type_main-medium">{name}</p>
      <ListCards ingredients={data} />
    </li>)
}

List.propTypes = {
  name: optionalString,
  data: optionalArrayOfIngredients,
  id: optionalString,
};