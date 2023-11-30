import {digitsSmall} from "../../utils/text-elements";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {burgerIngredientsMap} from "../../services/burger-ingredients/burger-ingredients-selector";


export function OrderPrice({ingredients}) {

  const [sum, setSum] = React.useState(0)
  const mapIngredients = useSelector(burgerIngredientsMap)

  React.useEffect(() => {
    let newSum = sum
    ingredients.forEach((item) => {
      if (mapIngredients.has(item)) {
        const {price} = mapIngredients.get(item)
        newSum = (newSum + price)
      }
    })
    setSum(newSum)
  }, [])

  return (
    <div className="orderPrice">
      {digitsSmall({value: sum, extraClass: 'pr-2'})}
      <CurrencyIcon type="primary"/>
    </div>)
}