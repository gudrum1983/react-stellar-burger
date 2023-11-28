import React from "react";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

const textColors = {
  error: "text_color_error",
  primary: "text_color_primary",
  accent: "text_color_accent",
  success: "text_color_success",
  inactive: "text_color_inactive",
}

const textSize = {
  small: "text_type_main-small",
  default: "text_type_main-default",
  medium: "text_type_main-medium",
  large: "text_type_main-large",
}

const digitsSize = {
  default: "text_type_digits-default",
  medium: "text_type_digits-medium",
  large: "type_digits-large",
}


//Digits
export const digitsSmall = ({value, extraClass = ''}) =>
  <p className={`text ${digitsSize.default} ${extraClass}`}>{value}</p>


//Text

/**
 * Возвращает текстовый элемент с классами text text_type_main-medium
 * @param {string} value - текст
 * @param {string} color - выбор цвета (error, primary, accent, success, inactive)
 * @param {string} extraClass - дополнительный класс
 */
export const displaySmall = ({value, extraClass = '', color = 'primary'}) =>
  <p className={`text ${textSize.medium} ${textColors[color]} ${extraClass}`}>{value}</p>


/**
 * Возвращает текстовый элемент с классами text text_type_main-default
 * @param {string} value - текст
 * @param {string} color - выбор цвета (error, primary, accent, success, inactive)
 * @param {string} extraClass - дополнительный класс
 */
export const textDefault = ({value, extraClass = '', color = 'primary'}) =>
  <p className={`text ${textSize.default} ${textColors[color]} ${extraClass} `}>{value}</p>


/**
 * Возвращает отформатированную дату текстовый элемент с классами text text_type_main-default
 * @param {string} value - текст
 * @param {string} extraClass - дополнительный класс
 */
export const formattedData = ({value, addText}) =>
  <p className='text text_type_main-default text_color_inactive'>
    <FormattedDate date={new Date(value)}/>{addText}
  </p>
