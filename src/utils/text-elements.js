import React from "react";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

//__DIGITS_SMALL__ - default,
//__DIGITS_MEDIUM__ - medium,
//__DIGITS_LARGE__ - large,
export const DIGITS_SIZES = {
  DIGITS_SMALL: "text_type_digits-default",
  DIGITS_MEDIUM: "text_type_digits-medium",
  DIGITS_LARGE: "text_type_digits-large",
}

//цвет для текста и цифр
export const TEXT_COLORS = {
  ERROR: "text_color_error",
  PRIMARY: "text_color_primary",
  ACCENT: "text_color_accent",
  SUCCESS: "text_color_success",
  INACTIVE: "text_color_inactive",
}

//__MOBILE_TEXT__ - small
//__DESKTOP_TEXT__ - default,
//__DISPLAY_SMALL__ - medium,
//__DISPLAY_LARGE__ - large,
export const TEXT_SIZES = {
  MOBILE_TEXT: "text_type_main-small",
  DESKTOP_TEXT: "text_type_main-default",
  DISPLAY_SMALL: "text_type_main-medium",
  DISPLAY_LARGE: "text_type_main-large",
}

/**
 * Возвращает отформатированную дату текстовый элемент с классами text text_type_main-default
 * @param {string} value - текст
 */
export const DateWithTimezone = ({value }) => {

  const orderDate = new Date(value)
  const timezoneOffset = orderDate.getTimezoneOffset()
  const differenceTimezone = timezoneOffset / -60
  const simbol = (differenceTimezone > -1) ? "+" : ""

  const orderTime = new Date(
    orderDate.getFullYear(),
    orderDate.getMonth(),
    orderDate.getDate() ,
    orderDate.getHours(),
    orderDate.getMinutes() - 1,
    0,
  )


  return <p className='text text_type_main-default text_color_inactive'>
    <FormattedDate date={orderTime}/> i-GMT{simbol}{differenceTimezone}
  </p>
}
