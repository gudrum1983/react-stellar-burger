import React from "react";
import {nodeOptional, stringOptional} from "../../../utils/prop-types";
import {TEXT_COLORS, TEXT_SIZES} from "../../../utils/text-elements";

/**
 * Возвращает текстовый элемент с классами
 * @param {string} size - размер шрифта, соответствует названиям из figma (MOBILE_TEXT, DESKTOP_TEXT, DISPLAY_SMALL, DISPLAY_LARGE)
 * @param {string} color - выбор цвета (ERROR, PRIMARY, ACCENT, SUCCESS, INACTIVE)
 * @param {string} extraClass - дополнительный класс
 * @param {string} children - текст
 */
export const Text = ({
                       children, size = TEXT_SIZES.DESKTOP_TEXT,
                       extraClass = '', color = TEXT_COLORS.PRIMARY
                     }) =>
  <p className={`text ${size} ${color} ${extraClass} `}>{children}</p>

Text.propTypes = {
  children: nodeOptional,
  size: stringOptional,
  extraClass: stringOptional,
  color: stringOptional,
};