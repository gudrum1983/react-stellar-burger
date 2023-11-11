import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {ingredientPropType} from "../../../utils/prop-types";
import {useDispatch, useSelector} from "react-redux";
import {setIngredientDetails} from "../../../services/ingredient-details/ingredient-details-actions";
import {useDrag} from "react-dnd";
import {selectCount} from "../../../services/burger-constructor/burger-constructor-selector";
import {Link, useLocation, useNavigate} from "react-router-dom";

export function Ingredient({currentItem}) {

/*  const navigate = useNavigate()*/

  const location = useLocation()
  const id = currentItem._id

  const [{isDrag, cursor}, dragRef] = useDrag({
    type: "burgerConstructor",
    item: currentItem,

    collect: monitor => ({
      isDrag: monitor.isDragging(),
      cursor: monitor.isDragging() ? 'grabbing' : 'grab'
    }),

  });
/*  const dispatch = useDispatch();*/

/*  function handleClick() {
    dispatch(setIngredientDetails(currentItem))
    navigate(`/ingrediets/${id}`, {replace: false, state: {bac: "value"}})
  }*/

  const count = useSelector(selectCount(currentItem._id, currentItem.type))
  const canDraggabble = (currentItem?.type !== "bun") ? true : !(count)

  return (


      <li key={id} className={`${styles.card}`} {...(canDraggabble && {ref: dragRef, style: {cursor}})}>
        <Link  className={`${styles.nonlink}`} to={`/ingredients/${id}`} state={{background: location}}>
        <img className={styles.imgCard} alt={currentItem.name} src={currentItem.image}/>
        <div className={`pt-1 pb-1 ${styles.price}`}>
          <p className="text text_type_digits-default pr-2">{currentItem.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <div className={styles.cardName}>
          <p className="text text_type_main-default">{currentItem.name}</p>
        </div>
        {(count > 0) ? <Counter count={count} size="default"/> : null}
        </Link>
      </li>

  )
}

Ingredient.propTypes = {
  currentItem: ingredientPropType,
};