import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {nodeOptional} from "../../../utils/prop-types";
import {Text} from "../text/text";
import {colorsText, sizesText} from "../../../utils/constants";

/**
 * Возвращает отформатированную дату текстовый элемент с классами text text_type_main-default
 * @param {string} value - текст
 */
export const DateWithTimezone = ({value}) => {

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
    <Text size={sizesText.textDesktop} color={colorsText.inactive}>
      <FormattedDate date={orderTime}/> i-GMT{simbol}{differenceTimezone}
    </Text>
  )

}

DateWithTimezone.propTypes = {
  value: nodeOptional,
};