import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
import {Text} from "../text/text";
import {COLOR_INACTIVE, TPropsDate} from "../../../utils/types";

/**
 * Возвращает отформатированную дату с указанием тайм зоны
 * @param value - текст
 */
export const DateWithTimezone: FC<TPropsDate> = ({value}) => {

  console.log("type",typeof value)

  //todo: сделать проверку на формат строки и значение по умолчанию

/*  const str: string = value;

  let result = str.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/gm);
  console.log( !!result )*/

  const orderDate = new Date(value)
  const timezoneOffset = orderDate.getTimezoneOffset()

  const differenceTimezone = timezoneOffset / -60
  const symbol = (differenceTimezone > -1) ? "+" : ""

  const orderTime = new Date(
    orderDate.getFullYear(),
    orderDate.getMonth(),
    orderDate.getDate(),
    orderDate.getHours(),
    orderDate.getMinutes() - 1,
    0,
  )

  return (
    <Text color={COLOR_INACTIVE}>
      <FormattedDate date={orderTime}/> i-GMT{symbol}{differenceTimezone}
    </Text>
  )
}
