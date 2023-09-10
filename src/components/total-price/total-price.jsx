import React from "react";

function TotalPrice({selectedIngredients}) {

  const costBun = selectedIngredients.bun.price * 2
  /* В макете фигма стоимость была указана с учетом двойной стоимости булочки */
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