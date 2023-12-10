import React, {FC} from "react";
import {COLOR_PRIMARY, DIGITS_SMALL, TPropsDigitsElement} from "../../../utils/types";

/**
 * Возвращает текстовый элемент с классами
 * @param size - размер шрифта, соответствует названиям из figma (MOBILE_TEXT, DESKTOP_TEXT, DISPLAY_SMALL, DISPLAY_LARGE)
 * @param color - выбор цвета (ERROR, PRIMARY, ACCENT, SUCCESS, INACTIVE)
 * @param extraClass - дополнительный класс
 * @param children - текст
 */
export const Digits: FC<TPropsDigitsElement> =
  ({
     children, size = DIGITS_SMALL,
     extraClass = '', color = COLOR_PRIMARY
   }) =>
    <p className={`text ${size} ${color} ${extraClass} `}>{children}</p>