import styles from "./ingredients-type-list.module.css";
import React from "react";
import {Ingredient} from "../ingredient/ingredient";
import {TIngredient} from "../../../utils/types";

type TPropsIngredientsTypeList = {
  data: Array<TIngredient>;
  name: string;
  id: string;
}

export const IngredientsTypeList =
  React.forwardRef(({
                      name,
                      data,
                      id
                    }: TPropsIngredientsTypeList, ref: React.ForwardedRef<HTMLParagraphElement>): JSX.Element => {

    return (
      <li className={styles.typePart}>
        <p ref={ref} id={id} className="text text_type_main-medium">{name}</p>
        <ul className={styles.listCards}>
          {data.map((currentItem) => (
            <Ingredient currentItem={currentItem} key={currentItem._id}/>
          ))}
        </ul>
      </li>)
  });