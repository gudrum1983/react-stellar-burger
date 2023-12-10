import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
import {Text} from "../text/text";
import {COLOR_INACTIVE, TPropsDate} from "../../../utils/types";

/**
 * Возвращает отформатированную дату текстовый элемент с классами text text_type_main-default
 * @param value - текст
 */
export const DateWithTimezone: FC<TPropsDate> = ({value}) => {

  const orderDate = new Date(value)
  const timezoneOffset = orderDate.getTimezoneOffset()

  const differenceTimezone = timezoneOffset / -60
  const simbol = (differenceTimezone > -1) ? "+" : ""

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
      <FormattedDate date={orderTime}/> i-GMT{simbol}{differenceTimezone}
    </Text>
  )
}
