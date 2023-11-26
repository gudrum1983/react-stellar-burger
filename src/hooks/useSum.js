import React from "react";
import {useSelector} from "react-redux";
import {burgerIngredientsMap} from "../services/burger-ingredients/burger-ingredients-selector";

export default function useSum(ingredients = []) {

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

  return sum
}