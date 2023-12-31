import React from "react";
import {selectBun, selectOther} from "../../../services/burger-constructor/burger-constructor-selector";
import {DIGITS_MEDIUM} from "../../../utils/types";
import {TSelectedIngredientOther} from "../constructor-item/constructor-item";
import {Digits} from "../../typography/digits/digits";
import {useSelectorApp} from "../../../services/store";


export function TotalPrice():JSX.Element {

  const bun = useSelectorApp(selectBun)
  const other:Array<TSelectedIngredientOther> = useSelectorApp(selectOther)

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
    <Digits size={DIGITS_MEDIUM}>{total}</Digits>
  )
}