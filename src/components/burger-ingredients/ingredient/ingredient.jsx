import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {ingredientPropType} from "../../../utils/prop-types";
import {useDispatch, useSelector} from "react-redux";
import {setIngredientDetails} from "../../../services/ingredient-details/ingredient-details-actions";
import {useDrag} from "react-dnd";
import {selectCount} from "../../../services/burger-constructor/burger-constructor-selector";

export function Ingredient({currentItem}) {

  const [{isDrag, cursor}, dragRef] = useDrag({
    type: "burgerConstructor",
    item: currentItem,

    collect: monitor => ({
      isDrag: monitor.isDragging(),
      cursor: monitor.isDragging() ? 'grabbing' : 'grab'
    }),

  });
  const dispatch = useDispatch();

  function test() {
    console.log("test")
  }


  function handleClick() {
    dispatch(setIngredientDetails(currentItem))
  }

 const count = useSelector(selectCount(currentItem._id, currentItem.type))
  const canDraggabble = (currentItem?.type !== "bun") ? true : !(count)

  return (
    <li className={`${styles.card}`} {...(canDraggabble && {ref: dragRef, style:{cursor}})}  onClick={handleClick}>
      <img className={styles.imgCard} alt={currentItem.name} src={currentItem.image}/>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default pr-2">{currentItem.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={styles.cardName}>
        <p className="text text_type_main-default">{currentItem.name}</p>
      </div>
      {(count > 0) ? <Counter count={count} size="default"/> : null}
    </li>
  )
}

Ingredient.propTypes = {
  currentItem: ingredientPropType,
};