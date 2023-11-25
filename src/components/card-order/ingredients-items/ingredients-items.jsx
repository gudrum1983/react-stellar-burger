import styles from "./ingredients-items.module.css";
import React, {useState} from "react";
import {IngredientListItem} from "../ingredient-list-item/ingredient-list-item";
import {useSelector} from "react-redux";
import {burgerIngredientsMap} from "../../../services/burger-ingredients/burger-ingredients-selector";

export function IngredientsItems({componentsOrder}) {
  const mapIngredients = useSelector(burgerIngredientsMap)
  const [count, setCount] = useState()

  React.useEffect(() => {
    const map = new Map
    componentsOrder.forEach((ing) => {
      if (map.has(ing)) {
        const {count, ...value} = map.get(ing)

        map.set(ing, {...value, count: count + 1})
      } else {
        if (mapIngredients.has(ing)) {
        const {image_mobile, name, price} = mapIngredients.get(ing)

          map.set(ing,{image_mobile, name, price, count: 1})
        }
      }
    })
    setCount(map)
    console.log({count})
  }, [])


  const checkItem = (item) => {
    return mapIngredients.has(item)
  }


  return (
    <ul className={`${styles.containerFeed2} nonList custom-scroll`}>
      {[...new Set(componentsOrder)].map((item, index) => (


        checkItem && <IngredientListItem count={count} idIng={item} index={index} key={index}/>


      ))}
    </ul>
  )
}