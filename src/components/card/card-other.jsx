import styles from "./card.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import uuid from "react-uuid";
import {ingredientPropType, optionalFunc, optionalObject} from "../../utils/prop-types";

const CardOther = ({currentItem, setSelectedIngredients, selectedIngredients}) => {

  CardOther.propTypes = {
    currentItem: ingredientPropType,
    setSelectedIngredients: optionalFunc,
    selectedIngredients: optionalObject,
  };


  let count = 0
  const otherIngredients = selectedIngredients.other
  if (otherIngredients.length > 0) {
    count = otherIngredients.filter((itemOtherIng) => itemOtherIng.ingredient._id === currentItem._id).length
  }

  function toggleCount() {
    const numberIngredient = uuid();
    setSelectedIngredients({
      ...selectedIngredients,
      other: [...selectedIngredients.other,
        {
          numberIngredient: numberIngredient,
          ingredient: currentItem,
        }]
    })
  }

  function isNum(num) {
    return (num !== 0)
  }

  return (
    <li className={styles.card} onClick={toggleCount}>
      <img className={styles.imgCard} alt={currentItem.name} src={currentItem.image}/>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default pr-2">{currentItem.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={styles.cardName}>
        <p className="text text_type_main-default">{currentItem.name}</p>
      </div>
      {isNum(count) && <Counter count={count} size="default" extraClass="m-1"/>}
    </li>
  );
};

export {
  CardOther
}