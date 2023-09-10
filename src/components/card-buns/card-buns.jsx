import React from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const CardBuns = ({currentItem, setSelectedIngredients, selectedIngredients, defaultBunId}) => {
  React.useEffect(() => {
    function check() {
      if (currentItem._id === defaultBunId) {
        setSelectedIngredients({
          ...selectedIngredients,
          bun: currentItem,
        });
      }
    }
    check();
  }, [])
  const count = (currentItem._id === selectedIngredients.bun._id) ? 1 : 0

  function toggleCount() {
    setSelectedIngredients({
      ...selectedIngredients,
      bun: currentItem,
    });
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
  CardBuns
}