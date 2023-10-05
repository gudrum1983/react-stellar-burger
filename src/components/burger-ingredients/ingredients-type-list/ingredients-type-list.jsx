import styles from "./ingredients-type-list.css";
import {ListCards} from "../list-cards/list-cards";
import React from "react";
import {optionalArrayOfIngredients, optionalString} from "../../../utils/prop-types";


export const List = React.forwardRef(({name, data, id}, ref) =>  {
  return (
    <li ref={ref} className={styles.typePart}>
      <p  id={id} className="text text_type_main-medium">{name}</p>
      <ListCards ingredients={data} />
    </li>)
});

List.propTypes = {
  name: optionalString,
  data: optionalArrayOfIngredients,
  id: optionalString,
};