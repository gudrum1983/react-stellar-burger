import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {ingredientPropType, optionalNum} from "../../../utils/prop-types";
import {useDispatch} from "react-redux";
import { setIngredientDetails } from "../../../services/ingredient-details/ingredient-details-actions";
import { useDrag } from "react-dnd";

function Ingredient({currentItem, count}) {

   const [state, setState] = React.useState({item:currentItem, number: 0})


  React.useMemo(
    () =>
      setState(
        {
          ...state,

          number: count,
        }
      )
    , [count]
  );

  const [{isDrag}, dragRef] = useDrag({
    type: "burgerConstructor",
    item: state.item,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setIngredientDetails(state.item))
  }
  const canDraggabble = (state.item.type !== "bun") ? true :!(state.number)

  function isNum(num) {
    return (num !== 0)
  }

  return (
    <li className={`${styles.card} cursor`} {...(canDraggabble && {ref:dragRef})} onClick={handleClick} >
      <img className={styles.imgCard} alt={state.item.name} src={state.item.image}/>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default pr-2">{state.item.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={styles.cardName}>
        <p className="text text_type_main-default">{state.item.name}</p>
      </div>
      {isNum(state.number) && <Counter count={state.number} size="default" />}
    </li>
  )
}

Ingredient.propTypes = {
  currentItem: ingredientPropType,
  count: optionalNum,

};

export {
  Ingredient
}