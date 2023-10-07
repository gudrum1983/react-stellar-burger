import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {ingredientPropType, optionalNum} from "../../../utils/prop-types";
import {useDispatch, useSelector} from "react-redux";
import {setIngredientDetails} from "../../../services/ingredient-details/ingredient-details-actions";
import {useDrag} from "react-dnd";
import {chooseIngredients} from "../../../services/burger-constructor/burger-constructor-selector";
import {loadBurgerIngredients} from "../../../services/burger-ingredients/burger-ingredients-actions";


function Number({id, type}) {

  const [count, setCount] = React.useState(0)

  const {bun, other} = useSelector(chooseIngredients)
  const newCount = (type === "bun")
    ? (id === bun?._id ? 2 : 0)
    : (other.filter((itemOtherIng) => itemOtherIng.ingredient._id === id).length)

  React.useMemo(
    () => {
      console.log("newCount", newCount)
      setCount(newCount)
    }, [newCount]
  );

  const countClass = count > 0 ? styles.visible : styles.hidden


    return (<Counter count={count} size="default" extraClass={countClass}/>)

}


function Ingredient({currentItem}) {


  /* function findNewCount () {
      const {bun, other} = useSelector(chooseIngredients)
      return (currentItem.type === "bun")
        ? (currentItem._id === bun?._id ? 2 : 0)
        : (other.filter((itemOtherIng) => itemOtherIng.ingredient._id === currentItem._id).length)
    }

    const newCount = findNewCount()*/

  console.log('currentItem', currentItem)
  const [item, setItem] = React.useState({})


  React.useEffect(() => {

    setItem(currentItem)
  }, [])


  /*console.log(currentItem.name, 'render' )*/

  /*  const newCount = (currentItem.type === "bun")
      ? (currentItem._id === bun?._id ? 2 : 0)
      : (other.filter((itemOtherIng) => itemOtherIng.ingredient._id === currentItem._id).length)*/


  /*  React.useMemo(
      () =>{
       console.log("newCount",newCount)
        setCount(newCount)}, [newCount]
    );*/

  const [{isDrag}, dragRef] = useDrag({
    type: "burgerConstructor",
    item: item,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setIngredientDetails(item))
  }

  const count = 0
  const canDraggabble = (item?.type !== "bun") ? true : !(count)



  return (
    <li className={`${styles.card} cursor`} {...(canDraggabble && {ref: dragRef})} onClick={handleClick}>
      <img className={styles.imgCard} alt={item.name} src={item.image}/>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default pr-2">{item.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={styles.cardName}>
        <p className="text text_type_main-default">{item.name}</p>
      </div>
      <Number id={item._id} type={item.type}></Number>
      {/*      {isNum(count) && <Counter count={count} size="default"/>}*/}
      {/*       <Counter count={count} size="default"/>*/}
    </li>
  )
}

Ingredient.propTypes = {
  currentItem: ingredientPropType,
};

export {
  Ingredient
}