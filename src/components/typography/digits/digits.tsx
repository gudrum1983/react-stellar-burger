import React from "react";
import {
  COLOR_PRIMARY,
  DIGITS_SMALL,
  TColorsText,
  TFunctionComponentWithChildren,
  TSizesDigits
} from "../../../utils/types";

export type TPropsDigitsElement = {
  size?: TSizesDigits;
  extraClass?: string;
  color?: TColorsText;
} & TFunctionComponentWithChildren;

/**
 * Возвращает текстовый элемент с классами
 * @param size - размер шрифта, соответствует названиям из figma
 * - __DIGITS_SMALL__ = "text_type_digits-default" - по умолчанию
 * - DIGITS_MEDIUM = "text_type_digits-medium"
 * - DIGITS_LARGE = "text_type_digits-large"
 * @param color - выбор цвета
 * - ERROR
 * - __PRIMARY__ - по умолчанию
 * - ACCENT
 * - SUCCESS
 * - INACTIVE
 * @param extraClass - дополнительный класс
 * @param children
 */
export function Digits({
                         size = DIGITS_SMALL,
                         extraClass = '',
                         color = COLOR_PRIMARY,
                         children
                       }: TPropsDigitsElement): JSX.Element {
  return (
    <p className={`text ${size} ${color} ${extraClass} `}>{children}</p>
  )
}