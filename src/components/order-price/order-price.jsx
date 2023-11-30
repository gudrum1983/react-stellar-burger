import {DIGITS_SIZES} from "../../utils/text-elements";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useSelector} from "react-redux";
import {burgerIngredientsMap} from "../../services/burger-ingredients/burger-ingredients-selector";
import {Digits} from "../typography/digits/digits";
import {arrayStringOptional,} from "../../utils/prop-types";

export function OrderPrice({ingredients}) {

  const [price, setPrice] = React.useState(0)
  const mapIngredients = useSelector(burgerIngredientsMap)

  React.useEffect(() => {
    let newSum = price
    ingredients.forEach((item) => {
      if (mapIngredients.has(item)) {
        const {price} = mapIngredients.get(item)
        newSum = (newSum + price)
      }
    })
    setPrice(newSum)
  }, [])

  return (
    <div className="orderPrice">
      <Digits size={DIGITS_SIZES.DIGITS_SMALL} extraClass='pr-2'>{price}</Digits>
      <CurrencyIcon type="primary"/>
    </div>)
}

OrderPrice.propTypes = {
  ingredients: arrayStringOptional,
};