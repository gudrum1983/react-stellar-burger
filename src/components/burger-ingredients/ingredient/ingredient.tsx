import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useDrag} from "react-dnd";
import {selectCount} from "../../../services/burger-constructor/burger-constructor-selector";
import {Link, useLocation} from "react-router-dom";
import {TIngredient} from "../../../utils/types";
import {Text} from "../../typography/text/text";
import {Digits} from "../../typography/digits/digits";
import {useSelector2} from "../../../services/store";

type TPropsIngredient = {
  currentItem:TIngredient;}


export function Ingredient({currentItem}:TPropsIngredient):JSX.Element {

  const location = useLocation()
  const id = currentItem._id
  const type = currentItem.type

  const [, dragRef] = useDrag({
    type: "burgerConstructor",
    item: currentItem,
  });

  const count = useSelector2(selectCount(id, type))
  const canDraggable = (type !== "bun") ? true : !(count)
  const cursorStyle = !canDraggable ? 'cursor_type_noGrab' : ''

  return (

    <li key={id} className={`${styles.card}`} {...(canDraggable && {ref: dragRef})}>
      <Link className={`${styles.nonlink} ${cursorStyle}`} to={`/ingredients/${id}`} state={{background: location}}>
        <img className={styles.imgCard} alt={currentItem.name} src={currentItem.image}/>
        <div className={`pt-1 pb-1 ${styles.price}`}>
          <Digits extraClass={'pr-2'}>{currentItem.price}</Digits>
          <CurrencyIcon type="primary"/>
        </div>
        <div className={styles.cardName}>
          <Text>{currentItem.name}</Text>
        </div>
        {(count > 0) ? <Counter count={count} size="default"/> : null}
      </Link>
    </li>

  )
}