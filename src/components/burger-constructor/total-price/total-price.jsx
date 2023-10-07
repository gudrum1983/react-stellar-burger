import React from "react";
import {useSelector} from 'react-redux';
import {selectBurgerConstructor} from "../../../services/burger-constructor/burger-constructor-selector";


export function TotalPrice() {

  const {bun, other} = useSelector(selectBurgerConstructor)
  const numberOtherIngredients = other.length

  const total = React.useMemo(() => {
    let sumWithInitial = 0

    const costBun = !!(bun) ? bun.price * 2 : 0

    if (numberOtherIngredients > 0) {
      const arrayOtherPrice = other.map((item) => (item.ingredient.price))
      const initialValue = 0;
      sumWithInitial = arrayOtherPrice.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
    }

    return String(costBun + sumWithInitial)

  }, [bun, numberOtherIngredients])

  return (
    <p className="text text_type_digits-medium">{total}</p>
  )
}