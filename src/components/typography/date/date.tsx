import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Text} from "../text/text";
import {COLOR_INACTIVE} from "../../../utils/types";

export type TPropsDate = {
  value: string;
};

/**
 * Возвращает отформатированную дату с указанием тайм зоны
 * @param value - текст
 */
export function DateWithTimezone({value}:TPropsDate):JSX.Element {

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