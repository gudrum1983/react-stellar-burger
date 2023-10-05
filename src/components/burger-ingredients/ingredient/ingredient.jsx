import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {ingredientPropType, optionalFunc, optionalNum} from "../../../utils/prop-types";
import {useDispatch} from "react-redux";
import {OPEN_MODAL} from "../../../services/actions/modal";
import { setIngredientDetails } from "../../../services/actions/ingredient-details";
import { useDrag } from "react-dnd";

function Ingredient({currentItem, count}) {
  const [{isDrag}, dragRef] = useDrag({
    type: "burgerConstructor",
    item: currentItem,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setIngredientDetails(currentItem))
    dispatch({type: OPEN_MODAL, payload: {type: "ingredient"}})
  }
  const canDraggabble = (currentItem.type !== "bun") ? true :!(count)

  function isNum(num) {
    return (num !== 0)
  }

  let cursor = canDraggabble ? "cursor cursor_type_grab" : "cursor cursor_type_noGrab";


  if (isDrag) {cursor = "cursor cursor_type_grabbing"}
  console.log("isDrag",isDrag)


  return (
    <li className={`${styles.card} cursor`} {...(canDraggabble && {ref:dragRef})} onClick={handleClick} >
      <img className={styles.imgCard} alt={currentItem.name} src={currentItem.image}/>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default pr-2">{currentItem.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={styles.cardName}>
        <p className="text text_type_main-default">{currentItem.name}</p>
      </div>
      {isNum(count) && <Counter count={count} size="default" />}
    </li>
  )
}

Ingredient.propTypes = {
  currentItem: ingredientPropType,
  count: optionalNum,
  toggleCount: optionalFunc,

};

export {
  Ingredient
}