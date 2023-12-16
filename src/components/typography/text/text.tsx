import React from "react";
import {
  COLOR_PRIMARY,
  TColorsText,
  TEXT_DESKTOP,
  TFunctionComponentWithChildren,
  TSizesText
} from "../../../utils/types";

export type TPropsTextElement = {
  size?: TSizesText;
  extraClass?: string;
  color?: TColorsText;
} & TFunctionComponentWithChildren;

/**
 * Возвращает текстовый элемент с классами
 * @param size - размер шрифта, соответствует названиям из figma
 * - TEXT_MOBILE - "text_type_main-small"
 * - __TEXT_DESKTOP__ - "text_type_main-default" - по умолчанию
 * - DISPLAY_SMALL - "text_type_main-medium"
 * - DISPLAY_LARGE - "text_type_main-large"
 * @param color - выбор цвета
 * - ERROR
 * - __PRIMARY__ - по умолчанию
 * - ACCENT
 * - SUCCESS
 * - INACTIVE
 * @param  extraClass - дополнительный класс
 * @param  children
 */
export function Text({
                       size = TEXT_DESKTOP,
                       extraClass = '',
                       color = COLOR_PRIMARY,
                       children
                     }: TPropsTextElement): JSX.Element {
  return (
    <p className={`text ${size} ${color} ${extraClass} `}>{children}</p>
  )
}