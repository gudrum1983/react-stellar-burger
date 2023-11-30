import React from "react";

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

export const TEXT_COLOR = {
  ERROR: textColors.error,
  PRIMARY: textColors.primary,
  ACCENT: textColors.accent,
  SUCCESS: textColors.success,
  INACTIVE: textColors.inactive,
}

//__MOBILE_TEXT__ - small
//__DESKTOP_TEXT__ - default,
//__DISPLAY_SMALL__ - medium,
//__DISPLAY_LARGE__ - large,
export const TEXT_SIZE = {
  MOBILE_TEXT: textSize.small,
  DESKTOP_TEXT: textSize.default,
  DISPLAY_SMALL: textSize.medium,
  DISPLAY_LARGE: textSize.large,
}


/**
 * Возвращает текстовый элемент с классами
 * @param {string} size - размер шрифта, соответствует названиям из figma (MOBILE_TEXT, DESKTOP_TEXT, DISPLAY_SMALL, DISPLAY_LARGE)
 * @param {string} color - выбор цвета (ERROR, PRIMARY, ACCENT, SUCCESS, INACTIVE)
 * @param {string} extraClass - дополнительный класс
 * @param {string} children - текст
 */
export const TypographyText = ({children, size = TEXT_SIZE.DESKTOP_TEXT, extraClass = '', color = TEXT_COLOR.PRIMARY}) =>
  <p className={`text ${size} ${color} ${extraClass} `}>{children}</p>