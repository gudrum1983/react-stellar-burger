import React, {FC} from "react";
import {COLOR_PRIMARY, TEXT_DESKTOP, TPropsTextElement} from "../../../utils/types";

/**
 * Возвращает текстовый элемент с классами
 * @param  size - размер шрифта, соответствует названиям из figma
 * @param  color - выбор цвета
 * @param  extraClass - дополнительный класс
 * @param  children - текст
 */
export const Text: FC<TPropsTextElement> =
  ({
     size = TEXT_DESKTOP, extraClass = '',
     color = COLOR_PRIMARY, children
   }) =>
      <p className={`text ${size} ${color} ${extraClass} `}>{children}</p>