import React from "react";
import {nodeOptional, stringOptional} from "../../../utils/prop-types";
import {DIGITS_SIZES, TEXT_COLORS} from "../../../utils/text-elements";


/**
 * Возвращает текстовый элемент с классами
 * @param {string} size - размер шрифта, соответствует названиям из figma (MOBILE_TEXT, DESKTOP_TEXT, DISPLAY_SMALL, DISPLAY_LARGE)
 * @param {string} color - выбор цвета (ERROR, PRIMARY, ACCENT, SUCCESS, INACTIVE)
 * @param {string} extraClass - дополнительный класс
 * @param {number} children - текст
 */
export const Digits = ({
                         children, size = DIGITS_SIZES.DIGITS_SMALL,
                         extraClass = '', color = TEXT_COLORS.PRIMARY
                       }) =>
  <p className={`text ${size} ${color} ${extraClass} `}>{children}</p>

Digits.propTypes = {
  children: nodeOptional,
  size: stringOptional,
  extraClass: stringOptional,
  color: stringOptional,
};