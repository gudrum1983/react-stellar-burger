import React from "react";
import { useSelector } from 'react-redux';


function TotalPrice() {

  //получаем функцию-сеттер из контекста
  //const { selectedIngredients } = React.useContext(SelectedIngredientsContext);
  const selectedIngredients = useSelector(store => store.chooseIngredients)

  const costBun = !!(selectedIngredients.bun) ? selectedIngredients.bun.price * 2 : 0

  const other = selectedIngredients.other
  const numberOtherIngredients = other.length
  let sumWithInitial = 0

  if (numberOtherIngredients > 0) {
    const arrayOtherPrice = other.map((item) => (item.ingredient.price))
    const initialValue = 0;
    sumWithInitial = arrayOtherPrice.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
  }

  const stringTotal = String(costBun + sumWithInitial)

  return (
    <p className="text text_type_digits-medium">{stringTotal}</p>
  )
}

export {
  TotalPrice
}