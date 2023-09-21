import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {ingredientPropType, optionalFunc, optionalNum} from "../../../utils/prop-types";
import {ShowModalContext} from "../../../services/modalContext";


function Ingredient({currentItem, count, toggleCount}) {

  const { showModalDispatcher } = React.useContext(ShowModalContext);

  function handleClick() {
    toggleCount();
    showModalDispatcher({type: 'open', payload: {type: "ingredient", ingredient: currentItem}})
  }

  function isNum(num) {
    return (num !== 0)
  }

  return (
    <li className={`${styles.card} cursor`} onClick={handleClick} >
      <img className={styles.imgCard} alt={currentItem.name} src={currentItem.image}/>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default pr-2">{currentItem.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={styles.cardName}>
        <p className="text text_type_main-default">{currentItem.name}</p>
      </div>
      {isNum(count) && <Counter count={count} size="default"/>}
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