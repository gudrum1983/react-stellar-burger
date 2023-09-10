import styles from "../burger-ingredients/burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

const CardOther = ({currentItem, setSelectedIngredients, selectedIngredients}) => {

  let count = 0
  const otherIngredients = selectedIngredients.other
  if (otherIngredients.length > 0) {
    count = otherIngredients.filter((itemOtherIng) => itemOtherIng.ingredient._id === currentItem._id).length
  }

  function toggleCount() {
    const newSelectedIngredientsNumber = selectedIngredients.other.length ? selectedIngredients.other.length + 1 : 1;
    setSelectedIngredients({
      ...selectedIngredients,
      other: [...selectedIngredients.other,
        {
          numberIngredient: `${newSelectedIngredientsNumber}_${currentItem._id}`,
          ingredient: currentItem,
        }]
    })
  }

  function isNum(num) {
    return (num !== 0)
  }

  return (
    <div className={styles.card} onClick={toggleCount}>
      <img className={styles.imgCard} alt={currentItem.name} src={currentItem.image}/>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default pr-2">{currentItem.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={styles.cardName}>
        <p className="text text_type_main-default">{currentItem.name}</p>
      </div>
      {isNum(count) && <Counter count={count} size="default" extraClass="m-1"/>}
    </div>
  );
};

export {
  CardOther
}