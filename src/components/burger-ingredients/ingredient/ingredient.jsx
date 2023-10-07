import styles from "./ingredient.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {ingredientPropType} from "../../../utils/prop-types";
import {useDispatch} from "react-redux";
import {setIngredientDetails} from "../../../services/ingredient-details/ingredient-details-actions";
import {useDrag} from "react-dnd";
import {IngredientCounter} from "../ingredient-counter/ingredient-counter";

export function Ingredient({currentItem}) {

  const [, dragRef] = useDrag({
    type: "burgerConstructor",
    item: currentItem,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setIngredientDetails(currentItem))
  }

  const count = 0
  const canDraggabble = (currentItem?.type !== "bun") ? true : !(count)

  return (
    <li className={`${styles.card} cursor`} {...(canDraggabble && {ref: dragRef})} onClick={handleClick}>
      <img className={styles.imgCard} alt={currentItem.name} src={currentItem.image}/>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default pr-2">{currentItem.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={styles.cardName}>
        <p className="text text_type_main-default">{currentItem.name}</p>
      </div>
      <IngredientCounter id={currentItem._id} type={currentItem.type}></IngredientCounter>
    </li>
  )
}

Ingredient.propTypes = {
  currentItem: ingredientPropType,
};