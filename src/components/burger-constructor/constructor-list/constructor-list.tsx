import styles from "./constructor-list.module.css";
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {moveFilling} from "../../../services/burger-constructor/burger-constructor-actions";
import update from 'immutability-helper'
import {selectBun, selectOther} from "../../../services/burger-constructor/burger-constructor-selector";
import {ConstructorItem, TSelectedIngredientOther} from "../constructor-item/constructor-item";
import {TIngredient} from "../../../utils/types";

export function ConstructorList():JSX.Element {

  const bun:TIngredient = useSelector(selectBun)
  const other:Array<TSelectedIngredientOther> = useSelector(selectOther)
  const dispatch = useDispatch();
  const topGap = !bun ? styles.topGap : '';
  //@ts-ignore
  const moveCard = React.useCallback((dragIndex, hoverIndex, other) => {

    const newOther = update(other, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, other[dragIndex]],
      ],
    })

    dispatch(moveFilling(newOther)
    )
  }, [])

  return (
    <div className={`${styles.listScroll} ${styles.scroll} ${topGap} custom-scroll`}>
      {other.map((item, i) => (
        //@ts-ignore
        <ConstructorItem moveCard={moveCard} index={i} key={item.numberIngredient} id={item.numberIngredient} currentItem={item}>

        </ConstructorItem>
      ))}
    </div>
  )
}