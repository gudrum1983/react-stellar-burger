import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {burgerIngredientsMap} from "../../services/burger-ingredients/burger-ingredients-selector";
import {Digits} from "../typography/digits/digits";
import {TIdIngredient} from "../../utils/types";
import {useSelector2} from "../../services/store";

type TPropsOrderPrice = {
  ingredients: Array<TIdIngredient>
};

export function OrderPrice({ingredients}:TPropsOrderPrice): JSX.Element {

  const [price, setPrice] = React.useState(0)
  const mapIngredients = useSelector2(burgerIngredientsMap)

  React.useEffect(() => {
    let newSum = price
    ingredients.forEach((item) => {
      if (mapIngredients.get(item)) {
        const test = mapIngredients.get(item)!
        const {price} = test
        newSum = (newSum + price)
      }
    })
    setPrice(newSum)
  }, [])

  return (
    <div className="orderPrice">
      <Digits extraClass='pr-2'>{price}</Digits>
      <CurrencyIcon type="primary"/>
    </div>)
}